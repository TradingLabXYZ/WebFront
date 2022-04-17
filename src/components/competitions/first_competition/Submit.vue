<template>
  <div class="mt-12 border-8 border-magentashine">
    <div class="xs:text-sm sm:text-xl text-center my-2">
      We are aware of issues connecting the wallet from iOS.
      Whenever possibile, please use you laptop.
      In case of need reach out to us on 
      <u><a href="https://discord.gg/PEEUfrbQ9c" rel="_blank">Discord</a></u>.
    </div>
    <div class="flex flex-col text-center py-36 space-y-4">
      <div class="xs:text-2xl sm:text-4xl">
        insert your prediction in USD $
      </div>
      <div class="flex flex-col items-center align-middle">
        <input
          type="number"
          step="0.01"
          placeholder="Prediction"
          class="p-2 xs:text-3xl sm:text-5xl text-center text-black border border-gray-200 xs:w-60 sm:w-96 bg-cream"
          v-model="tempPrediction">
      </div>
      <div class="space-x-4">
        <button
          @click="submitPrediction()"
          class="inline-block p-4 mt-2 xs:text-lg sm:text-3xl font-bold rounded hover:bg-blueshine bg-magentashine">
          <span v-if="prediction > 0">
            UPDATE YOUR PREDICTION
          </span>
          <span v-else>
            SUBMIT YOUR PREDICTION
          </span>
        </button>
        <button
           v-if="prediction > 0"
          @click="deletePrediction()"
          class="inline-block p-4 mt-2 text-3xl font-bold rounded hover:bg-blueshine">
          <Delete/>
        </button>
      </div>
      <div 
        v-if="isSubmissionOk"
        class="bg-green-200 flex justify-center m-auto w-32 text-black">
        Done!
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
import Delete from '@/components/svg/DeleteTrade.vue'

@Component({
  components: {
    Delete,
  }
})
export default class Submit extends Vue {
  source: string = "";
  tempPrediction: number = 0;
  prediction: number = 0;
  isSubmissionOk: boolean = false;
  get isUserConnected() {
    return walletStore.getIsConnected;
  }
  async created() {
    this.source = this.getUrlSource();
    await this.fetchPrediction();
  }
  async fetchPrediction() {
    if (document.cookie.indexOf('sessionId') > -1) {
      const requestUrl = [
        process.env.VUE_APP_HTTP_URL,
        'get_prediction',
        'first_competition',
      ].join('/');
      axios({
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + document.cookie,
          'Access-Control-Allow-Origin': '*'
        },
        url: requestUrl,
      }).then((response) => {
        if (response.status === 200) {
          this.prediction = parseFloat(response.data);
          this.tempPrediction = parseFloat(response.data);
        }
      }).catch(function(error) {
        console.log(error);
      })
    }
  }
  submitPrediction() {
    if (!this.isUserConnected) {
      alert('Please connect your wallet!');
      return;
    }
    if (!this.tempPrediction) {
      alert('Please insert a prediction!');
      return;
    }
    var postData = {
      Competition: 'first_competition',
      Prediction: this.tempPrediction,
      Source: this.source
    }
    const requestUrl = [
      process.env.VUE_APP_HTTP_URL,
      'insert_prediction'
    ].join('/');
    axios({
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + document.cookie,
        'Access-Control-Allow-Origin': '*'
      },
      url: requestUrl,
      data: postData
    }).then((response) => {
      if (response.status === 200) {
        this.prediction = this.tempPrediction;
        this.setConfirmStatus();
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
  deletePrediction() {
    if (!this.isUserConnected) {
      return;
    }
    const requestUrl = [
      process.env.VUE_APP_HTTP_URL,
      'delete_prediction',
      'first_competition',
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
        this.tempPrediction = 0;
        this.prediction = 0;
        this.setConfirmStatus();
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
  async setConfirmStatus() {
    this.isSubmissionOk = true;
    var that = this;
    setTimeout(function () {
      if (that.isSubmissionOk) {
        that.isSubmissionOk = false;
      } else {
        that.isSubmissionOk = true;
      }
    }, 2000);
  }
  getUrlSource() {
    const source = this.$route.query['source'];
    if (source == null) {
      return "";
    } else {
      return source.toString();
    }
  }
}
</script>
