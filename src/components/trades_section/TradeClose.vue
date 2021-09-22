<template>
  <div class="mt-10 grid grid-cols-12">
    <div class="col-span-2"></div>
    <div class="col-span-8">
      <div class="grid grid-cols-3">
        <div class="flex items-center justify-center grid grid-cols-2 col-span-1">
          <div class="text-2xl font-bold col-span-1">
            Close Trades
          </div>  
        </div>
        <div class="col-span-2"></div>
      </div>
      <div class="flex flex-col mt-5">
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
                Return
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                ROI
              </th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody class="">
            <template v-for="(trade, q) in closedTrades" :key="trade.Id"> 
              <tr>
                <td class="py-4 text-center text-gray-500 text-md">
                  {{ q + 1 }}
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
                  {{ trade.TotalReturn.toFixed(5) }}
                  <span class="text-xs">
                    {{ trade.FirstPairSymbol }}
                  </span>
                </td>
                <td class="py-4 text-center text-gray-500 text-md" :class="trade.Roi > 0 ? 'bg-green-100' : 'bg-red-100'">
                  {{ trade.Roi.toFixed(2) + "%" }}
                </td>
                <td class="py-4 text-center text-gray-500 text-md">
                  <button
                    @click="toggle(trade.Id)"
                    class="m-2"
                    title="Expand/Collapse trade"
                    type="button">
                    <svg class="w-5 h-5 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                      <path d="M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z"/>
                    </svg>
                  </button>
                    <button
                      v-if="isUserProfile"
                      @click="openTrade(trade)"
                      class="m-2"
                      title="Re-open trade"
                      type="button">
                    <svg class="w-5 h-5 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                      <path d="M40.5 61.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l18.9 18.9c.8.8 1.8 1.2 2.9 1.2h.2c1.1-.1 2.2-.6 3-1.5L107 28.8c1.4-1.7 1.2-4.3-.5-5.8-1.7-1.4-4.3-1.2-5.8.5L56.2 76.8 40.5 61.1z"/>
                      <path d="M95.1 15.3c-23-14.4-52.5-11-71.7 8.2C.8 46.1.8 83 23.4 105.6a57.94 57.94 0 0 0 82 0c19.3-19.3 22.6-48.9 8.1-71.9-1.2-1.9-3.7-2.5-5.6-1.3-1.9 1.2-2.5 3.7-1.3 5.6 12.5 19.8 9.6 45.2-7 61.8-19.4 19.4-51.1 19.4-70.5 0s-19.4-51.1 0-70.5C45.7 12.8 71 9.9 90.8 22.2c1.9 1.2 4.4.6 5.6-1.3 1.2-1.9.6-4.4-1.3-5.6z"/>
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
                        <div class="">
                          {{ i + 1}}
                        </div>
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Timestamp</label>
                        <input disabled
                          name="formTimestamp" 
                          placeholder="Timestamp"
                          type="datetime-local"
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.Timestamp">
                      </div>
                      <div class="w-full text-center">
                       <label class="text-xs text-gray-400">Type</label>
                        <select disabled
                          name="formType" 
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.Type">
                          <option value="BUY">BUY</option>
                          <option value="SELL">SELL</option>
                        </select>
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Reason</label>
                        <input disabled
                          name="formReason" 
                          placeholder="Insert a reason" 
                          type="text"
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.Reason">
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Quantity</label>
                        <input disabled
                          name="formQuantity" 
                          placeholder="Quantity"
                          type="number"
                          step="any"
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.Quantity">
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Avg Price</label>
                        <input disabled
                          name="formAvgPrice" 
                          placeholder="Avg Price"
                          type="number"
                          step="any"
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.AvgPrice">
                      </div>
                      <div class="w-full text-center">
                        <label class="text-xs text-gray-400">Total</label>
                        <input disabled
                          name="formTotal" 
                          placeholder="Total"
                          type="number"
                          step="any"
                          class="w-full text-center text-gray-600 bg-white"
                          v-model="subtrade.Total">
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
  export default {
    data: function() {
      return {
        isUserProfile: false,
        opened: []
      }
    },
    computed: {
      ...mapState("tradesModule", ["closedTrades"])
    },
    created: function() {
      if (this.$route.params.username == this.$store.getters["loginModule/username"]) {
        this.isUserProfile = true;
      };
      this.$store.dispatch( "tradesModule/getTrades", {
        isopen: false,
        username: this.$route.params.username
      }); 
    },
    methods: {
      openTrade(trade) {
        var answer = window.confirm("Are you sure re-opening this trade?");
        if (answer) {
          axios({
            method: "GET",
            headers: {
              Authorization: "Bearer " + document.cookie,
              "Access-Control-Allow-Origin": "*",
            },
            url: import.meta.env.VITE_ROOT_API + "/open_trade/" + trade.Id,
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
