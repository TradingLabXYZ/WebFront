import axios from "axios";

export default {
  namespaced: true,
  state: {
    sessionId: "",
    username: "",
    usercode: "",
    profilePicture: ""
  },
  getters: {
    sessionId: state => {
      return state.sessionId;
    },
    username: state => {
      return state.username;
    },
    usercode: state => {
      return state.usercode;
    },
    profilePicture: state => {
      return state.profilePicture;
    }
  },
  mutations: {
    SET_SessionId(state, sessionId) {
      state.sessionId = sessionId;
    },
    SET_Username(state, username) {
      state.username = username;
    },
    SET_Usercode(state, usercode) {
      state.usercode = usercode;
    },
    SET_ProfilePicture(state, profilePicture) {
      state.profilePicture = profilePicture;
    }
  },
  actions: {
    logout({commit}) {
      localStorage.clear();
      commit("SET_SessionId", "");
      commit("SET_Username", "");
      commit("SET_Usercode", "");
      commit("SET_ProfilePicture", "");
      document.cookie = "sessionId=;";
    },
    setSessionId({commit}, sessionId) {
      commit("SET_SessionId", sessionId);
    },
    setUsername({commit}, username) {
      commit("SET_Username", username);
    },
    setUsercode({commit}, usercode) {
      commit("SET_Usercode", usercode);
    },
    setProfilePicture({commit}, profilePicture) {
      commit("SET_ProfilePicture", profilePicture);
    }
  }
}
