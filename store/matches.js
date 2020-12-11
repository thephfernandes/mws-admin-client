import axios from "axios";
const API_URL = "https://cms-api.matchwornshirt.com"; // will be replaced

export const state = () => ({
  matches: [],
  stats: [],
  invoices: [],
  match: {}
});

export const getters = {
  getMatches: (state) => state.matches,
  getStats: (state) => state.stats,
  getInvoices: (state) => state.invoices,
  getAgreements: (state) => state.invoices.map(i => i.id), // replace id with name later
  getMatch: (state) => state.match,
};

export const mutations = {
  setMatches(state, payload) {
    state.matches = payload;
  },
  setStats(state, payload) {
    state.stats = payload;
  },
  setInvoices(state, payload) {
    state.invoices = payload;
  },
  setMatch(state, payload) {
    state.match = payload;
  },
};

export const actions = {
  async getMatchesSetToStore({ commit }) {
    const oDate = new Date();
    oDate.setMonth(oDate.getMonth() - 1);
    const StartDate = oDate.toISOString();
    oDate.setFullYear(oDate.getFullYear() + 10); // We want them from one month ago as well as the future ones
    const EndDate = oDate.toISOString();
    let matches = [];
    const response = await axios.post(API_URL + "/api/v1/auction", {
      StartDate,
      EndDate,
    });
    if (response.status === 200) {
      matches = response.data
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
    }
  },
  async getStatsSetToStore({ commit }, payload) {
    const response = await axios.get(API_URL + "/api/v1/auction/dashboard");
    if (response.status === 200) {
      const data = response.data;
      const stats = [
        {
          title: "Most valuable player",
          icon: "mdi-account",
          name: response.most_valuable_player_global.name,
          amount:
            "€ " + response.most_valuable_player_global.amount.toLocaleString(),
        },
        {
          title: "Most valuable shirt",
          icon: "mdi-tshirt-crew",
          name: response.most_valuable_shirt_global.name,
          amount:
            "€ " + response.most_valuable_shirt_global.amount.toLocaleString(),
        },
        {
          title: "Most valuable club",
          icon: "mdi-account-group-outline",
          name: response.most_valuable_club_global.name,
          amount:
            "€ " + response.most_valuable_club_global.amount.toLocaleString(),
        },
        {
          title: "Most valuable auction",
          icon: "mdi-gavel",
          name:
            response.most_valuable_auction_global.home_club +
            " - " +
            response.most_valuable_auction_global.visiting_club,
          amount:
            "€ " +
            response.most_valuable_auction_global.amount.toLocaleString(),
        },
      ];
      commit("setStats", stats);
    }
  },
  async getMatchSetToStore({ commit, dispatch }, payload) {
    const response = await axios
      .get(API_URL + `/api/v1/match/${payload.id}`);
    if (response.status === 200) {
      const data = response.data;
      const match = {
        ...data,
        teams: data.home_club + " - " + data.visiting_club,
      }
      commit("setMatch", match);
      dispatch("getInvoicesSetToStore", {id: match.featured_club_id});
    }
  },
  async getInvoicesSetToStore({ commit }, payload) {
    const response = await this.$axios
      .get(`/clubs/${payload.id}/agreements`);
    if (response.status === 200) {
      commit("setInvoices", response.data);
    }
  },
  updateMatch ({ commit }, payload) {
    commit("setMatch", payload);
  }
};
