<template>
  <div class="grid grid-cols-8">
    <div class="col-span-1"></div>
    <div class="p-5 bg-gray-100 col-span-6">
      <div class="flex justify-around pb-2 text-2xl">
        NEW TRADE
      </div>
      <div class="grid grid-cols-4">
        <div class="mx-4 bg-white border border-gray-200 rounded col-span-2">
          <input
            placeholder="Exchange"
            class="w-full p-2 text-gray-800"
            v-model="newTrade.Exchange">
        </div>
        <div class="mx-4 bg-white border border-gray-200 rounded col-span-1">
          <input
            placeholder="First Pair"
            class="w-full p-2 text-gray-800"
            v-model="newTrade.FirstPair">
        </div>
        <div class="mx-4 bg-white border border-gray-200 rounded col-span-1">
          <input
            placeholder="Second Pair"
            class="w-full p-2 text-gray-800"
            v-model="newTrade.SecondPair">
        </div>
      </div>
      <div v-for="(subtrade, i) in newTrade.Subtrades" :key="subtrade.Timestamp" class="m-3 bg-gray-200">
        <div class="flex justify-around p-2 bg-gray-300">
          Subtrade {{ i + 1}}
        </div>
        <div class="p-4 grid grid-cols-6">
          <div class="mx-4 border border-gray-300 col-span-2">
            <input
              placeholder="Timestamp"
              type="datetime-local"
              class="w-full px-2 py-2 text-gray-800"
              v-model="subtrade.Timestamp">
          </div>
          <div class="mx-4 border border-gray-300 col-span-1">
            <select
              class="w-full h-10 text-gray-800 bg-white"
              v-model="subtrade.Type">
                <option value="BUY">
                  BUY
                </option>
                <option value="SELL">
                  SELL
                </option>
            </select>
          </div>
          <div class="mx-4 border border-gray-300 col-span-3">
            <input
              placeholder="Reason"
              class="w-full h-10 p-2 text-gray-800"
              v-model="subtrade.Reason">
          </div>
        </div>
        <div class="p-4 grid grid-cols-3">
          <div class="mx-4 border border-gray-300 col-span-1">
            <input
              min="0.00000000001"
              placeholder="Quantity"
              type="number"
              class="w-full px-2 py-2 text-gray-800"
              v-model="subtrade.Quantity">
          </div>
          <div class="mx-4 border border-gray-300 col-span-1">
            <input
              min="0.00000000001"
              placeholder="Avg Price"
              type="number"
              class="w-full px-2 py-2 text-gray-800"
              v-model="subtrade.AvgPrice">
          </div>
          <div class="mx-4 border border-gray-300 col-span-1">
            <input
              min="0.00000000001"
              placeholder="Total"
              type="number"
              class="w-full px-2 py-2 text-gray-800"
              v-model="subtrade.Total">
          </div>
        </div>
        <div class="flex justify-around pb-2">
          <div>
            <button
              @click="addSubtrade()"
              class="p-1 pl-4 pr-4 ml-4 text-lg bg-blue-200 rounded hover:bg-blue-400">
              +
            </button>
            <button
              v-if="newTrade.Subtrades.length > 1"
              @click="removeSubtrade(i)"
              class="p-1 pl-4 pr-4 ml-4 text-lg bg-red-200 rounded hover:bg-red-400">
              -
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          @click="confirmInsertTrade()"
          class="p-1 ml-4 bg-green-400 rounded hover:bg-green-300">
          Confirm
        </button>
        <button
          @click="cancelInsertTrade()"
          class="p-1 ml-4 bg-gray-400 rounded hover:bg-gray-300">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data: function() {
      return {
        newTrade: {
          Exchange: null,
          FirstPair: null,
          SecondPair: null,
          Subtrades: [
            {
              Timestamp: null,
              Type: null,
              Reason: null,
              Quantity: null,
              AvgPrice: null,
              Total: null 
            }
          ]
        }
      }
    },
    methods: {
      addSubtrade() {
        this.newTrade.Subtrades.push(
          {
            Timestamp: null,
            Type: null,
            Reason: null,
            Quantity: null,
            AvgPrice: null,
            Total: null 
          }
        );
      },
      removeSubtrade(i) {
        this.newTrade.Subtrades.splice(i, 1);
      },
      cancelInsertTrade() {
        this.$parent.cancelInsertTrade();
      },
      validate() {
        var m = [];
          if (!this.newTrade.Exchange) m.push("-Exchange missing");
          if (!this.newTrade.FirstPair) m.push("-First Pair missing");
          if (!this.newTrade.SecondPair) m.push("-Second Pair missing");
          for (var i in this.newTrade.Subtrades) {
            var tId = parseInt(i) + 1;
            var tS = this.newTrade.Subtrades[i];
            if (!tS.Quantity || tS.Quantity <= 0) m.push("-Wrong Quantity in subtrade " + tId);
            if (!tS.AvgPrice || tS.AvgPrice <= 0) m.push("-Wrong AvgPrice in subtrade " + tId);
            if (!tS.Total || tS.Total <= 0) m.push("-Wrong Total in subtrade " + tId);
            if (!tS.Reason) m.push("-Reason missing in subtrade " + tId);
            if (!tS.Type) m.push("-Type missing in subtrade " + tId);
            if (!tS.Timestamp) m.push("-Wrong Timestamp in subtrade " + tId);
          }
        return m;
      },
      confirmInsertTrade() {
        var validateMessages = this.validate();
        if (validateMessages.length <= 0) {
          axios({
            method: "POST",
            headers: {
              Authorization: "Bearer " + document.cookie,
              "Access-Control-Allow-Origin": "*",
            },
            url: import.meta.env.VITE_ROOT_API + "/insert_trade",
            data: this.newTrade
          }).then(response => {
            if (response.status === 200) {
              this.newTrade = {};
              this.cancelInsertTrade();
              this.$store.dispatch('tradesModule/getTrades', true);
            }
          }).catch(function (error) {
            console.log(error);
          })
        } else {
          alert("Please check the following errors:\n" + validateMessages.join("\n"));
        }
      }
    }
  }
</script>
