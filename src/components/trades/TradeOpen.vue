<template>
  <div>
    <div class="h-20 bg-white grid grid-cols-8">
      <div class="col-span-1"></div>
      <div class="flex justify-start mt-8 md-8 col-span-2">
        <div class="text-2xl font-bold">
          Open Trades
        </div>  
        <div class="" v-if="isUserProfile && !isNewTrade">
          <button
            @click="insertTrade()"
            title="Insert a new trade"
            class="p-1 ml-4 text-6xl text-gray-400 rounded hover:text-gray-800">
            <svg width="25" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12.5" cy="12.5" r="12" stroke="#000"/>
              <path stroke="#000" d="M12.5 7v12M6 12.5h13"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-if="isUserProfile && isNewTrade" class="mb-5 grid grid-cols-8">
      <div class="col-span-2"></div>
      <div class="w-auto mt-5 col-span-4">
        <TradeNew @closeNewTradeSection="cancelInsertTrade"/>
      </div>
    </div>
    <div class="mb-10 grid grid-cols-8">
      <div class="col-span-1"></div>
      <div class="col-span-6">
        <table class="">
          <thead class="bg-tradetablehead">
            <tr>
              <th scope="col" class="px-1 text-xs font-medium tracking-wider text-gray-800"></th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                Trade ID
              </th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                Exchange
              </th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                First Pair
              </th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                Second Pair
              </th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                Current Price
              </th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                Qty Available
              </th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                Return
              </th>
              <th scope="col" class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800">
                ROI
              </th>
              <th v-if="isUserProfile" scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="">
            <template v-for="(trade, q) in openedTrades"> 
              <tr :key="'A' + q">
                <td class="py-4 text-center text-gray-700 text-md">
                  <button
                    @click="toggle(trade.Code)"
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
                <td class="py-4 text-center text-gray-700 text-md text-fade-effect" v-bind:id="trade.Id">
                  {{ trade.CurrentPrice > 1 ? trade.CurrentPrice.toFixed(2) : trade.CurrentPrice.toFixed(5) }}
                  <span class="text-xs">
                    {{ trade.FirstPairSymbol }} / {{ trade.SecondPairSymbol }}
                  </span>
                </td>
                <td class="py-4 text-center text-gray-700 text-md">
                  {{ trade.QtyAvailable.toFixed(2) }}
                  <span class="text-xs">
                    {{ trade.SecondPairSymbol }}
                  </span>
                </td>
                <td class="py-4 text-center text-gray-700 text-md">
                  {{ trade.TotalReturn > 1 ? trade.TotalReturn.toFixed(2) : trade.TotalReturn.toFixed(5) }}
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
                    @click="closeTrade(trade)"
                    class="m-2"
                    title="Close trade"
                    type="button">
                    <svg width="18" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7.56" cy="7.56" r="6.81" stroke="#B1ADAD" stroke-width="1.5"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.143 10.313 18 2.16 16.537.57 7.614 8.785 1.527 2.698 0 4.225l7.637 7.637 1.527-1.527-.021-.022Z" fill="#00BED5"/>
                    </svg>
                  </button>
                  <button
                    v-if="isUserProfile"
                    @click="deleteTrade(trade)"
                    class="m-2"
                    title="Delete trade"
                    type="button">
                    <svg width="17" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#B1ADAD" d="M0 3.864h16.227v1.545H0z"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.395 0a.85.85 0 0 0-.85.85v15.3c0 .47.381.85.85.85h11.437c.47 0 .85-.38.85-.85V.85a.85.85 0 0 0-.85-.85H2.395Zm10.742 1.546H3.09v13.909h10.046V1.545Z" fill="#B1ADAD"/>
                      <path fill="#B1ADAD" d="M5.409 5.409h1.545v10.046H5.409zM9.273 5.409h1.545v10.046H9.273z"/>
                    </svg>
                  </button>
                </td>
              </tr>
              <tr :key="'B' + q" v-if="opened.includes(trade.Code)" class="bg-subtradesection">
                <td colspan="10" class="text-xs"> 
                  <div class="flex justify-around">
                    <table class="">
                      <thead class="">
                        <th class="tracking-wide text-gray-500 font-extralight">
                          Id
                        </th>
                        <th class="tracking-wide text-gray-500 font-extralight">
                          Timestamp
                        </th>
                        <th class="tracking-wide text-gray-500 font-extralight">
                          Type
                        </th>
                        <th class="tracking-wide text-gray-500 font-extralight">
                          Reason
                        </th>
                        <th class="tracking-wide text-gray-500 font-extralight">
                          Quantity
                        </th>
                        <th class="tracking-wide text-gray-500 font-extralight">
                          Avg Price
                        </th>
                        <th class="tracking-wide text-gray-500 font-extralight">
                          Total
                        </th>
                      </thead>
                      <tbody>
                        <tr v-for="(subtrade, i) in trade.Subtrades" class="" :key="i">
                          <td class="">
                            <div class="mx-8">
                              {{ i + 1}}
                            </div>
                          </td>
                          <td class="">
                            <div class="w-40 mx-3 border-b border-subtradeeditableborder">
                            <input
                              :disabled="!isUserProfile"
                              name="formTimestamp" 
                              placeholder="Timestamp"
                              type="datetime-local"
                              class="w-full text-center bg-subtradeeditable"
                              v-model="subtrade.CreatedAt"
                              @change="updateTrade(trade)">
                              </div>
                          </td>
                          <td>
                            <div class="mx-3 border-b border-subtradeeditableborder">
                              <select
                                :disabled="!isUserProfile"
                                name="formType" 
                                class="text-center bg-subtradeeditable"
                                v-model="subtrade.Type"
                                @change="updateTrade(trade)">
                                <option value="BUY">BUY</option>
                                <option value="SELL">SELL</option>
                              </select>
                            </div>
                          </td>
                          <td>
                            <div class="mx-3 border-b border-subtradeeditableborder">
                              <input
                                :disabled="!isUserProfile"
                                name="formReason" 
                                placeholder="Insert a reason" 
                                type="text"
                                class="text-center bg-subtradeeditable"
                                v-model="subtrade.Reason"
                                @change="updateTrade(trade)">
                            </div>
                          </td>
                          <td>
                            <div class="w-24 mx-3 border-b border-subtradeeditableborder">
                              <input 
                                :disabled="!isUserProfile"
                                min="0.00000000001"
                                name="formQuantity" 
                                placeholder="Quantity"
                                type="number"
                                step="any"
                                class="w-full text-center bg-subtradeeditable"
                                v-model.number="subtrade.Quantity"
                                @change="updateTrade(trade)">
                            </div>
                          </td>
                          <td>
                            <div class="w-24 mx-3 border-b border-subtradeeditableborder">
                              <input
                                :disabled="!isUserProfile"
                                min="0.00000000001"
                                name="formAvgPrice" 
                                placeholder="Avg Price"
                                type="number"
                                step="any"
                                class="w-full text-center bg-subtradeeditable"
                                v-model.number="subtrade.AvgPrice"
                                @change="updateTrade(trade)">
                            </div>
                          </td>
                          <td>
                            <div class="w-24 mx-3 border-b border-subtradeeditableborder">
                              <input
                                :disabled="!isUserProfile"
                                min="0.00000000001"
                                name="formTotal" 
                                placeholder="Total"
                                type="number"
                                step="any"
                                class="w-full text-center bg-subtradeeditable"
                                v-model.number="subtrade.Total"
                                @change="updateTrade(trade)">
                            </div>
                          </td>
                          <td v-if="isUserProfile">
                            <div class="flex justify-around">
                              <div class="flex justify-around m-auto mx-3">
                                <button
                                  @click="insertSubtrade(trade, i)"
                                  title="Insert subtrade"
                                  type="button">
                                  <svg width="16" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y=".83" width="15.319" height="15.319" rx="7.66" fill="#00BED5"/>
                                    <path d="M6.702 3.702h1.915v9.575H6.702V3.702Z" fill="#fff"/>
                                    <path d="M2.872 9.447V7.532h9.575v1.915H2.872Z" fill="#fff"/>
                                  </svg>
                                </button>
                                <span class="text-xs tracking-wide text-gray-500 font-extralight">
                                  Add
                                </span>
                              </div>
                              <div class="flex justify-around m-auto">
                                <button
                                  @click="removeSubtrade(trade, i)"
                                  title="Remove subtrade"
                                  type="button">
                                  <svg width="16" height="17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect y=".83" width="15.319" height="15.319" rx="7.66" fill="#FF92D1"/>
                                    <path d="M2.872 9.447V7.532h9.575v1.915H2.872Z" fill="#fff"/>
                                  </svg>
                                </button>
                                <span class="text-xs tracking-wide text-gray-500 font-extralight">
                                  Remove
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import axios from "axios";
  import TradeNew from '@/components/trades/TradeNew.vue';

  @Component({
    components: {
      TradeNew,
    }
  })
  export default class TradeOpen extends Vue {
    opened: number[] = [];
    isNewTrade: boolean = false;
    @Prop() openedTrades!: object[];
    @Prop() isUserProfile!: boolean;
    validate(trade: object) {
      var m = [];
        for (var i in trade['Subtrades']) {
          var tId = parseInt(i) + 1;
          var tS = trade['Subtrades'][i];
          if (!tS.Quantity || tS.Quantity <= 0) m.push("-Wrong Quantity in subtrade " + tId);
          if (!tS.AvgPrice || tS.AvgPrice <= 0) m.push("-Wrong AvgPrice in subtrade " + tId);
          if (!tS.Total || tS.Total <= 0) m.push("-Wrong Total in subtrade " + tId);
          if (!tS.Reason) m.push("-Reason missing in subtrade " + tId);
          if (!tS.Type) m.push("-Type missing in subtrade " + tId);
          if (!tS.CreatedAt) m.push("-Wrong Timestamp in subtrade " + tId);
        }
      return m;
    }
    updateTrade(trade: object) {
      var validateMessages = this.validate(trade);
      if (validateMessages.length <= 0) {
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: process.env.VUE_APP_HTTP_URL + "/update_trade",
          data: trade
        }).then(response => {
          if (response.status === 200) {
            console.log("Trade updated");
          }
        }).catch(function (error) {
          console.log(error);
        })
      } else {
        alert("Please check the following errors:\n" + validateMessages.join("\n"));
      }
    }
    deleteTrade(trade: object) {
      var answer = window.confirm("Are you sure deleting this trade?");
      if (answer) {
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: process.env.VUE_APP_HTTP_URL + "/delete_trade/" + trade['Code'],
        }).then(response => {
          if (response.status === 200) {
            console.log("Trade deleted");
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
    closeTrade(trade: object) {
      var answer = window.confirm("Are you sure closing this trade?");
      if (answer) {
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: process.env.VUE_APP_HTTP_URL + "/close_trade/" + trade['Code'],
        }).then(response => {
          if (response.status === 200) {
            console.log("Trade closed");
          }
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
    insertSubtrade(trade: object, subtradeid: number) {
      var next = 1;
      for (var i in trade['Subtrades']) {
        if (trade['Subtrades'][i].SubtradeId >= next) {
          next = next + 1
        }
      }
      var now = new Date();
      var customNow = now.getFullYear() + "-" + 
        ('0' + (now.getMonth()+1)).slice(-2)  + "-" + 
        ('0' + now.getDate()).slice(-2) + "T" + 
        ('0' + (now.getHours())).slice(-2)  + ":" + 
        ('0' + (now.getMinutes())).slice(-2);
      trade['Subtrades'].splice(subtradeid + 1, 0, {
        SubtradeId: next,
        CreatedAt: customNow,
        Type: "BUY",
        Reason: "Insert a reason",
        Quantity: 0.0001,
        AvgPrice: 0.0001,
        Total: 0.0001
      });
    }
    removeSubtrade(trade: object, subtradeid: number) {
      var answer = window.confirm("Are you sure deleting this subtrade?");
      if (answer) {
        trade['Subtrades'].splice(subtradeid, 1);
      }
      if (trade['Subtrades'].length == 0) {
        this.insertSubtrade(trade, subtradeid);
      };
      this.updateTrade(trade);
    }
    insertTrade() {
      this.isNewTrade = true;
    }
    cancelInsertTrade() {
      this.isNewTrade = false;
    }
    toggle(id: number) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    }
  }
</script>
