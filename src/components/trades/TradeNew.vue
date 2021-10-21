<template>
  <div class="p-5 rounded-3xl bg-tradenew">
    <div class="p-4 text-2xl font-bold text-tradebigtext">
      Add a new trade
    </div>
    <div class="m-8 grid grid-cols-4">
      <div class="p-2 mx-4 rounded-xl col-span-2">
        <label class="text-xs text-subtradelabel">Exchange</label>
        <input
          placeholder="Exchange"
          class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
          v-model="newTrade.Exchange">
      </div>
      <div class="p-2 mx-4 rounded-xl col-span-1">
        <label class="text-xs text-subtradelabel">First Pair</label>
        <select
          class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500"
          v-model="newTrade.FirstPair">
          <option
            v-for="(key, value) in cryptoPairs" 
            :value="value"
            :key="value">
            {{ key.Symbol }} - {{ value }}
          </option>
        </select>
      </div>
      <div class="p-2 mx-4 rounded-xl col-span-1">
        <label class="text-xs text-subtradelabel">Second Pair</label>
        <select
          class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500"
          v-model="newTrade.SecondPair">
          <option
            v-for="(key, value) in cryptoPairs" 
            :value="value"
            :key="value">
            {{ key.Symbol }} - {{ value }}
          </option>
        </select>
      </div>
    </div>
    <div v-for="(subtrade, i) in newTrade.Subtrades" :key="subtrade.Timestamp" class="mb-8 ml-8 rounded-xl grid grid-cols-12">
      <div class="bg-subtradenew rounded-3xl col-span-11">
        <div class="pt-4 pl-4 pr-4 mt-3 grid grid-cols-6">
          <div class="mt-4 ml-4 mr-4 rounded-xl col-span-2">
            <label class="text-xs text-subtradelabel">Date/Time</label>
            <input
              placeholder="Timestamp"
              type="datetime-local"
              class="w-full p-2 border border-gray-200 border-gray-500"
              v-model="subtrade.Timestamp">
          </div>
          <div class="mt-4 ml-4 mr-4 rounded-xl col-span-1">
            <label class="text-xs text-subtradelabel">Buy/Sell</label>
            <select
              class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500"
              v-model="subtrade.Type">
              <option value="BUY">
                BUY
              </option>
              <option value="SELL">
                SELL
              </option>
            </select>
          </div>
          <div class="mt-4 ml-4 mr-4 rounded-xl col-span-3">
            <label class="text-xs text-subtradelabel">Trade reason</label>
            <input
              placeholder="Reason"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="subtrade.Reason">
          </div>
        </div>
        <div class="p-4 grid grid-cols-3">
          <div class="m-4 rounded-xl col-span-1">
            <label class="text-xs text-subtradelabel">Quantity</label>
            <input
              min="0.00000000001"
              placeholder="Quantity"
              type="number"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="subtrade.Quantity">
          </div>
          <div class="m-4 rounded-xl col-span-1">
            <label class="text-xs text-subtradelabel">Average price</label>
            <input
              min="0.00000000001"
              placeholder="Avg Price"
              type="number"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="subtrade.AvgPrice">
          </div>
          <div class="m-4 rounded-xl col-span-1">
            <label class="text-xs text-subtradelabel">Total</label>
            <input
              min="0.00000000001"
              placeholder="Total"
              type="number"
              class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
              v-model="subtrade.Total">
          </div>
        </div>
      </div>
      <div class="flex justify-around ml-2 col-span-1">
        <div class="flex align-middle">
          <button
            @click="addSubtrade()"
            class="p-1">
            <svg width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="17" fill="#8CEDF9"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.818 25.09h5.455V27H11a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h9.621l4.652 5.454V16h-1.819v-2.727h-3.636V7.818h-10v17.273Z" fill="#767676"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.363 22.364h-7.272v-1.818h7.272v1.818Z" fill="#767676"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.818 25.091v-7.273h1.818v7.273h-1.818Z" fill="#767676"/>
            </svg>
          </button>
          <button
            v-if="newTrade.Subtrades.length > 1"
            @click="removeSubtrade(i)"
            class="">
            <svg width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17" cy="17" r="17" fill="#8CEDF9"/>
              <path fill="#767676" d="M7 11.546h19.091v1.818H7z"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.818 7a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h13.455a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9.818Zm12.637 1.818H10.637v16.364h11.818V8.818Z" fill="#767676"/>
              <path fill="#767676" d="M13.364 13.363h1.818v11.818h-1.818zM17.909 13.363h1.818v11.818h-1.818z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        @click="confirmInsertTrade()"
        class="p-2 mr-2 text-lg text-white rounded-lg bg-tradenewbuttonconfirm">
        CONFIRM
      </button>
      <button
        @click="cancelInsertTrade()"
        class="p-2 ml-2 text-lg rounded-lg bg-tradenewbuttoncancel">
        CANCEL
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  import axios from "axios";

  @Component({})
  export default class TradeNew extends Vue {
    cryptoPairs: number[] = [];
    newTrade: object = {
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
    created() {
      this.getPairs();
    }
    getPairs() {
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: process.env.VUE_APP_HTTP_URL + "/get_pairs",
      }).then(response => {
        if (response.status === 200) {
          this.cryptoPairs = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
    addSubtrade() {
      this.newTrade['Subtrades'].push(
        {
          Timestamp: null,
          Type: null,
          Reason: null,
          Quantity: null,
          AvgPrice: null,
          Total: null 
        }
      );
    }
    removeSubtrade(i: number) {
      this.newTrade['Subtrades'].splice(i, 1);
    }
    validate() {
      var m = [];
        if (!this.newTrade['Exchange']) m.push("-Exchange missing");
        if (!this.newTrade['FirstPair']) m.push("-First Pair missing");
        if (!this.newTrade['SecondPair']) m.push("-Second Pair missing");
        for (var i in this.newTrade['Subtrades']) {
          var tId = parseInt(i) + 1;
          var tS = this.newTrade['Subtrades'][i];
          if (!tS.Quantity || tS.Quantity <= 0) m.push("-Wrong Quantity in subtrade " + tId);
          if (!tS.AvgPrice || tS.AvgPrice <= 0) m.push("-Wrong AvgPrice in subtrade " + tId);
          if (!tS.Total || tS.Total <= 0) m.push("-Wrong Total in subtrade " + tId);
          if (!tS.Reason) m.push("-Reason missing in subtrade " + tId);
          if (!tS.Type) m.push("-Type missing in subtrade " + tId);
          if (!tS.Timestamp) m.push("-Wrong Timestamp in subtrade " + tId);
        }
      return m;
    }
    confirmInsertTrade() {
      var validateMessages = this.validate();
      if (validateMessages.length <= 0) {
        this.newTrade['FirstPair'] = this.cryptoPairs[this.newTrade['FirstPair']]['CoinId'];
        this.newTrade['SecondPair'] = this.cryptoPairs[this.newTrade['SecondPair']]['CoinId'];
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: process.env.VUE_APP_HTTP_URL + "/insert_trade",
          data: this.newTrade
        }).then(response => {
          if (response.status === 200) {
            this.newTrade = {};
            this.cancelInsertTrade();
          }
        }).catch(function (error) {
          console.log(error);
        })
      } else {
        alert("Please check the following errors:\n" + validateMessages.join("\n"));
      }
    }
    @Emit('closeNewTradeSection')
    cancelInsertTrade(){}
  }
</script>
