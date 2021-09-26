<template>
  <div class="h-20 bg-white grid grid-cols-8">
    <div class="col-span-1"></div>
    <div class="flex justify-start mt-8 md-8 col-span-2">
      <div class="text-2xl font-bold">
        Close Trades
      </div>  
    </div>
  </div>
  <div class="mb-20 grid grid-cols-8">
    <div class="col-span-1"></div>
    <div class="col-span-6">
      <table class="">
        <thead class="bg-tradetablehead">
          <tr>
            <th scope="col" class="px-1 text-xs font-medium tracking-wider text-gray-800"></th>
            <th scope="col" class="px-16 py-3 text-xs font-medium tracking-wider text-gray-800">
              Trade ID
            </th>
            <th scope="col" class="px-20 py-3 text-xs font-medium tracking-wider text-gray-800">
              Exchange
            </th>
            <th scope="col" class="px-16 py-3 text-xs font-medium tracking-wider text-gray-800">
              First Pair
            </th>
            <th scope="col" class="px-16 py-3 text-xs font-medium tracking-wider text-gray-800">
              Second Pair
            </th>
            <th scope="col" class="px-20 py-3 text-xs font-medium tracking-wider text-gray-800">
              Return
            </th>
            <th scope="col" class="px-20 py-3 text-xs font-medium tracking-wider text-gray-800">
              ROI
            </th>
            <th v-if="isUserProfile" scope="col" class="px-16 py-3 text-xs font-medium tracking-wider text-gray-800">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="">
          <template v-for="(trade, q) in closedTrades" :key="trade.Id"> 
            <tr>
              <td class="py-4 text-center text-gray-700 text-md">
                <button
                  @click="toggle(trade.Id)"
                  title="Expand/Collapse trade"
                  type="button">
                  <svg v-if="opened.includes(trade.Id)" width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#D2F8FD" d="M0 0h13v13H0z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="m.644 4.23 1.15-1.148L6.5 7.788l4.707-4.706 1.149 1.149L6.5 10.086.644 4.231Z" fill="#1A1A1A"/>
                  </svg>
                  <svg v-else width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#D2F8FD" d="m.973 13.973.054-13 13 .054-.054 13z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="m5.207 13.347-1.145-1.154L8.79 7.506 4.1 2.779l1.154-1.144 5.832 5.88-5.88 5.832Z" fill="#1A1A1A"/>
                  </svg>
                </button>
              </td>
              <td class="py-4 text-center text-gray-700 text-md">
                {{ q + 1 }}
              </td>
              <td class="py-4 text-center text-gray-700 text-md">
                {{ trade.Exchange }}
              </td>
              <td class="py-4 text-center text-gray-700 text-md">
                {{ trade.FirstPairSymbol }}
              </td>
              <td class="py-4 text-center text-gray-700 text-md">
                {{ trade.SecondPairSymbol }}
              </td>
              <td class="py-4 text-center text-gray-700 text-md">
                {{ trade.TotalReturn.toFixed(5) }} 
                <span class="text-xs">
                  {{ trade.FirstPairSymbol }}
                </span>
              </td>
              <td class="py-4 text-center text-gray-700 text-md" :class="trade.Roi > 0 ? 'text-tradepositive' : 'text-tradenegative'">
                {{ trade.Roi.toFixed(2) + "%" }}
              </td>
              <td v-if="isUserProfile" class="py-4 text-center text-gray-700 text-md">
                <button
                  v-if="isUserProfile"
                  @click="openTrade(trade)"
                  class="m-2"
                  title="Close trade"
                  type="button">
                  <svg width="18" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7.56" cy="7.56" r="6.81" stroke="#B1ADAD" stroke-width="1.5"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.143 10.313 18 2.16 16.537.57 7.614 8.785 1.527 2.698 0 4.225l7.637 7.637 1.527-1.527-.021-.022Z" fill="#00BED5"/>
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
                        class="w-full text-center text-gray-600"
                        v-model="subtrade.Reason">
                    </div>
                    <div class="w-full text-center">
                      <label class="text-xs text-gray-400">Quantity</label>
                      <input disabled
                        min="0.00000000001"
                        name="formQuantity" 
                        placeholder="Quantity"
                        type="number"
                        step="any"
                        class="w-full text-center text-gray-600"
                        v-model.number="subtrade.Quantity">
                    </div>
                    <div class="w-full text-center">
                      <label class="text-xs text-gray-400">Avg Price</label>
                      <input disabled
                        min="0.00000000001"
                        name="formAvgPrice" 
                        placeholder="Avg Price"
                        type="number"
                        step="any"
                        class="w-full text-center text-gray-600"
                        v-model.number="subtrade.AvgPrice">
                    </div>
                    <div class="w-full text-center">
                      <label class="text-xs text-gray-400">Total</label>
                      <input disabled
                        min="0.00000000001"
                        name="formTotal" 
                        placeholder="Total"
                        type="number"
                        step="any"
                        class="w-full text-center text-gray-600"
                        v-model.number="subtrade.Total">
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
