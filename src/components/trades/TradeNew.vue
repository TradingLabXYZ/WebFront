<template>
  <div class="p-5 mb-5 rounded-3xl bg-tradenew divide-y divide-subtradenew">
    <div class="p-1 text-2xl font-bold text-center text-tradebigtext">
      Add a new trade
    </div>
    <div>
      <div class="m-1 mb-3 grid grid-cols-4">
        <div class="p-2 mx-4 rounded-xl col-span-2">
          <label class="text-xs text-subtradelabel">Exchange</label>
          <input
            class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
            v-model="newTrade.Exchange">
        </div>
        <div class="p-2 mx-4 rounded-xl col-span-1">
          <label class="text-xs text-subtradelabel">Selling</label>
          <select
            class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500"
            v-model="newTrade.FirstPair">
            <option
              v-for="(key, value) in cryptoPairs" 
              :value="value"
              :key="value">
              {{ value }} - {{ key.Name }}
            </option>
          </select>
        </div>
        <div class="p-2 mx-4 rounded-xl col-span-1">
          <label class="text-xs text-subtradelabel">Buying</label>
          <select
            class="w-full p-2 text-gray-800 bg-white border border-gray-200 border-gray-500"
            v-model="newTrade.SecondPair">
            <option
              v-for="(key, value) in cryptoPairs" 
              :value="value"
              :key="value">
              {{ value }} - {{ key.Name }}
            </option>
          </select>
        </div>
      </div>
      <div v-for="(subtrade, i) in newTrade.Subtrades" :key="subtrade.Timestamp" class="mb-8 ml-8 rounded-xl grid grid-cols-12">
        <div class="bg-subtradenew rounded-3xl col-span-11">
          <div class="pt-4 pl-4 pr-4 mt-3 grid grid-cols-6">
            <div class="ml-4 mr-4 rounded-xl col-span-2">
              <label class="text-xs text-subtradelabel">Date/Time</label>
              <input
                name="date"
                type="text"
                onfocus="(this.type='datetime-local')"
                onfocusout="(this.type='text')"
                class="w-full p-2 border border-gray-200 border-gray-500"
                v-model="subtrade.CreatedAt">
            </div>
            <div class="ml-4 mr-4 rounded-xl col-span-1">
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
            <div class="ml-4 mr-4 rounded-xl col-span-3">
              <label class="text-xs text-subtradelabel">Trade reason / Description</label>
              <input
                class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
                v-model="subtrade.Reason">
            </div>
          </div>
          <div class="p-4 grid grid-cols-3">
            <div class="m-4 rounded-xl col-span-1">
              <label class="text-xs text-subtradelabel">Quantity</label>
              <input
                min="0.00000000001"
                type="number"
                class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
                v-model="subtrade.Quantity">
            </div>
            <div class="m-4 rounded-xl col-span-1">
              <label class="text-xs text-subtradelabel">Average price</label>
              <input
                min="0.00000000001"
                type="number"
                class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
                v-model="subtrade.AvgPrice">
            </div>
            <div class="m-4 rounded-xl col-span-1">
              <label class="text-xs text-subtradelabel">Total</label>
              <input
                min="0.00000000001"
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
              title="Add Subtrade"
              class="p-1">
              <AddSubtrade/>
            </button>
            <button
              v-if="newTrade.Subtrades.length > 1"
              @click="removeSubtrade(i)"
              title="Remove Subtrade"
              class="">
              <RemoveSubtrade/>
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
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Emit } from 'vue-property-decorator';
  import axios from "axios";
  import AddSubtrade from '@/components/svg/AddSubtrade.vue'
  import RemoveSubtrade from '@/components/svg/RemoveSubtrade.vue'
  @Component({
    components: {
      AddSubtrade,
      RemoveSubtrade
    }
  })
  export default class TradeNew extends Vue {
    userCode: string = '';
    cryptoPairs: object = {};
    newTrade: object = {
      Exchange: null,
      FirstPair: null,
      SecondPair: null,
      Subtrades: [
        {
          CreatedAt: null,
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
          CreatedAt: null,
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
      var m: string[] = [];
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
          if (!tS.CreatedAt) m.push("-Wrong Timestamp in subtrade " + tId);
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
