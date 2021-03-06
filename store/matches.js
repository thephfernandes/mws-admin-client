import axios from "axios";
const API_URL = "https://cms-api.matchwornshirt.com";
const ADMIN_API_URL = "http://localhost:7071/api";

export const state = () => ({
  matches: [],
  allMatches: [],
  stats: [],
  invoices: [],
  match: {}
});

export const getters = {
  getMatches: (state) => state.matches,
  getAllMatches: (state) => state.allMatches,
  getStats: (state) => state.stats,
  getInvoices: (state) => state.invoices,
  getAgreements: (state) => state.invoices.map(i => i.name),
  getMatch: (state) => state.match,
  getMatchById: (state) => (id) => {
    return state.allMatches.find((m) => m.ID === id);
  },
};

export const mutations = {
  setAllMatches(state, payload) {
    state.allMatches = payload;
  },
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
  async getAllMatchesSetToStore({commit}) {
    const response = await axios.post(API_URL + "/api/v1/auction");
    if (response.status === 200) {
      commit("setAllMatches", response.data);
    }
  },

  async getFinanceMatchesSetToStore({ commit }) {
    const currentDate = new Date();
    // We want to get only past matches for the finance overview
    const startDate = new Date(new Date().setFullYear(currentDate.getFullYear() - 10)).toISOString();
    const endDate = currentDate.toISOString();

    const response = await axios.post(API_URL + "/api/v1/auction", {
      startDate,
      endDate,
    });

    if (response.status !== 200) {
      return;
    }

    let matches = [];
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
  },

  async getStatsSetToStore({ commit }) {
    const response = await axios.get(API_URL + "/api/v1/auction/dashboard");
    if (response.status === 200) {
      const data = response.data;
      const stats = [
        {
          title: "Most valuable player",
          icon: "mdi-account",
          name: data.most_valuable_player_global.name,
          amount:
            "??? " + data.most_valuable_player_global.amount.toLocaleString(),
        },
        {
          title: "Most valuable shirt",
          icon: "mdi-tshirt-crew",
          name: data.most_valuable_shirt_global.name,
          amount:
            "??? " + data.most_valuable_shirt_global.amount.toLocaleString(),
        },
        {
          title: "Most valuable club",
          icon: "mdi-account-group-outline",
          name: data.most_valuable_club_global.name,
          amount:
            "??? " + data.most_valuable_club_global.amount.toLocaleString(),
        },
        {
          title: "Most valuable auction",
          icon: "mdi-gavel",
          name:
            data.most_valuable_auction_global.home_club +
            " - " +
            data.most_valuable_auction_global.visiting_club,
          amount:
            "??? " +
            data.most_valuable_auction_global.amount.toLocaleString(),
        },
      ];
      commit("setStats", stats);
    }
  },

  async fetchMatch({ commit }, matchId) {
    const response = await axios.get(ADMIN_API_URL + `/matches/${matchId}`);
    if (response.status === 200) {
      const match = response.data
      commit("setMatch", match)
    }
  },

  async getMatchSetToStore({ commit, dispatch }, matchId) {
    const response = await axios
      .get(API_URL + `/api/v1/match/${matchId}`);
    if (response.status === 200) {
      const data = response.data;
      const match = {
        ...data,
        teams: data.home_club + " - " + data.visiting_club,
      };
      commit("setMatch", match);
      dispatch("getInvoicesSetToStore", match.featured_club_id);
    }
  },

  async getInvoicesSetToStore({ commit }, clubId) {
    const response = await this.$axios
      .get(`/clubs/${clubId}/agreements`);
    if (response.status === 200) {
      commit("setInvoices", response.data);
    }
  },
  
  updateMatch ({ commit }, match) {
    commit("setMatch", match);
  },
    async downloadClubInvoice({commit}, request) {
        return await this.$axios.post(`/pdf/club-invoice/${request.matchId}`, request.payload)
    }
};
