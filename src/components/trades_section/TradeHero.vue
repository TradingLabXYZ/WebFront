<template>
  <div class="items-center justify-center grid grid-cols-9 h-44 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700">
    <div class="col-span-3"></div>
    <div class="grid grid-rows-5">
      <div class="text-xl font-medium text-center text-white row-span-2">
        Total Trades
      </div>
      <div class="text-4xl font-semibold text-center text-white row-span-3">
        {{ openedTrades.length + closedTrades.length}}
      </div>
    </div>
    <div class="grid grid-rows-5">
      <div class="text-xl font-medium text-center text-white row-span-2">
        <span v-if="userPreferences.returnCurrency == 'BTC'">
          ₿ Return
        </span>
        <span v-else>
          $ Return
        </span>
      </div>
      <div class="text-4xl font-semibold text-center text-white row-span-3">
        {{ totalReturn.toFixed(5) }}
      </div>
    </div>
    <div class="grid grid-rows-5">
      <div class="text-xl font-medium text-center text-white row-span-2">
        ROI
      </div>
      <div class="text-4xl font-semibold text-center text-white row-span-3">
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
