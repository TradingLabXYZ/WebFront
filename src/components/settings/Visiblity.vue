<template>
  <div>
    <div class="p-2 text-2xl">
      <div class="flex flex-col">
        <div
          v-for="(data,index) in visibility"
          :key="index"
          class="flex flex-row space-x-4">
          <div>
            <input type="checkbox" v-model="visibility[index]" class="text-2xl">
          </div>
          <div>
            {{index}}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        class="px-4 py-2 m-6 font-bold text-white rounded bg-azure hover:bg-deeplagune dark:bg-magentashine dark-hover:bg-green-800"
        type="submit"
        @click="saveUserVisibility()">
        Save
      </button>
      <button
        class="px-4 py-2 m-6 font-bold text-white bg-green-500 rounded"
        id="userVisibilityOk"
        style="display:none;">
        DONE
      </button>
      <button
        class="px-4 py-2 m-6 font-bold text-white bg-red-500 rounded"
        id="userVisibilityKo"
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
  export default class Visibility extends Vue {
    visibility: object = {}
    created() {
      console.log(userStore.userDetails['Visibility']);
      this.visibility = userStore.userDetails['Visibility'];
    }
    async saveUserVisibility() {
      let url = process.env.VUE_APP_HTTP_URL + "/update_visibility";
      let data = this.visibility;
      const response = await axios.post(url, data, {
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (response.status == 200) {
        await this.updateVisibilityInIndexedDb();
        userStore.userDetails['Visibility'] = this.visibility;
        this.showNotification('userVisibilityOk');
      } else {
        this.showNotification('userVisibilityKo');
      }
    }
    async updateVisibilityInIndexedDb() {
      await get(userStore.userDetails['SessionId']).then((sessionData) => {
        sessionData['Visibility'] = this.visibility;
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
