<template>
  <div class="mt-5 text-cream">
    <div class="my-2 text-xl text-center">
      <b>CAUTION</b>:<br>
      Save your API Token safely and do not share with anybody.<br>
      Once the API Token is displayed it will not be shown a second time.
    </div>
    <div class="flex justify-center">
      <button
        class="px-4 py-2 m-6 font-bold rounded bg-magentashine hover:bg-blueshine"
        type="submit"
        @click="generateApiToken()">
        Generate new API token
      </button>
    </div>
    <div 
      v-if="apiToken"
      class="flex items-center justify-center mt-5 text-xl align-middle">
      {{ apiToken }}
      <button
        class="p-1 mx-3 hover:bg-blueshine hover:rounded"
        title="Copy to clipboard"
        @click="copyTokenToClipboard">
        <CopyToClipboard/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from "axios";
  import CopyToClipboard from '@/components/svg/CopyToClipboard.vue'
  @Component({
    components : {
      CopyToClipboard
    }
  })
  export default class Api extends Vue {
    apiToken = "";
    async generateApiToken() {
      let url = process.env.VUE_APP_HTTP_URL + "/generate_api_token";
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*"
        }
      });
      if (response.status == 200) {
        this.apiToken = response.data;
      }
    }
    copyTokenToClipboard() {
      navigator.clipboard.writeText(this.apiToken);
    }
  }
</script>
