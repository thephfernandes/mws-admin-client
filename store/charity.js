import axios from "axios";

export const state = () => ({
  charity: {},
});

export const getters = {
  getCharity: (state) => {
    return state.charity;
  },
};

export const mutations = {
  setOrg(state, payload) {
    state.charity = payload;
  },
};

export const actions = {
  async fillCharity({ commit }, payload) {
    if (payload.id === 0) {
      commit("setOrg", {
        id: 0,
        title: '',
        total_raised: 0,
        description: '',
      })
    } else {
    const API_URL = "https://mws-cms-api.herokuapp.com"; // will be replaced
    await axios
      .post(API_URL + "/api/v1/charities")
      .then((response) => response.data)
      .then((response) => {
        const charity = response.find((charity) => charity.id === payload.id);
        commit("setOrg", charity);
      });
    }
  },
};
