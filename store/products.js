export const state = () => ({
    products: [],
    selectedProduct: {}
});

export const getters = {
    getProducts: (state) => {
        return state.products;
    },

    getSelectedProduct: (state) => {
        return state.selectedProduct;
    }
};

export const mutations = {
    setProducts(state, payload) {
        state.products = payload;
    },

    setSelectedProduct(state, payload) {
        state.selectedProduct = payload;
    },

    updateProductWinningBid(state, payload) {
        state.selectedProduct.winningBidId = payload;
    }
};

export const actions = {
    async fetchProducts({ commit }, matchId) {
        const response = await this.$axios.get(`/matches/${matchId}/products`);
        if (response.status === 200) {
            const products = response.data
            commit("setProducts", products);
        }
    },
}