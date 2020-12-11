import axios from "axios";
const API_URL = "https://cms-api.matchwornshirt.com"; // will be replaced

export const state = () => ({
  matches: [],
  stats: [],
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
  async fillMatches({ commit }) {
    const oDate = new Date();
    oDate.setMonth(oDate.getMonth() - 1);
    const StartDate = oDate.toISOString();
    oDate.setFullYear(oDate.getFullYear() + 10); // We want them from one month ago as well as the future ones
    const EndDate = oDate.toISOString();
    let matches = [];
    axios
      .post(API_URL + "/api/v1/auction", { StartDate, EndDate })
      .then((r) => r.data)
      .then((response) => {
        matches = response
          .map((match) => ({
            ...match,
            status: match.Finished ? "Ended" : "Live",
            localDate: new Date(match.Date).toLocaleString(),
            worn: match.Worn ? "Worn" : "Not Worn",
          }))
          .sort((a, b) => {
            return new Date(b.Date) - new Date(a.Date);
          });
        commit("setMatches", matches);
      });
  },
  async fillStats({ commit }, payload) {
    axios
      .get(API_URL + '/api/v1/auction/dashboard')
      .then(response => response.data)
      .then(response => {
        const stats = [
          {
            title: "Most valuable player",
            icon: "mdi-account",
            name: response.most_valuable_player_global.name,
            amount: "€ " + response.most_valuable_player_global.amount.toLocaleString(),
          },
          {
            title: "Most valuable shirt",
            icon: "mdi-tshirt-crew",
            name: response.most_valuable_shirt_global.name,
            amount: "€ " + response.most_valuable_shirt_global.amount.toLocaleString(),
          },
          {
            title: "Most valuable club",
            icon: "mdi-account-group-outline",
            name: response.most_valuable_club_global.name,
            amount: "€ " + response.most_valuable_club_global.amount.toLocaleString(),
          },
          {
            title: "Most valuable auction",
            icon: "mdi-gavel",
            name: response.most_valuable_auction_global.home_club + " - " + response.most_valuable_auction_global.visiting_club,
            amount: "€ " + response.most_valuable_auction_global.amount.toLocaleString(),
          },
        ];
        commit("setStats", stats)
      });
  }
};
