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
  async getCharitySetToStore({ commit }, payload) {
    if (payload.id === 0) {
      commit("setCharity", new Charity());
    } else {
      const response = await axios.get(API_URL + "/api/v1/charities");
      if (response.status === 200) {
        const charity = response.data.find((charity) => charity.id === payload.id);
        commit("setCharity", charity);
      }
    }
  },
  async getCharitiesSetToStore({ commit }, payload) {
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
    const response = await axios.post(
      API_URL + "/api/v1/charities",
      ym === "" ? {} : { Year: ym[0], Month: ym[1] }
    )
    if (response.status === 200) {
      const charities = [];
      for (let charity of response.data) {
        charities.push({
          ...charity,
          description: cutShort(charity.description) + "...",
        });
      }
      commit("setCharities", charities)
    }
  },
  async getTotalStatSetToStore({ commit }) {
    const response = await axios.get(API_URL + "/api/v1/charities/dashboard")
    if (response.status === 200) {
      const total = "€ " + response.data.total_amount_raised.toLocaleString();
      const total_last_month =
        "€ " + response.data.total_amount_raised_last_month.toLocaleString();
        commit("setTotalStat", {total, total_last_month})
    }
  },
  updateCharity ({ commit }, payload) {
    commit("setCharity", payload);
    commit("snackbar/showMessage", {
      content: "Charity updated!",
      color: "success"
    }, {root: true})
  }
};
