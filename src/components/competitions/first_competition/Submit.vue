<template>
  <div class="mt-12 border-8 border-magentashine">
    <div class="flex flex-col text-center py-36 space-y-4">
      <div class="text-4xl">
        insert your prediction in USD $
      </div>
      <div class="flex flex-col items-center align-middle">
        <input
          type="string"
          placeholder="Prediction"
          class="p-2 text-5xl text-center text-black border border-gray-200 w-96 bg-cream"
          v-model="prediction">
      </div>
      <div>
        <button
          class="inline-block p-4 mt-2 text-3xl font-bold rounded hover:bg-blueshine bg-magentashine">
          SUBMIT YOUR PREDICTION
        </button>
      </div>
    </div>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L500,0 500,80 0,80"/>
    </svg>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {Component, Vue} from 'vue-property-decorator';
import {getModule} from 'vuex-module-decorators'
import Wallet from '@/store/walletModule';
const walletStore = getModule(Wallet)

@Component({})
export default class Submit extends Vue {
  prediction: string = "";
  partecipants: number = 0;
  get isUserConnected() {
    return walletStore.getIsConnected;
  }
  async created() {
    this.getPartecipants();
  }
  getPartecipants() {
    const requestUrl = [
      process.env.VUE_APP_HTTP_URL,
      'getPartecipants'
    ].join('/');
    axios({
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + document.cookie,
        'Access-Control-Allow-Origin': '*',
      },
      url: requestUrl,
    }).then((response) => {
      if (response.status === 200) {
        this.partecipants = response.data;
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
  submitPrediction() {
    if (!this.isUserConnected) {
      alert('Please connect your wallet!');
      return;
    }
    const requestUrl = [
      process.env.VUE_APP_HTTP_URL,
      'predict',
      this.prediction,
    ].join('/');
    axios({
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + document.cookie,
        'Access-Control-Allow-Origin': '*',
      },
      url: requestUrl,
    }).then((response) => {
      if (response.status === 200) {
        console.log("OK");
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
}
</script>
