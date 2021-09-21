<template>
  <div class="mt-10 grid grid-cols-12">
    <div class="col-span-2"></div>
    <div class="col-span-8">
      <div class="grid grid-cols-3">
        <div class="flex items-center justify-center grid grid-cols-2 col-span-1">
          <div class="text-2xl font-bold col-span-1">
            Open Trades
          </div>  
          <div class="col-span-1" v-if="isUserProfile && !isNewTrade">
            <button @click="insertTrade()" title="Insert a new trade" class="p-1 ml-4 text-6xl text-gray-400 rounded hover:text-gray-800">
              +
            </button>
          </div>
        </div>
        <div class="col-span-2"></div>
      </div>
      <div class="flex flex-col mt-1">
        <div v-if="isUserProfile && isNewTrade" class="mb-5">
          <div class="mt-5">
            <TradeNew/>
          </div>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Trade ID
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Exchange
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                First Pair
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Second Pair
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Current Price
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Qty Available
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Return
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                ROI
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody class="">
            <template v-for="(trade, q) in openedTrades" :key="trade.Usertrade"> 
              <tr>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ trade.Usertrade }}
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ trade.Exchange }}
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ trade.FirstPairSymbol }}
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ trade.SecondPairSymbol }}
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ trade.CurrentPrice.toFixed(5) }}
                  <span class="text-xs">
                    {{ trade.FirstPair }} / {{ trade.SecondPair }}
                  </span>
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ trade.QtyAvailable.toFixed(2) }}
                  <span class="text-xs">
                    {{ trade.SecondPair }}
                  </span>
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ trade.TotalReturn.toFixed(5) }} 
                  <span class="text-xs">
                    {{ trade.FirstPair }}
                  </span>
                </td>
                <td class="py-4 text-center text-gray-500 text-md" :class="trade.Roi > 0 ? 'bg-green-100' : 'bg-red-100'">
                  {{ trade.Roi.toFixed(2) + "%" }}
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  <button @click="toggle(trade.Id)" class="m-2" title="Expand/Collapse trade" type="button">
                    <svg class="w-5 h-5 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                      <path d="M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z"/>
                    </svg>
                  </button>
                  <button v-if="isUserProfile" @click="closeTrade(trade)" class="m-2" title="Close trade" type="button">
                    <svg class="w-5 h-5 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                      <path d="M40.5 61.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l18.9 18.9c.8.8 1.8 1.2 2.9 1.2h.2c1.1-.1 2.2-.6 3-1.5L107 28.8c1.4-1.7 1.2-4.3-.5-5.8-1.7-1.4-4.3-1.2-5.8.5L56.2 76.8 40.5 61.1z"/>
                      <path d="M95.1 15.3c-23-14.4-52.5-11-71.7 8.2C.8 46.1.8 83 23.4 105.6a57.94 57.94 0 0 0 82 0c19.3-19.3 22.6-48.9 8.1-71.9-1.2-1.9-3.7-2.5-5.6-1.3-1.9 1.2-2.5 3.7-1.3 5.6 12.5 19.8 9.6 45.2-7 61.8-19.4 19.4-51.1 19.4-70.5 0s-19.4-51.1 0-70.5C45.7 12.8 71 9.9 90.8 22.2c1.9 1.2 4.4.6 5.6-1.3 1.2-1.9.6-4.4-1.3-5.6z"/>
                    </svg>
                  </button>
                  <button v-if="isUserProfile" @click="deleteTrade(trade)" class="m-2" title="Delete trade" type="button">
                    <svg class="w-5 h-5 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                      <path d="M7.6 121.4c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2l51.1-51.1 51.1 51.1c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2 1.6-1.6 1.6-4.2 0-5.8L70.3 64.5l51.1-51.1c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8 0L64.5 58.7 13.4 7.6C11.8 6 9.2 6 7.6 7.6s-1.6 4.2 0 5.8l51.1 51.1-51.1 51.1c-1.6 1.6-1.6 4.2 0 5.8z"/>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="opened.includes(trade.Id)">
                <td colspan="12" class="border-b-2">
                  <div v-for="(subtrade, i) in trade.Subtrades" :key="subtrade.timestamp" class="flex justify-around border-b-2 border-indigo-100 ">
                    <form name="subtradeForm" class="flex h-14">
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Id</label>
                        <div class="w-full text-center text-gray-600 bg-white">
                          {{ i + 1}}
                        </div>
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Timestamp</label>
                        <input
                          :disabled="!isUserProfile"
                          name="formTimestamp" 
                          placeholder="Timestamp"
                          type="datetime-local"
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.Timestamp"
                          @change="updateTrade(trade)">
                      </div>
                      <div class="w-full text-center">
                       <label class="text-xs text-gray-400">Type</label>
                        <select
                          :disabled="!isUserProfile"
                          name="formType" 
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.Type"
                          @change="updateTrade(trade)">
                          <option value="BUY">BUY</option>
                          <option value="SELL">SELL</option>
                        </select>
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Reason</label>
                        <input
                          :disabled="!isUserProfile"
                          name="formReason" 
                          placeholder="Insert a reason" 
                          type="text"
                          class="w-full text-center text-gray-600"
                          v-model="subtrade.Reason"
                          @change="updateTrade(trade)">
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Quantity</label>
                        <input 
                          :disabled="!isUserProfile"
                          min="0.00000000001"
                          name="formQuantity" 
                          placeholder="Quantity"
                          type="number"
                          step="any"
                          class="w-full text-center text-gray-600"
                          v-model.number="subtrade.Quantity"
                          @change="updateTrade(trade)">
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Avg Price</label>
                        <input
                          :disabled="!isUserProfile"
                          min="0.00000000001"
                          name="formAvgPrice" 
                          placeholder="Avg Price"
                          type="number"
                          step="any"
                          class="w-full text-center text-gray-600"
                          v-model.number="subtrade.AvgPrice"
                          @change="updateTrade(trade)">
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Total</label>
                        <input
                          :disabled="!isUserProfile"
                          min="0.00000000001"
                          name="formTotal" 
                          placeholder="Total"
                          type="number"
                          step="any"
                          class="w-full text-center text-gray-600"
                          v-model.number="subtrade.Total"
                          @change="updateTrade(trade)">
                      </div>
                      <div class="flex text-center">
                        <button v-if="isUserProfile" @click="removeSubtrade(trade, q, i)" title="Delete subtrade" type="button">
                          <svg class="w-8 h-8 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.414 12l4.95-4.95a1 1 0 00-1.414-1.414L12 10.586l-4.95-4.95A1 1 0 005.636 7.05l4.95 4.95-4.95 4.95a1 1 0 001.414 1.414l4.95-4.95 4.95 4.95a1 1 0 001.414-1.414z"/>
                          </svg>
                        </button>
                        <button v-if="isUserProfile" @click="insertSubtrade(q, i)" title="Insert subtrade" type="button">
                          <svg class="w-8 h-8 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-span-2"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from "axios";
  import getTradeStats from "@/functions/getTradeStats.js";
  export default {
    data: function() {
      return {
        isUserProfile: false,
        isNewTrade: false,
        opened: [],
      }
    },
    computed: {
      ...mapState("tradesModule", ["openedTrades"])
    },
    created: function() {
      if (this.$route.params.username == this.$store.getters["loginModule/username"]) {
        this.isUserProfile = true;
      };
      this.$store.dispatch( "tradesModule/getTrades", {
        isopen: true,
        username: this.$route.params.username
      }); 
    },
    mounted: function () {
      window.setInterval(() => {
        this.getPrice();
      }, 5000) },
    methods: {
      getPrice() {
        let promises = [];
        for (var i in this.openedTrades) {
          var first_pair_id = this.openedTrades[i].FirstPairId;
          var second_pair_id = this.openedTrades[i].SecondPairId;
          promises.push(
            axios({
              method: "GET",
              headers: {
                Authorization: "Bearer " + document.cookie,
                "Access-Control-Allow-Origin": "*",
              },
              url: import.meta.env.VITE_ROOT_API + "/get_price/" + first_pair_id + "/" + second_pair_id,
            })
          )
        }
        Promise.all(promises).then(responses => {
          for (var i in responses) {
            this.openedTrades[i].CurrentPrice = responses[i].data;
            this.calculateTradeReturn(this.openedTrades[i]);
          }
          this.$store.dispatch("tradesModule/calculateTotalReturn");
          this.$store.dispatch("tradesModule/calculateTotalRoi");
        });
      },
      calculateTradeReturn(trade) {
        var tradeStats = getTradeStats(trade);
        trade.TotalReturn = tradeStats.TotalReturn; 
        trade.Roi = tradeStats.Roi; 
        trade.QtyAvailable = tradeStats.QtyAvailable;
      },
      validate(trade) {
        var m = [];
          for (var i in trade.Subtrades) {
            var tId = parseInt(i) + 1;
            var tS = trade.Subtrades[i];
            if (!tS.Quantity || tS.Quantity <= 0) m.push("-Wrong Quantity in subtrade " + tId);
            if (!tS.AvgPrice || tS.AvgPrice <= 0) m.push("-Wrong AvgPrice in subtrade " + tId);
            if (!tS.Total || tS.Total <= 0) m.push("-Wrong Total in subtrade " + tId);
            if (!tS.Reason) m.push("-Reason missing in subtrade " + tId);
            if (!tS.Type) m.push("-Type missing in subtrade " + tId);
            if (!tS.Timestamp) m.push("-Wrong Timestamp in subtrade " + tId);
          }
        return m;
      },
      updateTrade(trade) {
        var validateMessages = this.validate(trade);
        if (validateMessages.length <= 0) {
          this.$store.dispatch("tradesModule/updateTrade", trade);
          this.calculateTradeReturn(trade);
        } else {
          alert("Please check the following errors:\n" + validateMessages.join("\n"));
        }
      },
      deleteTrade(trade) {
        this.$store.dispatch("tradesModule/deleteTrade", trade.Usertrade);
      },
      closeTrade(trade) {
        var answer = window.confirm("Are you sure closing this trade?");
        if (answer) {
          axios({
            method: "GET",
            headers: {
              Authorization: "Bearer " + document.cookie,
              "Access-Control-Allow-Origin": "*",
            },
            url: import.meta.env.VITE_ROOT_API + "/close_trade/" + trade.Usertrade,
          }).then(response => {
            if (response.status === 200) {
              this.$store.dispatch( "tradesModule/getTrades", {
                isopen: true,
                username: this.$store.getters["loginModule/username"]
              }); 
              this.$store.dispatch( "tradesModule/getTrades", {
                isopen: false,
                username: this.$store.getters["loginModule/username"]
              }); 
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      },
      insertSubtrade(q, i) {
        this.$store.dispatch("tradesModule/insertSubtrade", {
          "isopen": true, 
          "tradeid": q,
          "subtradeid": i
        });
      },
      removeSubtrade(trade, q, i) {
        this.$store.dispatch("tradesModule/removeSubtrade", {
          "isopen": true,
          "trade": trade, 
          "tradeid": q,
          "subtradeid": i
        });
      },
      insertTrade() {
        this.isNewTrade = true;
      }, 
      cancelInsertTrade() {
        this.isNewTrade = false;
      },
  	  toggle(id) {
    	  const index = this.opened.indexOf(id);
        if (index > -1) {
      	  this.opened.splice(index, 1)
        } else {
      	  this.opened.push(id)
        }
      }
    },
  }
</script>

<style>
  ::-webkit-calendar-picker-indicator {
    filter: invert(0.4);
  }
</style>
