<template>
  <div v-if="isSectionVisible" class="bg-green-200">
    <div class="flex items-center justify-center text-center align-middle xs:text-sm sm:text-md font-bold">
      TradingLab Crypto Competition
      <button class="font-bold text-blue-800 bg-blue-200 border border-blue-600 rounded xs:m-1 xs:p-1 sm:p-2 sm:m-2 hover:bg-blue-400 xs:text-xs sm:text-sm">
        <router-link
          :to="{path: '/crypto_competition/guess_btc_price'}">
          Check the results
        </router-link>
      </button>
      <button
        v-on:click="toggleVisibility"
        class="sm:ml-12 xs:ml-2">
        <CloseX/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import CloseX from '@/components/svg/CloseX.vue';
  @Component({
    components: {
      CloseX
    }
  })
  export default class Competition extends Vue {
    isSectionVisible = true;
    toggleVisibility() {
     this.isSectionVisible = false; 
    }
  }
</script>
