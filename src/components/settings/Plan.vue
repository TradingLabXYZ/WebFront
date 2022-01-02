<template>
  <div>
    <div class="mb-10">
      <div v-if="usdcMonthlyPrice > 0" class="p2">
        Your actual USDC monthly price: {{ usdcMonthlyPrice }}
      </div>
      <div v-else>
        You do not have set yet your USDC monthly price.
      </div>
      <div class="p2">
      <div class="mt-6 p2">
        Change your USDC monthly price
        <input
          type="text"
          class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model="newUsdcMonthlyPrice"
          placeholder="Plan Type">
      </div>
      </div>
      <button
        class="px-4 py-2 m-6 font-bold text-white rounded bg-azure hover:bg-deeplagune"
        type="submit"
        @click="changePlan()">
        Save
      </button>
    </div>
    <div class="mb-10">
      <div>
        Your actual ETH ADDRESS: {{ receivedEthAddress }}
      </div>
      <div class="mt-6 p2">
        Your random ETH addres
        <input
          type="text"
          class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model="newEthAddress"
          placeholder="ETH address">
      </div>
      </div>
      <button
        class="px-4 py-2 m-6 font-bold text-white rounded bg-azure hover:bg-deeplagune"
        type="submit"
        @click="subscribe()">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  import Contract from '@/store/contractModule';
  const contractStore = getModule(Contract)

  @Component({})
  export default class Privacy extends Vue {
    usdcMonthlyPrice: string = "";
    newUsdcMonthlyPrice: string = "";
    newEthAddress: string = "";
    receivedEthAddress: string = "";
    key: string = "";
    value: string = "";
    async created() {
      await contractStore.updateContractSubscription();
      await contractStore.signContractSubscription();
      this.getNumber();
      contractStore.getContractSubscription.on("ChangePlan", (from, amount, {}) => {
        if (from.toLowerCase() == metamaskStore.getWallet.toLowerCase()) {
          this.usdcMonthlyPrice = amount.toString();
          console.log(this.usdcMonthlyPrice);
        }
      });
      contractStore.getContractSubscription.on("Subscribe", (from, to, {}) => {
        console.log(from, to);
      });
    }
    async getNumber() {
      let tempValue = await contractStore.getContractSubscription.getPlan();
      console.log(tempValue.toString());
      this.usdcMonthlyPrice = tempValue.toString();
    }
    async changePlan() {
      await contractStore.getContractSubscriptionSigned.changePlan(this.newUsdcMonthlyPrice);
    }
    async subscribe() {
      await contractStore.getContractSubscriptionSigned.subscribe(this.newEthAddress);
    }
  }
</script>
