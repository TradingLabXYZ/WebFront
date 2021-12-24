<template>
  <div>
    <div class="p-2">
      <label class="text-xs text-subtradelabel">
        Select Privacy Settings
      </label>
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
    <div
      id="displayedMessage"
      class="mt-5">
      <div
        v-if="selectedUserPrivacy == 'all'"
        class="flex justify-around">
        Your profile is visible to everybody
      </div>
      <div
        v-if="selectedUserPrivacy == 'private'"
        class="flex justify-around">
        Your profile is visible only to you
      </div>
      <div
        v-if="selectedUserPrivacy == 'followers'"
        class="flex justify-around">
        Your profile is visible only to your followers
      </div>
      <div
        v-if="selectedUserPrivacy == 'subscribers'"
        class="flex justify-around">
        Your profile is visible only to your subscribers
      </div>
    </div>
    <div class="flex justify-center">
      <button
        class="px-4 py-2 m-6 font-bold text-white rounded bg-azure hover:bg-deeplagune"
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
  export default class Privacy extends Vue {
    selectedUserPrivacy: string = '';
    created() {
      this.selectedUserPrivacy = userStore.userDetails['Privacy'];
    }
    async saveUserPrivacy() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'update_privacy'
      ].join('/');
      let data = {
        Privacy: this.selectedUserPrivacy
      };
      const response = await axios.post(request_url, data, {
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (response.status == 200) {
        this.updatePrivacyInIndexedDb();
        userStore.userDetails['Privacy'] = this.selectedUserPrivacy;
        this.showNotification('userPrivacyOk');
      } else {
        this.showNotification('userPrivacyKo');
      }
    }
    async updatePrivacyInIndexedDb() {
      await get(userStore.userDetails['SessionId']).then((sessionData) => {
        sessionData['Privacy'] = this.selectedUserPrivacy;
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
  }
</script>
