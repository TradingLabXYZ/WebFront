<template>
  <div class="pt-10 text-white grid grid-cols-10 h-44 bg-tradehero">
    <div class="col-span-2"></div>
    <div class="text-right col-span-2">
      <div class="text-2xl">
        Trades
      </div>
      <div class="text-5xl">
        {{ totalTrades }}
      </div>
    </div>
    <div class="text-center col-span-2">
      <div class="text-2xl">
        <span>
          $ Return
        </span>
      </div>
      <div class="text-5xl">
        <span>
          {{ totalReturn.toFixed(2) }}
        </span>
      </div>
    </div>
    <div class="text-left col-span-2">
      <div class="text-2xl">
        ROI
      </div>
      <div class="text-5xl">
        {{ roi.toFixed(2) + "%" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({})
  export default class TradeHero extends Vue {
    @Prop() totalTrades!: number;
    @Prop() totalReturn!: number;
    @Prop() roi!: number;
  }
</script>
