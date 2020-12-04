import axios from 'axios'

export const state = () => ({
  fileUrls: [],
});

export const getters = {
  getFileUrls: (state) => {
    return state.fileUrls;
  },
};

export const mutations = {
  setFileUrls(state, payload) {
    state.fileUrls = payload;
  },
};

export const actions = {
  async fillFileUrls({ commit }, payload) {
    const API_URL = "https://mws-cms-api.herokuapp.com"; // will be replaced
    await axios
      .get(API_URL + `/api/v1/news/${payload.id}/files`)
      .then((response) => {
        commit("setFileUrls", response.data);
      });
    // await this.$axios.get("/sellers").then((response) => {
    //   if (response.status === 200) {
    //     commit("setSellers", response.data);
    //   }
    // });
  }, 
};
