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
        console.log("new state:", state.productBids)
    },
};

export const actions = {
    async fetchBids({ commit, rootGetters }) {
        const product = rootGetters["products/getSelectedProduct"];
        console.log("selected product", product)
        await this.$axios.get(`/matches/${product.matchId}/products/${product.id}/bids`)
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    const bids = response.data;
                    console.log("response data:", bids)
                    commit("setBids", bids);
                }
            })
    },
}