import axios from "axios";
const API_URL = "https://mws-cms-api.herokuapp.com"; // will be replaced
import { News } from "~/models/news";

export const state = () => ({
  fileUrls: [],
  posts: [],
  post: {},
});

export const getters = {
  getFileUrls: (state) => {
    return state.fileUrls;
  },
  getPosts: (state) => {
    return state.posts;
  },
  getPost: (state) => {
    return state.post;
  },
};

export const mutations = {
  setFileUrls(state, payload) {
    state.fileUrls = payload;
  },
  setPosts(state, payload) {
    state.posts = payload;
  },
  setPost(state, payload) {
    state.post = payload;
  },
};

export const actions = {
  async getFileUrlsSetToStore({ commit }, payload) {
    if (payload.id === 0) {
      commit("setFileUrls", []);
    } else {
      const response = await axios.get(
        API_URL + `/api/v1/news/${payload.id}/files`
      );
      if (response.status === 200) {
        commit("setFileUrls", response.data);
      }
    }
  },
  async getPostsSetToStore({ commit }) {
    const response = await axios.get(API_URL + "/api/v1/news")
    if (response.status === 200) {
      commit("setPosts", response.data);
    }
  },
  async getPostSetToStore({ commit }, payload) {
    if (payload.id === 0) {
      commit("setPost", new News());
    } else {
      const response = await axios
        .get(API_URL + `/api/v1/news/${payload.id}`)
      if (response.status === 200) {
        const data = response.data[0];
        const post = {
          ...data,
          PreviewImage: data.PreviewImage.replace(
            "https://matchwornshirt.imgix.net/news/" + payload.id + "/",
            ""
          ),
        };
        commit("setPost", post);
      }
    }
  },
  updatePost({ commit }, payload) {
    commit("setPost", payload);
  },
};
