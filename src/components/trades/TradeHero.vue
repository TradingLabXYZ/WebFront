<template>
  <div class="justify-around header-base header-responsive">
    <div class="flex flex-col">
      <div class="kpi-title-responsive">
        Trades
      </div>
      <div class="kpi-value-responsive">
        {{ totalTrades }}
      </div>
    </div>
    <div class="flex flex-col">
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
    <div class="flex flex-col">
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
  .header-base {
    @apply flex;
    @apply flex-row;
    @apply text-white;
    @apply place-content-center;
    @apply bg-tradehero;
  }
  @responsive {
    .header-responsive {
      @apply sm:h-24;
      @apply md:h-32;
      @apply lg:h-40;
    }
    .kpi-title-responsive {
      @apply sm:text-base;
      @apply md:text-xl;
      @apply lg:text-3xl;
    }
    .kpi-value-responsive {
      @apply sm:text-xl;
      @apply md:text-2xl;
      @apply lg:text-6xl;
    }
  }
</style>
