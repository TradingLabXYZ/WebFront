<template>
  <div class="items-center justify-center grid grid-cols-9 h-44 bg-tradehero">
    <div class="col-span-3"></div>
    <div class="grid grid-rows-5">
      <div class="text-2xl text-center text-white row-span-2">
        Total Trades
      </div>
      <div class="mt-2 text-5xl text-center text-white row-span-3">
        {{ openedTrades.length + closedTrades.length}}
      </div>
    </div>
    <div class="grid grid-rows-5">
      <div class="text-2xl text-center text-white row-span-2">
        <span v-if="userPreferences.returnCurrency == 'BTC'">
          ₿ Return
        </span>
        <span v-else>
          $ Return
        </span>
      </div>
      <div class="mt-2 text-5xl text-center text-white row-span-3">
        <span v-if="userPreferences.returnCurrency == 'BTC'">
          {{ totalReturn.toFixed(5) }}
        </span>
        <span v-else>
          {{ totalReturn.toFixed(2) }}
        </span>
      </div>
    </div>
    <div class="grid grid-rows-5">
      <div class="text-2xl text-center text-white row-span-2">
        ROI
      </div>
      <div class="mt-2 text-5xl text-center text-white row-span-3">
        {{ totalRoi.toFixed(2) + "%" }}
      </div>
    </div>
    <div class="col-span-3"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState("tradesModule", [
        "openedTrades",
        "closedTrades",
        "totalReturn",
        "totalRoi",
        "userPreferences"
      ])
    },
  }
</script>
