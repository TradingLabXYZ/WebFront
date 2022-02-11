<template>
  <div class="-mt-20 bg-azure">
    <div class="flex flex-col text-center xs:text-2xl sm:text-4xl font-extralight">
      <div class="mt-40 mb-3">
        Your porfolio from any device
      </div>
      <div>
        Sharable to anybody instantly
      </div>
    </div>
    <div class="flex justify-center mt-10 sm:flex-row xs:flex-col sm:space-x-10 xs:space-y-10 sm:space-y-0">
      <img src="@/assets/share_laptop.png" alt="Laptop" class="">
      <img src="@/assets/share_mobile.png" alt="Laptop" class="">
    </div>
    <div class="h-20 bg-azure"></div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Share extends Vue {}
</script>
