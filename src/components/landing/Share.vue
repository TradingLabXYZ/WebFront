<template>
  <div class="-mt-20 bg-azure">
    <div class="flex flex-col text-5xl text-center font-extralight">
      <div class="mt-40 mb-3">
        Your porfolio accessible from any device
      </div>
      <div>
        Sharable to anybody instantly
      </div>
    </div>
    <div class="flex flex-row justify-center mt-20 mb-20 space-x-32">
      <img src="@/assets/share_laptop.png" alt="Laptop">
      <img src="@/assets/share_mobile.png" alt="Laptop">
    </div>
    <div class="h-20 bg-azure"></div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Share extends Vue {}
</script>
<style>
  svg {
    width: 100%;
  }
</style>
