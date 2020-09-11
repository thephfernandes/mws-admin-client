import axios from 'axios';

export const state = () => ({
    list: []
})

export const mutations = {
    fill(state, payload) {
        state.list = payload
    },
    add(state, { user }) {
        state.list.push(user);
    }
}

export const actions = {
    async getAll({ commit }) {
        await axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => { commit('fill', response.data) })
            .catch((e) => console.log(e));
    }
}