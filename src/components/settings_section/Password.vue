<template>
  <div class="p-2">
    <label class="text-xs text-subtradelabel">Old Password</label>
    <input
      type="password"
      placeholder="Old Password"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="userPassword.OldPassword">
  </div>
  <div class="p-2">
    <label class="text-xs text-subtradelabel">New Password</label>
    <input
      type="password"
      placeholder="New Password"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="userPassword.NewPassword">
  </div>
  <div class="p-2">
    <label class="text-xs text-subtradelabel">Repeat New Password</label>
    <input
      type="password"
      placeholder="Repeat New Password"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="userPassword.RepeatNewPassword">
  </div>
  <div class="flex justify-start">
    <button
      class="px-4 py-2 m-6 font-bold text-white rounded bg-header-light hover:bg-header-dark"
      type="submit"
      @click="saveUserPassword()">
      Save
    </button>
    <button
      class="px-4 py-2 m-6 font-bold text-white bg-green-500 rounded"
      id="userPasswordOk"
      style="display:none;">
      DONE
    </button>
    <button
      class="px-4 py-2 m-6 font-bold text-white bg-red-500 rounded"
      id="userPasswordKo"
      style="display:none;">
      ERROR
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from "axios";
  export default {
    computed: {
      ...mapState("settingsModule", ["userPassword"])
    },
    methods: {
      saveUserPassword() {
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/update_password",
          data: this.userPassword
        }).then(response => {
          if (response.data == "OK") {
            var s = document.getElementById("userPasswordOk").style;
          } else {
            var s = document.getElementById("userPasswordKo").style;
          }
          s.display = "block";
          s.opacity = 1;
          (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,100)})();
          this.userPassword.OldPassword = "";
          this.userPassword.NewPassword = "";
          this.userPassword.RepeatNewPassword = "";
        })
      }
    }
  }
</script>
