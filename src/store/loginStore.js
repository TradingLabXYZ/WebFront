import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: "",
    score: 0,
  },
  getters: {
    show: state => {
      return state.show;
    },
    score: state => {
      return state.score;
    },
  },
  mutations: {
    SET_Token(state, token) {
      state.token = token;
    },
    SET_Score(state, score) {
      state.score = score;
    },
  },
  actions: {
    setToken({commit}) {
      commit("SET_Token", this.token)
    },
    delToken({commit}) {
      commit("SET_Token", "")
      localStorage.clear()
    },
    getScore ({commit}) {
      axios({
        method: "GET",
        url: import.meta.env.VITE_ROOT_API + "/moment",
        headers: {"content-type": "text/plain"}
      }).then(result => {
        commit("SET_Score", parseInt(result.data))
      }).catch(error => {
        console.error(error);
      });
    },
  }
}
