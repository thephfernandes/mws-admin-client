import axios from "axios";
const API_URL = "https://cms-api.matchwornshirt.com"; // will be replaced

export const state = () => ({
  matches: [],
  stats: {},
});

export const getters = {
  getMatches: (state) => state.matches,
  getStats: (state) => state.stats,
};

export const mutations = {
  setMatches(state, payload) {
    state.matches = payload;
  },
  setStats(state, payload) {
    state.stats = payload;
  },
};

export const actions = {
  async fillMatches({ commit }, payload) {
    axios.get(API_URL + "/api/v1/match").then((response) => {
      const matches = [];
      for (const match of response.data) {
        const data = {
          ...match,
          score: match.local_team_score + " - " + match.visitor_team_score,
          date: match.date + " - " + match.time,
        };
        matches.push(data);
      }
      commit("setMatches", matches)
    });
  },
};
