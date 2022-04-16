<template>
  <div class="text-cream">
    <div class="flex justify-around">
      <label class="text-xs image">
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
      <label class="text-sm">
        Username
      </label>
      <input
        type="text"
        placeholder="Username"
        maxlength="10"
        class="w-full p-2 border border-gray-500 bg-deepmagenta"
        v-model="username">
    </div>
    <div class="p-2">
      <label class="text-sm">
        Twitter Username
      </label>
      <input
        type="text"
        placeholder="Twitter"
        class="w-full p-2 border border-gray-500 bg-deepmagenta"
        v-model="twitter">
    </div>
    <div class="p-2">
      <label class="text-sm">
        Discord ID
      </label>
      <input
        type="text"
        placeholder="discord"
        class="w-full p-2 border border-gray-500 bg-deepmagenta"
        v-model="discord">
    </div>
    <div class="p-2">
      <label class="text-sm">
        Github Username
      </label>
      <input
        type="text"
        placeholder="github"
        class="w-full p-2 border border-gray-500 bg-deepmagenta"
        v-model="github">
    </div>
    <div class="flex justify-center">
      <button
        class="px-4 py-2 m-6 font-bold rounded bg-magentashine hover:bg-blueshine"
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
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import axios from "axios";
  import { getModule } from 'vuex-module-decorators'
  import User from '@/store/userModule';
  const userStore = getModule(User)
  import { get, set } from 'idb-keyval';

  @Component({})
  export default class Profile extends Vue {
    username: string = '';
    twitter: string = '';
    discord: string = '';
    github: string = '';
    profilePicture: string = '';
    @Prop() isMobile!: boolean;
    created() {
      this.username = userStore.userDetails['Username'];
      this.twitter = userStore.userDetails['Twitter'];
      this.discord = userStore.userDetails['Discord'];
      this.github = userStore.userDetails['Github'];
      this.profilePicture = userStore.userDetails['ProfilePicture'];
    }
    async saveUserSocial() {
      let url = process.env.VUE_APP_HTTP_URL + "/user_settings";
      let data = {
        Username: this.username,
        Twitter: this.twitter,
        Discord: this.discord,
        Github: this.github
      };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (response.status == 200) {
        await this.updateProfileInIndexedDb();
        userStore.userDetails['Username'] = this.username;
        userStore.userDetails['Twitter'] = this.twitter;
        userStore.userDetails['Discord'] = this.discord;
        userStore.userDetails['Github'] = this.github;
        this.showNotification('userSocialOk');
      } else {
        this.showNotification('userSocialKo');
      }
    }
    async updateProfileInIndexedDb() {
      await get(userStore.userDetails['SessionId']).then((sessionData) => {
        sessionData['Username'] = this.username;
        sessionData['Twitter'] = this.twitter;
        sessionData['Discord'] = this.discord;
        sessionData['Github'] = this.github;
        set(userStore.userDetails['SessionId'], sessionData);
      })
    }
    showNotification(statusId: string) {
      var s = document.getElementById(statusId)!.style;
      s.display = "block";
      let opacity: number = 1; 
      (function fade() {
        (opacity -= 0.1) < 0 ? s.display="none" : setTimeout(fade, 100);
      })();
    }
    async uploadImage(event: any) {
      let uploader = new FormData();
      const files = event.target.files;
      uploader.append('file', files[0]);
      let file_size = 0;
      for (let file of uploader.entries()) {
        file_size = file_size + file[1]['size'];
      }
      if (file_size < 50000) {
        let request_url = [
          process.env.VUE_APP_HTTP_URL,
          'insert_profile_picture'
        ].join('/');
        const response = await axios.put(request_url, uploader, {
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "image/png"
          }
        });
        if (response.status == 200) {
          let imgDate = new Date().getTime(); // To force img reload
          this.profilePicture = response['data'].toString() + '?t=' + imgDate;
          this.updatePictureInIndexedDb();
          userStore.userDetails['ProfilePicture'] = response['data'].toString();
        } else {
          console.log('Could not update profile picture');
        };
      } else {
        alert("Please upload a picture smaller than 50 Kb");
      }
    }
    async updatePictureInIndexedDb() {
      await get(userStore.userDetails['SessionId']).then((sessionData) => {
        sessionData['ProfilePicture'] = this.profilePicture;
        set(userStore.userDetails['SessionId'], sessionData);
      })
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
