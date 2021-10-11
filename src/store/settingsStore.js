import axios from "axios";

export default {
  namespaced: true,
  state: {
    userSocial: {
      Email: "",
      Twitter: "",
      Website: ""
    },
    userPassword: {
      OldPassword: "",
      NewPassword: "",
      RepeatNewPassword: ""
    },
    userPrivacy: "",
    userPlan: "",
    userPremiumData: {
      Payments: {},
      RemainingDays: 0
    }
  },
  getters: {
    userSocial: state => {
      return state.userSocial;
    },
    userPassword: state => {
      return state.userPassword;
    },
    userPrivacy: state => {
      return state.userPrivacy;
    },
    userPlan: state => {
      return state.userPlan;
    },
    userPremiumData: state => {
      return state.userPremiumData;
    }
  },
  mutations: {
    SET_UserSocial(state, userSocial) {
      state.userSocial = userSocial;
    },
    SET_UserPassword(state, userPassword) {
      state.userPassword = userPassword;
    },
    SET_UserPrivacy(state, userPrivacy) {
      state.userPrivacy = userPrivacy;
    },
    SET_UserPlan(state, userPlan) {
      state.userPlan = userPlan;
    },
    SET_UserPremiumData(state, userPremiumData) {
      state.userPremiumData = userPremiumData;
    }
  },
  actions: {
    setUserPrivacy({commit}, userPrivacy) {
      commit("SET_UserPrivacy", userPrivacy);
    },
    getUserSettings({commit, dispatch}) {
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: import.meta.env.VITE_ROOT_API + "/user_settings",
      }).then(response => {
        if (response.status === 200) {
          commit("SET_UserSocial", {
            Email: response.data.Email,
            Twitter: response.data.Twitter,
            Website: response.data.Website
          });
          commit("SET_UserPrivacy", response.data.Privacy);
          commit("SET_UserPlan", response.data.Plan);
          if (response.data.Plan == "premium") {
            dispatch("getUserPremiumData");
          }
        }
      }).catch(function (error) {
        console.log("ERROR: failed changing user settings...")
      })
    },
    getUserPremiumData({commit}) {
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: import.meta.env.VITE_ROOT_API + "/user_premium_data",
      }).then(response => {
        if (response.status === 200) {
          commit("SET_UserPremiumData", {
            Payments: response.data.Payments,
            RemainingDays: response.data.RemainingDays
          });
        }
      }).catch(function (error) {
        console.log("ERROR: failed changing user premium data...")
      })
    }
  }
}
