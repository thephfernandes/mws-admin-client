import axios from 'axios';
const API_URL = "https://cms-api.matchwornshirt.com"; // will be replaced
import { Charity } from "~/models/charity"

export const state = () => ({
  charity: {},
  charities: [],
  total: '',
  total_last_month: '',
});

export const getters = {
  getCharity: (state) => {
    return state.charity;
  },
  getCharities: (state) => {
    return state.charities;
  },
  getTotal: (state) => {
    return state.total;
  },
  getTotalLastMonth: (state) => {
    return state.total_last_month;
  }
};

export const mutations = {
  setCharity(state, payload) {
    state.charity = payload;
  },
  setCharities(state, payload) {
    state.charities = payload;
  },
  setTotalStat(state, payload) {
    state.total = payload.total;
    state.total_last_month = payload.total_last_month;
  }
};

export const actions = {
  async fillCharity({ commit }, payload) {
    if (payload.id === 0) {
      commit("setCharity", new Charity());
    } else {
      await axios
        .post(API_URL + "/api/v1/charities")
        .then((response) => response.data)
        .then((response) => {
          const charity = response.find((charity) => charity.id === payload.id);
          commit("setCharity", charity);
        });
    }
  },
  async fillCharities({ commit }, payload) {
    const ym = payload.month === "" ? "" : payload.month.split("-");
    const cutShort = (str) => {
      let L = str.length,
        i = -1,
        n = 25;
      while (n-- && i++ < L) {
        i = str.indexOf(" ", i);
        if (i < 0) break;
      }
      return str.slice(0, i);
    };
    axios
      .post(
        API_URL + "/api/v1/charities",
        ym === "" ? {} : { Year: ym[0], Month: ym[1] }
      )
      .then((response) => response.data)
      .then((response) => {
        const charities = [];
        for (let charity of response) {
          charities.push({
            ...charity,
            description: cutShort(charity.description) + "...",
          });
        }
        commit("setCharities", charities)
      });
  },
  async fillTotalStat({ commit }) {
    axios
      .get(API_URL + "/api/v1/charities/dashboard")
      .then((response) => response.data)
      .then((response) => {
        const total = "€ " + response.total_amount_raised.toLocaleString();
        const total_last_month =
          "€ " + response.total_amount_raised_last_month.toLocaleString();
        commit("setTotalStat", {total, total_last_month})
      });
  },
  updateCharity ({ commit }, payload) {
    commit("setCharity", payload);
  }
};
