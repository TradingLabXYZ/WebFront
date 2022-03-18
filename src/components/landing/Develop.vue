<template>
  <div class="flex flex-col items-center -mt-20 align-middle bg-universe text-cream pb-44 space-y-10">
    <div class="flex flex-row pt-40 font-medium xs:text-4xl sm:text-6xl xs:space-x-4 sm:space-x-8">
      Develop on TradingLab
    </div>
    <div class="flex items-center justify-center mt-5 xs:text-lg sm:text-2xl">
      Extend TradingLab's functionalities with our powerful API<br>
      and integrate pretty much anything you can think about.
    </div>
    <div class="flex flex-col items-center justify-center align-middle">
      <img src="@/assets/api.gif" alt="Rack" class="w-5/6 xs:pb-12 sm:pb-10">
      <button class="text-2xl font-bold rounded w-60 xs:p-1 sm:p-3 bg-blueshine hover:bg-magentashine">
        <router-link to="/docs">
          Explore the docs
        </router-link>
      </button>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Privacy1 extends Vue {
    selectedMode = 'learn';
    selectMode(mode: string) {
      this.selectedMode = mode;
    }
  }
</script>
