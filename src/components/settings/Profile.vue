<template>
  <div>
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
        v-model="email">
    </div>
    <div class="p-2">
      <label class="text-xs text-subtradelabel">Twitter</label>
      <input
        type="url"
        placeholder="Twitter"
        class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
        v-model="twitter">
    </div>
    <div class="p-2">
      <label class="text-xs text-subtradelabel">Website</label>
      <input
        type="url"
        placeholder="Website"
        class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
        v-model="website">
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
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from "axios";
  import { getModule } from 'vuex-module-decorators'
  import User from '@/store/userModule';
  const userStore = getModule(User)
  import { get, set } from 'idb-keyval';

  @Component({})
  export default class Profile extends Vue {
    email: string = '';
    twitter: string = '';
    website: string = '';
    profilePicture: string = '';
    created() {
      this.email = userStore.userDetails['Email'];
      this.twitter = userStore.userDetails['Twitter'];
      this.website = userStore.userDetails['Website'];
      this.profilePicture = userStore.userDetails['ProfilePicture'];
    }
    saveUserSocial() {
      axios({
        method: "POST",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: process.env.VUE_APP_HTTP_URL + "/user_settings",
        data: {
          Email: this.email,
          Twitter: this.twitter,
          Website: this.website
        }
      }).then(response => {
        if (response.data == "OK") {
          const runIndexDb = async () => {
            await get(userStore.userDetails['SessionId']).then((sessionData) => {
              sessionData['Email'] = this.email;
              sessionData['Twitter'] = this.twitter;
              sessionData['Website'] = this.website;
              set(userStore.userDetails['SessionId'], sessionData);
            })
          }
          runIndexDb();
          var s = document.getElementById("userSocialOk")!.style;
        } else {
          var s = document.getElementById("userSocialKo")!.style;
        }
        s.display = "block";
        let opacity: number = 1; 
        (function fade(){(opacity-=.1) < 0 ? s.display="none" : setTimeout(fade,100)})();
      })
    }
    uploadImage(event: any) {
      let uploader = new FormData();
      const files = event.target.files;
      uploader.append('file', files[0]);
      let file_size = 0;
      for (let [_, file] of uploader.entries()) {
        file_size = file_size + file['size'];
      }
      if (file_size < 50000) {
        axios({
          method: "PUT",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "image/png"
          },
          url: process.env.VUE_APP_HTTP_URL + "/insert_profile_picture",
          data: uploader
        }).then(response => {
          this.profilePicture = response.data;
          const runIndexDb = async () => {
            await get(userStore.userDetails['SessionId']).then((sessionData) => {
              sessionData['ProfilePicture'] = this.profilePicture;
              set(userStore.userDetails['SessionId'], sessionData);
            })
          }
          runIndexDb();
          userStore.userDetails['ProfilePicture'] = response.data;
        }).catch(function (error) {
          console.log(error);
        })
      } else {
        alert("Please upload a picture smaller than 50 Kb");
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
