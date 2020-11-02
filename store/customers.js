import customersData from '~/assets/data/customers.json';

export const state = () => ({
    list: []
});

export const getter = {
    customers: (state) => {
        return state.list;
    },
    getRecurring: (state) => {
        return state.list.filter((c) => c.recurring)
    },
    totalCustomers: (state) => {
        if (state.list.length == 0) return 0;
        return state.list.length;
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
        state.list.remove();
    }
};

export const actions = {
    getAll({ commit }) {
        commit('fill', customersData);
    }
};
