/*jshint esversion: 8*/
import ordersData from '~/assets/data/orders.json';
import framingItem from '~/assets/data/framing-3734.json';
import productItem from '~/assets/data/product-3911.json';

export const state = () => ({
    orders: [],
    framing: [],
    products: []
});

export const getters = {
    getOrders: (state) => {
        return state.orders;
    },
    getMatchesId: (state) => {
        const matchesId = state.orders.map((o) => o.MatchID);
        return matchesId.filter((item, pos) => matchesId.indexOf(item) === pos);
    },
    getOrder: (state) => (id) => {
        return state.orders.find((o) => o.OrderID === id);
    },
    getFraming: (state) => (id) => {
        return state.framing.find((f) => f.ID === id);
    },
    getProduct: (state) => (id) => {
        return state.products.find((p) => p.ID === id);
    }
};

export const mutations = {
    fill(state, payload) {
        state.orders = payload;
    },
    fillFraming(state, payload) {
        state.framing.push(payload);
    },
    updateFraming(state, frame) {
        const i = state.framing.findIndex((f) => f.ID === frame.ID);
        state.framing[i] = frame;
    },
    fillProducts(state, payload) {
        state.products.push(payload);
    },
    updateShippingStatus(state, order) {
        const o = state.orders.find((o) => o.OrderID === order.OrderID);
        o.OrderShippingStatus = order.OrderShippingStatus;
    },
    updateOrder(state, order) {
        const i = state.orders.findIndex((o) => o.OrderID === order.OrderID);
        state.orders[i] = order;
    }
};

export const actions = {
    fillOrders({ commit }) {
        commit('fill', ordersData);
    },
    fillFraming({ commit }) {
        commit('fillFraming', framingItem);
    },
    updateFraming({ commit }, framingItem) {
        commit('updateFraming', framingItem);
    },
    fillProducts({ commit }) {
        commit('fillProducts', productItem);
    },
    updateShippingStatus({ commit }, order) {
        commit('updateShippingStatus', order);
    },
    updateOrder({ commit }, order) {
        commit('updateOrder', order);
    }
};
