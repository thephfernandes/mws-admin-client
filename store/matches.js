import axios from "axios";

export const state = () => ({
    matches: []
});

export const getters = {
    getMatches: (state) => {
        return state.matches;
    },
    getMatch: (state) => (id) => {
        return state.matches.find((m) => m.ID === id);
    },
};

export const mutations = {
    setMatches(state, payload) {
        state.matches = payload;
    }
};

export const actions = {
    async fillMatches({ commit }) {
        await axios.get('https://cms-api.matchwornshirt.com/api/v1/auction\n').then((response) => {
            if (response.status === 200) {
                commit('setMatches', response.data);
            }
        });
    }
};
