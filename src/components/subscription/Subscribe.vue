<template>
  <div>
    <div class="flex flex-col justify-around">
      <div class="text-3xl">
        Subscription process
      </div>
      <div class="flex flex-col items-center justify-center mt-4 align-middle space-y-4">
        <div class="text-xl">
          {{ wallet }}
        </div>
        <div class="text-xl">
          Weekly fee USD: {{ subscriptionWeeklyPrice }}
        </div>
        <div class="text-xl">
          Current MOVR price: {{ movrPrice.toFixed(2) }}
        </div>
        <div class="text-xl">
          Weekly MOVR: {{ (subscriptionWeeklyPriceMovr).toFixed(8) }}
        </div>
        <div class="text-xl border-2 border-gray-800">
          <input
            placeholder="Number of weeks"
            min="1"
            type="number"
            class="text-center"
            v-model="selectedWeeks">
        </div>
        <div class="text-xl font-bold">
          Total MOVR to pay: {{ (totalPriceMovr).toFixed(8) }}
        </div>
      </div>
      <div>
        <button
          class="inline-block p-2 m-4 text-lg font-bold rounded hover:bg-deeplagune bg-azure"
          @click="subscribe()">
          Subscribe
        </button>
        <button
          class="inline-block p-2 m-4 text-lg font-bold rounded hover:bg-deeplagune bg-dutchorange"
          @click="stopSubscriptionProcess()">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import axios from "axios";
  import { ethers } from "ethers";
  import { getModule } from 'vuex-module-decorators'
  import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
  import Contract from '@/store/contractModule';
  const contractStore = getModule(Contract)
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {
    }
  })
  export default class Connections extends Vue {
    @Prop() wallet!: string;
    subscriptionWeeklyPrice: number = 0;
    movrPrice: number = 0;
    selectedWeeks: number = 1;
    async created() {
      await contractStore.updateContractSubscription();
      await contractStore.signContractSubscription();
      this.getSubscriptionWeeklyPrice();
      this.getCurrentMoonriverPrice();
      contractStore.getContractSubscription.on("Subscribe", (from, to, weeks, amount, {}) => {
        console.log(from, to, weeks.toString(), amount.toString());
        if (from.toLowerCase() == metamaskStore.getWallet.toLowerCase()) {
          let request_url = [
            process.env.VUE_APP_HTTP_URL,
            'subscribe',
            this.$route.params.wallet,
            false
          ].join('/');
          axios({
            method: "GET",
            headers: {
              Authorization: "Bearer " + document.cookie,
              "Access-Control-Allow-Origin": "*",
            },
            url: request_url,
          }).then(response => {
            if (response.status === 200) {
              window.location.reload();
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      });
    }
    get subscriptionWeeklyPriceMovr() {
      return this.subscriptionWeeklyPrice / this.movrPrice;
    }
    get totalPriceMovr() {
      return this.subscriptionWeeklyPriceMovr * this.selectedWeeks;
    }
    getSubscriptionWeeklyPrice() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'subscription',
        this.wallet,
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url,
      }).then(response => {
        if (response.status === 200) {
          this.subscriptionWeeklyPrice = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
    getCurrentMoonriverPrice() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'get_pair_ratio',
        '3408',
        '9285'
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url,
      }).then(response => {
        if (response.status === 200) {
          this.movrPrice = parseFloat(response.data);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
    async subscribe() {
      let subPriceString = this.subscriptionWeeklyPriceMovr.toString();
      const options = {value: ethers.utils.parseEther(subPriceString)};
      await contractStore.getContractSubscriptionSigned.subscribe(
        this.wallet,
        this.selectedWeeks,
        options
      );
    }
    @Emit('stopSubscriptionProcess')
    stopSubscriptionProcess(){}
  }
</script>
