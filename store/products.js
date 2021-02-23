import axios from "axios";
const API_URL = "http://localhost:7071/api/";

export const state = () => ({
    products: [],
    // products: [
    //     {
    //         productId: 1,
    //         name: 'Giorgian De Arrascaeta',
    //         team: 'Flamengo',
    //         opposingClub: 'Internacional',
    //         winningBidId: 1,
    //         bids: [
    //             {
    //                 id: 1,
    //                 amount: 2300,
    //                 currencyCode: 'EUR',
    //             },
    //             {
    //                 id: 2,
    //                 amount: 2200,
    //                 currencyCode: 'EUR', 
    //             },
    //             {
    //                 id: 3,
    //                 amount: 1900,
    //                 currencyCode: 'EUR',
    //             }
    //         ]
    //     },
    //     {
    //         productId: 2,
    //         name: 'Gabriel Barbosa',
    //         team: 'Flamengo',
    //         opposingClub: 'Internacional time lixo',
    //         winningBidId: 4,
    //         bids: [
    //             {
    //                 id: 4,
    //                 amount: 2000,
    //                 currencyCode: 'EUR', 
    //             },
    //             {
    //                 id: 5,
    //                 amount: 1800, 
    //                 currencyCode: 'EUR',
    //             },
    //             {
    //                 id: 6,
    //                 amount: 1700,
    //                 currencyCode: 'EUR',
    //             },
    //         ]
    //     },
    //     {
    //         productId: 3,
    //         name: 'Everton Ribeiro',
    //         team: 'Flamengo',
    //         opposingClub: 'Internacional trashhh',
    //         winningBidId: 8,
    //         bids: [
    //             {
    //                 id: 7,
    //                 amount: 1800,
    //                 currencyCode: 'EUR',
    //             },
    //             {
    //                 id: 8,
    //                 amount: 1700,
    //                 currencyCode: 'EUR',
    //             }
    //         ]
    //     }
    // ],
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
        const response = await axios.get(API_URL + `/matches/${matchId}/products`);
        if (response.status === 200) {
            const products = response.data
            commit("setProducts", products);
        }
    },
}