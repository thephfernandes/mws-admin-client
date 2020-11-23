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
    },
    updateShippingStatus(state, order) {
        const o = state.orders.find((o) => o.OrderID === order.OrderID);
        o.OrderShippingStatus = order.OrderShippingStatus;
    },
};

export const actions = {
    fillAll({ commit }) {
        commit('fill', ordersData);
    },
    updateShippingStatus({ commit }, order) {
        commit('updateShippingStatus', order);
    }
};