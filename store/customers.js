/*jshint esversion: 8*/
import customersData from '~/assets/data/customers.json';

export const state = () => ({
    list: []
});

export const getters = {
    getRecurring: (state) => {
        return state.list.filter((c) => c.recurring)
    },
    totalCustomers: (state) => {
        if (state.list.length == 0) return 0;
        return state.list.length;
    },
    getName: (state) => {
        return state.name;
    }
};

export const mutations = {
    fill(state, payload) {
        state.list = payload
    },
    add(state, { user }) {
        state.list.push(user);
    },
    remove(state, { user }) {
        state.list.remove(user);
    }
};

export const actions = {
    fillAll({ commit }) {
        commit('fill', customersData);
    }
};
