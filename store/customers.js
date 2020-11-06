/*jshint esversion: 8*/
import customersData from '~/assets/data/customers.json';

export const state = () => ({
    list: []
});

export const getters = {
    getTotalRecurring: (state) => {
        return state.list.filter((c) => c.recurring).length;
    },
    totalCustomers: (state) => {
        return state.list.length;
    },
    getLast: (state) => {
        return state.list[state.list.length - 1];
    },
    getCustomer: (state) => (id) => {
        return state.list.find((c) => c.id === id);
    }
};

export const mutations = {
    fill(state, payload) {
        state.list = payload
    },
    add(state, customer) {
        state.list.push(customer);
    },
    remove(state, customer) {
        state.list.remove(customer);
    },
    update(state, customer) {
        const i = state.list.findIndex((c) => c.id === customer.id);
        state.list[i] = customer;
    }
};

export const actions = {
    fillAll({ commit }) {
        commit('fill', customersData);
    },
    update({ commit }, customer) {
        commit('update', customer);
    },
    add({ commit }, customer) {
        commit('commit', customer);
    }
};
