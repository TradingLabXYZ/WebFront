<template>
  <div>
    <div>
      <div v-if="parseInt(monthlyFee) > 0 ">
        Your current monthly fee:
        {{ monthlyFee }}
      </div>
      <div v-else>
        Please set your desired monthly fee.
      </div>
    </div>
    <div>
      <div class="mt-6 text-gray-200 p2">
        Change your USDC monthly price
        <input
          type="number"
          class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model="newMonthlyFee">
      </div>
      <div v-if="newMonthlyFee">
        <button
          class="px-4 py-2 m-6 font-bold text-white rounded bg-azure hover:bg-blueshine"
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
  import Wallet from '@/store/walletModule';
  const walletStore = getModule(Wallet)
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
        if (from.toLowerCase() == walletStore.getWallet.toLowerCase()) {
          this.monthlyFee = amount.toString();
          userStore.userDetails['MonthlyFee'] = this.monthlyFee;
          this.updateMonthlyFeeInIndexedDb();
        }
      });
    }
    async changePlan() {
      try {
        await contractStore.getContractSubscriptionSigned.changePlan(this.newMonthlyFee);
      } catch(err: any) {
        try {
          let revertMessage = err['argument'];
          if (revertMessage == 'usdc_monthly_price') {
            alert('Your monthly fee has to be bigger than 0.');
          } else {
            try {
              revertMessage = err['data']['message'].split('revert')[1].trim();
              if (revertMessage == 'USDC price must be different than current one.') {
                alert('Your new monthly fee needs to be different than your current one.');
              } else {
                console.log("Unknown error: ", err);
              }
            } catch(err: any) {
              console.log("Unknown error: ", err);
            }
          }
        } catch(err: any) {
          console.log("Unknown error: ", err);
        }
      }
      this.newMonthlyFee = '';
    }
    async updateMonthlyFeeInIndexedDb() {
      await get(userStore.userDetails['SessionId']).then((sessionData) => {
        sessionData['MonthlyFee'] = this.monthlyFee;
        set(userStore.userDetails['SessionId'], sessionData);
      })
    }
  }
</script>
