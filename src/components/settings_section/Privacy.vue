<template>
  <div class="p-2">
    <label class="text-xs text-subtradelabel">Select Privacy Settings</label>
    <select
      class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500"
      v-model="selectedUserPrivacy">
      <option value="all">
        All
      </option>
      <option value="private">
        Private
      </option>
      <option value="followers">
        Followers
      </option>
      <option value="subscribers">
        Subscribers
      </option>
    </select>
  </div>
  <div class="mt-5">
    <div v-if="userPrivacy == 'all'" class="flex justify-around">
      Your profile is visible to everybody
    </div>
    <div v-if="userPrivacy == 'private'" class="flex justify-around">
      Your profile is visible only to you
    </div>
    <div v-if="userPrivacy == 'followers'" class="flex justify-around">
      Your profile is visible only to your followers
    </div>
    <div v-if="userPrivacy == 'subscribers'" class="flex justify-around">
      Your profile is visible only to your subscribers
    </div>
  </div>
  <div class="flex justify-start">
    <button
      class="px-4 py-2 m-6 font-bold text-white rounded bg-header-light hover:bg-header-dark"
      type="submit"
      @click="saveUserPrivacy()">
      Save
    </button>
    <button
      class="px-4 py-2 m-6 font-bold text-white bg-green-500 rounded"
      id="userPrivacyOk"
      style="display:none;">
      DONE
    </button>
    <button
      class="px-4 py-2 m-6 font-bold text-white bg-red-500 rounded"
      id="userPrivacyKo"
      style="display:none;">
      ERROR
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from "axios";
  export default {
    data: function() {
      return {
        selectedUserPrivacy: "",
      }
    },
    created: function() {
      this.selectedUserPrivacy = this.userPrivacy;
    },
    computed: {
      ...mapState("settingsModule", ["userPrivacy"])
    },
    methods: {
      saveUserPrivacy() {
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/update_privacy",
          data: {
            Privacy: this.selectedUserPrivacy
          }
        }).then(response => {
          if (response.data == "OK") {
            var s = document.getElementById("userPrivacyOk").style;
          } else {
            var s = document.getElementById("userPrivacyKo").style;
          }
          s.display = "block";
          s.opacity = 1;
          (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,100)})();
        })
      }
    }
  }
</script>




