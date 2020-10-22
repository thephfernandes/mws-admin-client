import customersData from '~/assets/data/customers.json';

export const state = () => ({
    list: []
})

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
}

export const actions = {
    getAll({ commit }) {
        commit('fill', customersData);
    }
}
