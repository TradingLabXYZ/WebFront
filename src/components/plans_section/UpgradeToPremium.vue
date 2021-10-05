<template>
  <div class="mt-8 text-xl font-bold">STEP 1</div>
  <div class="">
    <label class="">Select number of months</label>
    <input
      placeholder="Months"
      type="number"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="numberMonths">
  </div>
  <div class="mt-8 text-xl">
    {{ (numberMonths * totalToPay).toFixed(2) }} $ ~ {{ (numberMonths * totalToPay / 0.30).toFixed(2) }} XLM
  </div>
  <div v-if="numberMonths > 0" class="mt-5">
    <div class="mt-5 text-xl font-bold">STEP 2</div>
    <div>
      Send XLM to the following Address: <b>0X23471238471</b>
    </div>
    <div>
      Insert this MEMO: <b>dfdysdasd</b>
    </div>
    <div class="mt-8 text-xl font-bold">STEP 3</div>
    <div>
      Insert the transaction ID
    </div>
    <label class="text-xs text-subtradelabel">Transaction ID</label>
    <input
      placeholder="Stellar Transaction ID"
      type="text"
      class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
      v-model="stellarTransaction">
  </div>
  <div v-if="stellarTransaction">
    <div class="mt-8 text-xl font-bold">STEP 4</div>
    <div>
      Check the status of your payment
    </div>
    <button class="p-3 bg-green-400 hover:bg-green-600" @click="checkTransaction()">
      CHECK
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data: function() {
      return {
        numberMonths: 0,
        totalToPay: 4.99,
        stellarTransaction: ""
      }
    },
  }
</script>
