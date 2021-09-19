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
    clearLocalStorage() {
      localStorage.clear();
    },
    setSessionId({commit}, sessionId) {
      commit("SET_SessionId", sessionId);
    },
    delSessionId({commit}) {
      commit("SET_SessionId", "");
    },
    setUsername({commit}, username) {
      commit("SET_Username", username);
    },
    delUsername({commit}) {
      commit("SET_Username", "");
    }
  }
}
