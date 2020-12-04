import Clubs from "~/assets/data/clubs.json";

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
    fillClubs({ commit }) {
        commit('setClubs', Clubs)
    },
    async getInvoiceAgreement({commit}, clubId) {
        await this.$axios.get(`/clubs/${clubId}/agreements`).then((response) => {
            commit('setInvoiceAgreements', response.data);
        });
    },
    addInvoiceAgreement({}, invoiceAgreement) {
        return this.$axios.post(`/clubs/${invoiceAgreement.clubId}/agreements`, invoiceAgreement);
    },
    updateInvoiceAgreement({}, invoice) {
        return this.$axios.post(`/clubs/${invoice.agreement.clubId}/agreements/${invoice.id}`, invoice.agreement);
    }
};
