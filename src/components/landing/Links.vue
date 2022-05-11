<template>
  <div class="flex flex-col items-center -mt-20 align-middle bg-gradient-to-t from-universelight via-universe
  to-universe text-cream py-44 sm:space-x-6 xs:space-y-6">
    <h2 class="xs:text-2xl sm:text-4xl font-bold">
      As seen on
    </h2>
    <div class="grid xs:grid-cols-1 sm:grid-cols-5 gap-x-1 gap-y-6">
      <a 
        href="https://www.dapp.com/app/tradinglab" 
        target="_blank" 
        class="m-auto">
        <img
          src="@/assets/partnersLogos/dappdotcom.png"
          class="xs:w-24 sm:w-1/2"
          alt="dapp.com logo">
      </a>
      <a 
        href="https://dappradar.com/polygon/defi/tradinglab" 
        target="_blank" 
        class="m-auto">
        <img
          src="@/assets/partnersLogos/dappradar.png"
          class="xs:w-24 sm:w-1/2"
          alt="dappradar.com logo">
      </a>
      <a 
        href="https://www.stateofthedapps.com/dapps/tradinglab" 
        target="_blank" 
        class="m-auto">
        <img
          src="@/assets/partnersLogos/stateofthedapps.png"
          class="xs:w-24 sm:w-1/2"
          alt="stateofthedapp.com logo">
      </a>
      <a 
        href="https://dapp.expert/dapp/en-matic-tradinglab" 
        target="_blank"
        class="m-auto">
        <img
          src="@/assets/partnersLogos/dappexpert.png"
          class="xs:w-24 sm:w-1/2"
          alt="dapp.expert logo">
      </a>
      <a 
        href="https://thehiveindex.com/communities/trading-lab" 
        target="_blank"
        class="m-auto">
        <img
          src="@/assets/partnersLogos/thehiveindex.png"
          class="xs:w-24 sm:w-1/2"
          alt="thehiveindex.com logo">
      </a>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Links extends Vue {
    selectedMode = 'learn';
    selectMode(mode: string) {
      this.selectedMode = mode;
    }
  }
</script>
