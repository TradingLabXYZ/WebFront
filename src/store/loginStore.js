import axios from "axios";

export default {
  namespaced: true,
  state: {
    sessionId: ""
  },
  getters: {
    show: sessionId => {
      return state.sessionId;
    }
  },
  mutations: {
    SET_SessionId(state, sessionId) {
      state.sessionId = sessionId;
    }
  },
  actions: {
    setSessionId({commit}) {
      commit("SET_SessionId", this.sessionId)
    },
    delSessionId({commit}) {
      commit("SET_SessionId", "")
      localStorage.clear()
    }
  }
}
