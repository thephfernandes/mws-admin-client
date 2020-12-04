import Clubs from "~/assets/data/clubs.json";

export const state = () => ({
    clubs: []
});

export const getters = {
    getClubs: (state) => {
        return state.clubs;
    },
    getClub: (state) => (id) => {
        return state.clubs.find((c) => c.id === id);
    }
};

export const mutations = {
    setClubs(state, payload) {
        state.clubs = payload;
    }
};

export const actions = {
    fillClubs({ commit }) {
        commit('setClubs', Clubs)
    },
    getInvoiceAgreement({}, clubId) {
        return this.$axios.get(`/clubs/${clubId}/agreements`);
    }
};
