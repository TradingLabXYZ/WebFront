<template>
  <div class="flex justify-around">
    <label class="text-xs text-subtradelabel image">
      <input
        type="file"
        accept="image/*"
        @change="uploadImage($event)"
        style="display:none;"
        id="file-input">
      <img  
        :src="profilePicture"
        class="w-32 h-32 border border-gray-900 rounded-full">
      <div class="overlay">
        EDIT
      </div>
    </label>
  </div>
  <div class="p-2">
    <label class="text-xs text-subtradelabel">Email</label>
    <input
      type="email"
      placeholder="Email"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="userSocial.Email">
  </div>
  <div class="p-2">
    <label class="text-xs text-subtradelabel">Twitter</label>
    <input
      type="url"
      placeholder="Twitter"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="userSocial.Twitter">
  </div>
  <div class="p-2">
    <label class="text-xs text-subtradelabel">Website</label>
    <input
      type="url"
      placeholder="Website"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="userSocial.Website">
  </div>
  <div class="flex justify-start">
    <button
      class="px-4 py-2 m-6 font-bold text-white rounded bg-header-light hover:bg-header-dark"
      type="submit"
      @click="saveUserSocial()">
      Save
    </button>
    <button
      class="px-4 py-2 m-6 font-bold text-white bg-green-500 rounded"
      id="userSocialOk"
      style="display:none;">
      DONE
    </button>
    <button
      class="px-4 py-2 m-6 font-bold text-white bg-red-500 rounded"
      id="userSocialKo"
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
      ...mapState("loginModule", ["profilePicture"]),
      ...mapState("settingsModule", ["userSocial"])
    },
    methods: {
      saveUserSocial() {
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/user_settings",
          data: this.userSocial
        }).then(response => {
          if (response.data == "OK") {
            var s = document.getElementById("userSocialOk").style;
          } else {
            var s = document.getElementById("userSocialKo").style;
          }
          s.display = "block";
          s.opacity = 1;
          (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,100)})();
        }).catch(function (error) {
          console.log("ERROR: failed posting user settings...");
        })
      },
      uploadImage(event) {
        let uploader = new FormData();
        uploader.append('file', event.target.files[0]); 
        var file_size = [...uploader.entries()][0][1].size;
        if (file_size < 50000) {
          axios({
            method: "PUT",
            headers: {
              Authorization: "Bearer " + document.cookie,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "image/png"
            },
            url: import.meta.env.VITE_ROOT_API + "/insert_profile_picture",
            data: uploader
          }).then(response => {
            var returnedProfilePicture = response.data;
            localStorage.setItem("profilePicture", returnedProfilePicture);
            this.$store.dispatch("loginModule/setProfilePicture", returnedProfilePicture);
          }).catch(function (error) {
            console.log("ERROR: failed inserting profile picture...");
          })
        } else {
          alert("Please upload a picture smaller than 50 Kb");
        }
      }
    }
  }
</script>

<style>
  .image {
      position:relative;
      display:inline-block;
      margin:10px;
  }
  .overlay {
      display:none;
  }
  .image:hover .overlay {
      background: #84bfbd;
      font-weight: bold;
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      text-align: center;
  }
</style>
