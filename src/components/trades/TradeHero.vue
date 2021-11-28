<template>
  <div class="flex pt-10 text-white place-content-center h-44 bg-tradehero">
      <div class="mr-10 text-right">
        <div class="text-2xl">
          Trades
        </div>
        <div class="text-5xl">
          {{ totalTrades }}
        </div>
      </div>
      <div class="text-center">
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
      <div class="ml-10 text-left">
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
