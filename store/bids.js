export const state = () => ({
    productBids: [],
});

export const getters = {
    getBids: (state) => {
        return state.productBids;
    },
};

export const mutations = {
    setBids(state, payload) {
        state.productBids = payload;
    },
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
}