/*jshint esversion: 8*/
import ordersData from '~/assets/data/orders.json';
import framingItem from '~/assets/data/framing-3734.json'

export const state = () => ({
    orders: [],
    framing: []
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
    }
};

export const mutations = {
    fill(state, payload) {
        state.orders = payload;
    },
    fillFraming(state, payload) {
        if (state.framing.length > 0) {
            return;
        }
        state.framing.push(payload);
    },
    updateFraming(state, frame) {
        const i = state.framing.findIndex((f) => f.ID === frame.ID);
        state.framing[i] = frame;
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
    updateShippingStatus({ commit }, order) {
        commit('updateShippingStatus', order);
    },
    updateOrder({ commit }, order) {
        commit('updateOrder', order);
    }
};
