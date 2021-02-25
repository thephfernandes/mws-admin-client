export const state = () => ({
    productBids: [],
    selectedBid: {},
});

export const getters = {
    getBids: (state) => {
        return state.productBids;
    },

    getSelectedBid: (state) => {
        return state.selectedBid;
    }
};

export const mutations = {
    setBids(state, payload) {
        state.productBids = payload;
    },

    setSelectedBid(state, payload) {
        state.selectedBid = payload;
    }
};

export const actions = {
    async fetchBids({ commit, rootGetters }) {
        const product = rootGetters["products/getSelectedProduct"];
        await this.$axios.get(`/matches/${product.matchId}/products/${product.id}/bids`)
            .then(response => {
                if (response.status === 200) {
                    const bids = response.data;
                    commit("setBids", bids);
                }
            })
    },

    createBid({}, payload) {
        return this.$axios.post(`/matches/${payload.matchId}/products/${payload.productId}/bids`, payload.bid)
    },

    updateWinningBid({}, payload) {
        return this.$axios.post(`/matches/${payload.matchId}/products/${payload.productId}/bids/${payload.bid.id}`, payload.bid)
    }
}