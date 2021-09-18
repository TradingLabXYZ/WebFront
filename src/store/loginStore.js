import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: ""
  },
  getters: {
    show: state => {
      return state.show;
    }
  },
  mutations: {
    SET_Token(state, token) {
      state.token = token;
    }
  },
  actions: {
    setToken({commit}) {
      commit("SET_Token", this.token)
    },
    delToken({commit}) {
      commit("SET_Token", "")
      localStorage.clear()
    }
  }
}
