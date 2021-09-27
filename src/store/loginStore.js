import axios from "axios";

export default {
  namespaced: true,
  state: {
    sessionId: "",
    username: ""
  },
  getters: {
    sessionId: state => {
      return state.sessionId;
    },
    username: state => {
      return state.username;
    }
  },
  mutations: {
    SET_SessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
    SET_Username(state, username) {
      state.username = username;
    }
  },
  actions: {
    logout({commit}) {
      localStorage.clear();
      commit("SET_SessionId", "");
      commit("SET_Username", "");
      document.cookie = "sessionId=;";
    },
    setSessionId({commit}, sessionId) {
      commit("SET_SessionId", sessionId);
    },
    setUsername({commit}, username) {
      commit("SET_Username", username);
    },
  }
}
