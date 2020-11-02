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
