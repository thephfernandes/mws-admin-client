import axios from "axios";

export const state = () => ({
    clubs: [],
    invoiceAgreements: []
});

export const getters = {
    getClubs: (state) => {
        return state.clubs;
    },
    getClub: (state) => (id) => {
        return state.clubs.find((c) => c.id === id);
    },
    getInvoiceAgreements(state) {
        return state.invoiceAgreements;
    },
    getInvoiceAgreement: (state) => (id) => {
        return state.invoiceAgreements.find((i) => i.id === id);
    }
};

export const mutations = {
    setClubs(state, payload) {
        state.clubs = payload;
    },
    setInvoiceAgreements(state, payload) {
        state.invoiceAgreements = payload;
    }
};

export const actions = {
    async getClubsSetToStore({ commit }) {
        const response = await axios.get('https://cms-api.matchwornshirt.com/api/v1/clubs/stats');

        if (response.status === 200) {
            commit('setClubs', response.data)
        }
    },
    async getInvoiceAgreementsSetToStore({commit, dispatch}, clubId) {
        const response =  await dispatch('getInvoiceAgreements', clubId);

        if (response.status === 200) {
            commit('setInvoiceAgreements', response.data);
        }
    },
    async getInvoiceAgreements({}, clubId) {
        return await this.$axios.get(`/clubs/${clubId}/agreements`);
    },
    addInvoiceAgreement({}, invoiceAgreement) {
        return this.$axios.post(`/clubs/${invoiceAgreement.clubId}/agreements`, invoiceAgreement);
    },
    updateInvoiceAgreement({}, invoice) {
        return this.$axios.post(`/clubs/${invoice.agreement.clubId}/agreements/${invoice.id}`, invoice.agreement);
    }
};
