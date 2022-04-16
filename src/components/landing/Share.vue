<template>
  <div class="-mt-20 bg-gradient-to-tl from-universelight via-universe to-universe">
    <div class="flex flex-col font-medium text-center xs:text-2xl sm:text-4xl text-cream">
      <div class="mt-40 mb-3">
        Your porfolio from any device
      </div>
      <div>
        Sharable to anybody instantly
      </div>
    </div>
    <div class="flex items-center justify-center mt-10 sm:flex-row xs:flex-col sm:space-x-10 xs:space-y-10 sm:space-y-0 place-items-center">
      <img 
        src="@/assets/share_laptop.png"
        alt="TradingLab is easy to share"
        class="h-4/5">
    </div>
    <div class="h-20 bg-universe"></div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Share extends Vue {}
</script>
