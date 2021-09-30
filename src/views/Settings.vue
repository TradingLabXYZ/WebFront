<template>
  <div>
    <Header/>
    <div class="mt-5 mb-5 text-2xl text-center">My Settings</div>
    <div class="h-screen grid grid-cols-12 gap-10">
      <div class="col-span-3"></div>
      <div class="border-r-2 col-span-1">
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='profile' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('profile')">
          Profile
        </div>
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='password' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('password')">
          Password
        </div>
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='privacy' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('privacy')">
          Privacy
        </div>
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='plan' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('plan')">
          Plan
        </div>
      </div>
      <div class="col-span-4">
        <section v-if="settingsSection=='profile'">
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
              v-model="userSettings.Email">
          </div>
          <div class="p-2">
            <label class="text-xs text-subtradelabel">Twitter</label>
            <input
              type="url"
              placeholder="Twitter"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="userSettings.Twitter">
          </div>
          <div class="p-2">
            <label class="text-xs text-subtradelabel">Website</label>
            <input
              type="url"
              placeholder="Website"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="userSettings.Website">
          </div>
          <div class="flex justify-start">
            <button
              class="px-4 py-2 m-6 font-bold text-white rounded bg-header-light hover:bg-header-dark"
              type="submit"
              @click="saveUserSettings()">
              Save
            </button>
            <button
              class="px-4 py-2 m-6 font-bold text-white bg-green-500 rounded"
              id="userSettingsOk"
              style="display:none;">
              DONE
            </button>
            <button
              class="px-4 py-2 m-6 font-bold text-white bg-red-500 rounded"
              id="userSettingsKo"
              style="display:none;">
              ERROR
            </button>
          </div>
        </section> 
        <section v-if="settingsSection=='password'">
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
        </section> 
        <section v-if="settingsSection=='privacy'">
          <div class="m-2">Privacy section</div>
        </section> 
        <section v-if="settingsSection=='plan'">
          <div class="m-2">Plan section</div>
        </section> 
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapState } from 'vuex';
  export default {
    data: function() {
      return {
        settingsSection: "profile",
        userSettings:  {
          Email: "",
          Twitter: "",
          Website: ""
        },
        userPassword: {
          OldPassword: "",
          NewPassword: "",
          RepeatNewPassword: ""
        }
      }
    },
    computed: {
      ...mapState("loginModule", ["profilePicture"])
    },
    created: function() {
      this.getUserSettings();
    },
    methods: {
      changeSettingsSection(section) {
        this.settingsSection = section;
      },
      getUserSettings() {
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/user_settings",
        }).then(response => {
          if (response.status === 200) {
            this.userSettings.Email = response.data.Email;
            this.userSettings.Twitter = response.data.Twitter;
            this.userSettings.Website = response.data.Website;
          }
        }).catch(function (error) {
          console.log(error);
        })
      },
      saveUserSettings() {
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: import.meta.env.VITE_ROOT_API + "/user_settings",
          data: this.userSettings
        }).then(response => {
          if (response.data == "OK") {
            var s = document.getElementById("userSettingsOk").style;
          } else {
            var s = document.getElementById("userSettingsKo").style;
          }
          s.display = "block";
          s.opacity = 1;
          (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,100)})();
        })
      },
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
            console.log(error);
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
