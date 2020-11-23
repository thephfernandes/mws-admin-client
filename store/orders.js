/*jshint esversion: 8*/
import ordersData from '~/assets/data/orders.json';

export const state = () => ({
    orders: [],
});

export const getters = {
    getOrders: (state) => {
        return state.orders;
    }
};

export const mutations = {
    fill(state, payload) {
        state.orders = payload;
    }
};

export const actions = {
    fillAll({ commit }) {
        commit('fill', ordersData);
    },
};