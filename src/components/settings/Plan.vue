<template>
  <div>
    HERE LOGIC
    <div>
      <input type="number" v-model="planType" placeholder="Plan Type" >
      <input type="number"  v-model="planPrice" placeholder="Plan Price" >
      <button @click="changePlan()">Change</button>
    </div>
    <div>
      HERE THE BALANCE: {{ balance }}
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from "axios";
  import { getModule } from 'vuex-module-decorators'
  import Contract from '@/store/contractModule';
  const contractStore = getModule(Contract)

  @Component({})
  export default class Privacy extends Vue {
    planType: number = 0;
    planPrice: number = 0;
    balance: number = 0;
    async created() {
      contractStore.updateContractInstance();
    }
    async changePlan() {
      contractStore.getContractInstance["methods"].getBalance("0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac").call().then((res: any) => {
        this.balance = res;
      })
    }
  }
</script>
