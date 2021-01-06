export const state = () => ({
    sellers: []
});

export const getters = {
    getSellers: (state) => {
        return state.sellers;
    },
    getSeller: (state) => (id) => {
        return state.sellers.find((s) => s.id === id);
    },
};

export const mutations = {
    setSellers(state, payload) {
        state.sellers = payload;
    }
};

export const actions = {
    async getSellersSetToStore({ commit }) {
        const response = await this.$axios.get('/sellers');

        if (response.status === 200) {
            commit('setSellers', response.data);
        }
    },
    getSeller({}, sellerId) {
        return this.$axios.get(`/sellers/${sellerId}`);
    },
    updateSeller({}, seller) {
        return this.$axios.post(`/sellers/${seller.id}`, seller);
    },
    addSeller({}, seller) {
        return this.$axios.post('/sellers', seller);
    }
};
