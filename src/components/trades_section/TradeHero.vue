<template>
  <div class="pt-10 text-white grid grid-cols-10 h-44 bg-tradehero">
    <div class="col-span-2"></div>
    <div class="text-right col-span-2">
      <div class="text-2xl">
        Total Trades
      </div>
      <div class="text-5xl">
        {{ openedTrades.length + closedTrades.length}}
      </div>
    </div>
    <div class="text-center col-span-2">
      <div class="text-2xl">
        <span v-if="userPreferences.returnCurrency == 'BTC'">
          ₿ Return
        </span>
        <span v-else>
          $ Return
        </span>
      </div>
      <div class="text-5xl">
        <span v-if="userPreferences.returnCurrency == 'BTC'">
          {{ totalReturn.toFixed(5) }}
        </span>
        <span v-else>
          {{ totalReturn.toFixed(2) }}
        </span>
      </div>
    </div>
    <div class="text-left col-span-2">
      <div class="text-2xl">
        ROI
      </div>
      <div class="text-5xl">
        {{ totalRoi.toFixed(2) + "%" }}
      </div>
    </div>
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
