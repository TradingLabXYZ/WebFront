import axios from "axios";
import idb from "@/db/idb.js"

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
    logout({commit, getters}) {
      idb.deleteUser(getters.sessionId);
      commit("SET_SessionId", "");
      commit("SET_Username", "");
      commit("SET_Usercode", "");
      commit("SET_ProfilePicture", "");
      var c = document.cookie.split("; ");
      for (var i in c) { 
        document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
      }
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
