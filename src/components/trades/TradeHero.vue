<template>
  <div class="trade-hero-base">
    <div class="flex flex-col items-center justify-center kpi-section-responsive">
      <div class="kpi-title-responsive">
        Trades
      </div>
      <div class="kpi-value-responsive">
        {{ totalTrades }}
      </div>
    </div>
    <div class="flex flex-col items-center justify-center kpi-section-responsive">
      <div class="kpi-title-responsive">
        <span>
          $ Return
        </span>
      </div>
      <div class="kpi-value-responsive">
        <span>
          {{ totalReturn }}
        </span>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center kpi-section-responsive">
      <div class="kpi-title-responsive">
        ROI
      </div>
      <div class="kpi-value-responsive">
        {{ roi + "%" }}
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

<style>
  .trade-hero-base {
    @apply flex;
    @apply flex-row;
    @apply text-white;
    @apply place-content-center;
    @apply bg-tradehero;
    @apply justify-center;
  }
  @responsive {
    .kpi-section-responsive {
      @apply xs:p-1;
      @apply sm:p-2;
      @apply md:p-2;
      @apply lg:p-4;
    }
    .kpi-title-responsive {
      @apply xs:text-xl;
      @apply sm:text-2xl;
      @apply md:text-2xl;
      @apply lg:text-3xl;
    }
    .kpi-value-responsive {
      @apply xs:text-2xl;
      @apply sm:text-4xl;
      @apply md:text-4xl;
      @apply lg:text-6xl;
    }
  }
</style>
