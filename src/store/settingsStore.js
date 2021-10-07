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
    userPrivacy: {
      Privacy: ""
    },
    userPlan: {
      Plan: ""
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
    }
  },
  actions: {
    getUserSettings({commit}) {
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
          commit("SET_UserPrivacy", {
            Privacy: response.data.Privacy
          });
          commit("SET_UserPlan", {
            Plan: response.data.Plan
          });
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
}
