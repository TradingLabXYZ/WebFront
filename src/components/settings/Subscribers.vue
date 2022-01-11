<template>
  <div>
    <div>
      <div v-if="monthlyFee == ''">
        Your current monthly fee:
        {{ monthlyFee }}
      </div>
      <div v-else>
        Please set your desired monthly fee.
      </div>
    </div>
    <div>
      <div class="mt-6 p2 dark:text-gray-200">
        Change your USDC monthly price
        <input
          type="text"
          class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model="newMonthlyFee"
          placeholder="Plan Type">
      </div>
      <div v-if="newMonthlyFee">
        <button
          class="px-4 py-2 m-6 font-bold text-white rounded bg-azure hover:bg-deeplagune"
          type="submit"
          @click="changePlan()">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import { get, set } from 'idb-keyval';
  import User from '@/store/userModule';
  const userStore = getModule(User)
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  import Contract from '@/store/contractModule';
  const contractStore = getModule(Contract)
  @Component({})
  export default class Subcribers extends Vue {
    monthlyFee: string = '';
    newMonthlyFee: string = '';
    async created() {
      this.monthlyFee = userStore.userDetails['MonthlyFee'];
      await contractStore.updateContractSubscription();
      await contractStore.signContractSubscription();
      contractStore.getContractSubscription.on("ChangePlan", (from, amount, {}) => {
        if (from.toLowerCase() == metamaskStore.getWallet.toLowerCase()) {
          this.monthlyFee = amount.toString();
          userStore.userDetails['MonthlyFee'] = this.monthlyFee;
          this.updateMonthlyFeeInIndexedDb();
        }
      });
    }
    async changePlan() {
      await contractStore.getContractSubscriptionSigned.changePlan(this.newMonthlyFee);
    }
    async updateMonthlyFeeInIndexedDb() {
      await get(userStore.userDetails['SessionId']).then((sessionData) => {
        sessionData['MonthlyFee'] = this.monthlyFee;
        set(userStore.userDetails['SessionId'], sessionData);
      })
    }
  }
</script>
