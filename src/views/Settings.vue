<template>
  <div>
    <Header/>
    <div class="mt-5 mb-5 text-2xl text-center">My Settings</div>
    <div class="grid grid-cols-12 gap-10">
      <div class="col-span-4"></div>
      <div class="col-span-1">
        <div
          class="m-2"
          :class="settingsSection=='profile' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('profile')">
          Profile
        </div>
        <div
          class="m-2"
          :class="settingsSection=='privacy' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('privacy')">
          Privacy
        </div>
        <div
          class="m-2"
          :class="settingsSection=='plan' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('plan')">
          Plan
        </div>
        <div
          class="m-2"
          :class="settingsSection=='password' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('password')">
          Password
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
              placeholder="Email"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="userSettings.Email">
          </div>
          <div class="p-2">
            <label class="text-xs text-subtradelabel">Twitter</label>
            <input
              placeholder="Twitter"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="userSettings.Twitter">
          </div>
          <div class="p-2">
          <label class="text-xs text-subtradelabel">Website</label>
          <input
            placeholder="Website"
            class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
            v-model="userSettings.Website">
          </div>
            <button
              class="flex items-center px-4 py-2 m-6 font-bold text-white bg-indigo-700 rounded hover:bg-indigo-300"
              type="submit"
              @click="">
              Save
            </button>
        </section> 
        <section v-if="settingsSection=='privacy'">
          <div class="m-2">Privacy section</div>
        </section> 
        <section v-if="settingsSection=='plan'">
          <div class="m-2">Plan section</div>
        </section> 
        <section v-if="settingsSection=='password'">
          <div class="m-2">Password section</div>
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
          Email: "ciao@ciao.ciao",
          Twitter: "robi",
          Website: "www.ok.ciao"
        }
      }
    },
    computed: {
      ...mapState("loginModule", ["profilePicture"])
    },
    methods: {
      changeSettingsSection(section) {
        console.log(section);
        this.settingsSection = section;
      },
      uploadImage(event) {
        let data = new FormData();
        data.append('file', event.target.files[0]); 
        var file_size = [...data.entries()][0][1].size;
        if (file_size < 50000) {
          axios({
            method: "PUT",
            headers: {
              Authorization: "Bearer " + document.cookie,
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "image/png"
            },
            url: import.meta.env.VITE_ROOT_API + "/insert_profile_picture",
            data: data
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
    background:rgba(255,255,255,0.9);
    font-weight: bold;
    position:absolute;
    bottom:0;
    right:0;
    display:inline-block;
    text-align:center;
}
</style>
