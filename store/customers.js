/*jshint esversion: 8*/
import customersData from '~/assets/data/customers.json';

export const state = () => ({
    list: [],
    notes: [{id: 99, text: 'This customer is important!'}]
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
    },
    getNotes: (state) => {
        return state.notes;
    },
    getNote: (state) => (id) => {
        return state.notes.find((n) => n.id === id);
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
        state.list.splice(state.list.indexOf(customer), 1)
    },
    suspend(state, customer) {
        const c = state.list.find((c) => c.id === customer.id);
        c.status = 4;
    },
    update(state, customer) {
        const i = state.list.findIndex((c) => c.id === customer.id);
        state.list[i] = customer;
    },
    addNote(state, note) {
        state.notes.push(note);
    },
    removeNote(state, note) {
        state.notes.splice(state.notes.indexOf(note), 1);
    },
    updateNote(state, note) {
        const i = state.notes.findIndex((n) => n.id === note.id);
        state.notes[i] = note;
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
    },
    remove({ commit }, customer) {
        commit('remove', customer);
    },
    suspend({ commit }, customer) {
        commit('suspend', customer);
    },
    addNote({ commit }, note) {
        commit('addNote', note);
    },
    updateNote({ commit }, note) {
        commit('updateNote', note);
    }
};
