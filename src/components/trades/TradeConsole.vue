<template>
  <div>
    <div v-if="!isMobile">
      <div class="h-20 bg-white grid grid-cols-5">
        <div class="col-span-1"></div>
        <div class="flex justify-start mt-8 md-8 col-span-2">
          <div class="text-2xl font-bold">
            <span v-if="isUserProfile">
              My Trades
            </span>
            <span v-else>
              Trades 
            </span>
          </div>  
          <div v-if="isUserConnected && isUserProfile && !isNewTrade">
            <button
              @click="insertTrade()"
              title="Insert a new trade"
              class="p-1 ml-4 text-6xl text-gray-400 rounded hover:text-gray-800">
              <InsertTrade/>
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="isUserConnected && isUserProfile && isNewTrade"
        class="mb-5 grid grid-cols-8">
        <div class="col-span-2"></div>
        <div class="w-auto mt-5 col-span-4">
          <TradeNew
            v-bind:isMobile="isMobile"
            @closeNewTradeSection="cancelInsertTrade"/>
        </div>
      </div>
      <div class="flex justify-center mb-10">
        <table>
          <thead class="bg-tradetablehead">
            <tr>
              <th 
                class="px-1 text-xs font-medium tracking-wider text-gray-800"
                scope="col">
              </th>
              <th
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Exchange
              </th>
              <th
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-6 md:px-3 sm:px-1"
                scope="col">
                First Pair
              </th>
              <th
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-6 md:px-3 sm:px-1"
                scope="col">
                Second Pair
              </th>
              <th
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Current Price
              </th>
              <th
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-8 md:px-4 sm:px-2"
                scope="col">
                Qty Available
              </th>
              <th
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Return
              </th>
              <th
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                ROI
              </th>
              <th
                v-if="isUserConnected && isUserProfile"
                class="py-3 text-xs font-medium tracking-wider text-gray-800 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="">
            <template v-for="(trade, q) in trades">
              <tr :key="'A' + q">
                <td class="py-4 text-center text-gray-700 text-md">
                  <button
                    @click="toggle(trade.Code)"
                    title="Expand/Collapse trade"
                    type="button">
                    <ExpandTrade v-if="opened.includes(trade.Code)"/>
                    <CollapseTrade v-else/>
                  </button>
                </td>
                <td class="py-4 text-center text-gray-700 text-md">
                  {{ trade.Exchange }}
                </td>
                <td class="py-4 text-center text-gray-700 text-md">
                  <img
                    :src="trade.FirstPairUrlIcon"
                    height="30"
                    width="30"
                    class="inline-block align-middle"/>
                  {{ trade.FirstPairSymbol }}
                </td>
                <td class="py-4 text-center text-gray-700 text-md">
                  <img
                    :src="trade.SecondPairUrlIcon"
                    height="30"
                    width="30"
                    class="inline-block align-middle"/>
                  {{ trade.SecondPairSymbol }}
                </td>
                <td
                  class="py-4 text-center text-gray-700 text-md text-fade-effect"
                  v-bind:id="trade.Code">
                  {{ trade.CurrentPrice }}
                  <span class="text-xs">
                    {{ trade.FirstPairSymbol }} / {{ trade.SecondPairSymbol }}
                  </span>
                </td>
                <td class="py-4 text-center tex-gray-700 text-md">
                  {{ trade.QtyAvailable }}
                  <span class="text-xs">
                    {{ trade.SecondPairSymbol }}
                  </span>
                </td>
                <td class="py-4 text-center text-gray-700 text-md">
                  {{ trade.TotalReturn }}
                  <span class="text-xs">
                    {{ trade.FirstPairSymbol }}
                  </span>
                </td>
                <td
                  class="py-4 text-center text-gray-700 text-md"
                  :class="trade.Roi > 0 ? 'text-tradepositive' : 'text-tradenegative'">
                  {{ trade.Roi + "%" }}
                </td>
                <td
                  v-if="isUserConnected && isUserProfile"
                  class="py-4 text-center text-gray-700 text-md">
                  <button
                    v-if="isUserConnected && isUserProfile"
                    @click="deleteTrade(trade)"
                    class="m-2"
                    title="Delete trade"
                    type="button">
                    <DeleteTrade/>
                  </button>
                </td>
              </tr>
              <tr
                :key="'B' + q"
                v-if="opened.includes(trade.Code)"
                class="bg-subtradesection">
                <td 
                  colspan="10"
                  class="text-xs"> 
                  <div class="flex justify-around">
                    <table>
                      <thead>
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
                        <tr
                          v-for="(subtrade, i) in trade.Subtrades"
                          :key="i">
                          <td>
                            <div class="mx-8">
                              {{ i + 1}}
                            </div>
                          </td>
                            <td>
                            <div class="w-40 border-b border-subtradeeditableborder">
                            <input
                              :disabled="!isUserConnected || !isUserProfile"
                              name="formTimestamp" 
                              placeholder="Timestamp"
                              type="datetime-local"
                              class="w-full text-center bg-subtradeeditable"
                              v-model="subtrade.CreatedAt"
                              @change="updateSubtrade(subtrade)">
                              </div>
                          </td>
                          <td>
                            <div class="border-b border-subtradeeditableborder">
                              <select
                                :disabled="!isUserConnected || !isUserProfile"
                                name="formType" 
                                class="text-center bg-subtradeeditable"
                                v-model="subtrade.Type"
                                @change="updateSubtrade(subtrade)">
                                <option value="BUY">BUY</option>
                                <option value="SELL">SELL</option>
                              </select>
                            </div>
                          </td>
                          <td>
                            <div class="border-b border-subtradeeditableborder">
                              <input
                                :disabled="!isUserConnected || !isUserProfile"
                                name="formReason" 
                                placeholder="Insert a reason" 
                                type="text"
                                class="text-center bg-subtradeeditable"
                                v-model="subtrade.Reason"
                                @change="updateSubtrade(subtrade)">
                            </div>
                          </td>
                          <td>
                            <div class="w-24 border-b border-subtradeeditableborder">
                              <input 
                                :disabled="!isUserConnected || !isUserProfile"
                                min="0.00000000001"
                                name="formQuantity" 
                                placeholder="Quantity"
                                type="number"
                                step="any"
                                class="w-full text-center bg-subtradeeditable"
                                v-model.number="subtrade.Quantity"
                                @change="updateSubtrade(subtrade)">
                            </div>
                          </td>
                          <td>
                            <div class="w-24 border-b border-subtradeeditableborder">
                              <input
                                :disabled="!isUserConnected || !isUserProfile"
                                min="0.00000000001"
                                name="formAvgPrice" 
                                placeholder="Avg Price"
                                type="number"
                                step="any"
                                class="w-full text-center bg-subtradeeditable"
                                v-model.number="subtrade.AvgPrice"
                                @change="updateSubtrade(subtrade)">
                            </div>
                          </td>
                          <td>
                            <div class="w-24 border-b border-subtradeeditableborder">
                              <input
                                :disabled="!isUserConnected || !isUserProfile"
                                min="0.00000000001"
                                name="formTotal" 
                                placeholder="Total"
                                type="number"
                                step="any"
                                class="w-full text-center bg-subtradeeditable"
                                v-model.number="subtrade.Total"
                                @change="updateSubtrade(subtrade)">
                            </div>
                          </td>
                          <td v-if="isUserConnected && isUserProfile">
                            <div class="flex">
                              <div
                                class="flex justify-start"
                                v-if="trade.Subtrades.length > 1">
                                <button
                                  @click="removeSubtrade(subtrade)"
                                  title="Remove subtrade"
                                  type="button">
                                  <RemoveSubtradeOpen/>
                                </button>
                                <span class="text-xs tracking-wide text-gray-500 font-extralight">
                                  Remove
                                </span>
                              </div>
                              <div
                                class="flex justify-start mx-3"
                                v-if="i == (trade.Subtrades.length - 1)">
                                <button
                                  @click="insertSubtrade(trade)"
                                  title="Insert subtrade"
                                  type="button">
                                  <AddSubtradeOpen/>
                                </button>
                                <span class="text-xs tracking-wide text-gray-500 font-extralight">
                                  Add
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
    <div v-else>
      <div class="flex justify-center mt-4 mb-2">
        <div class="text-xl font-bold">
          My Trades
        </div>  
        <div v-if="isUserConnected && isUserProfile && !isNewTrade">
          <button
            @click="insertTrade()"
            title="Insert a new trade"
            class="p-1 ml-1 text-6xl text-gray-400 rounded hover:text-gray-800">
            <InsertTrade class="transform scale-75"/>
          </button>
        </div>
      </div>
      <div
        v-if="isUserConnected && isUserProfile && isNewTrade"
        class="grid grid-cols-8">
        <div class="col-span-1"></div>
        <div class="w-auto col-span-6">
          <TradeNew
            v-bind:isMobile="isMobile"
            @closeNewTradeSection="cancelInsertTrade"/>
        </div>
      </div>
      <div
        v-for="(trade, q) in trades"
        v-bind:key="q">
        <div class="flex flex-row justify-around mx-1 mb-1 bg-subtradesection">
          <div
            class="flex flex-col justify-center"
            @click="toggle(trade.Code)">
            <div>
              <img
                :src="trade.FirstPairUrlIcon"
                height="20"
                width="20"/>
            </div>
            <div>
              <img
                :src="trade.SecondPairUrlIcon"
                height="20"
                width="20"/>
            </div>
          </div>
          <div
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <div class="text-gray-500 text-xxs">
              Price
            </div>
            <div class="text-xs">
              {{ trade.CurrentPrice }}
            </div>
            <div class="text-xxs">
              {{ trade.FirstPairSymbol }}/{{ trade.SecondPairSymbol }}
            </div>
          </div>
          <div
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <div class="text-gray-500 text-xxs">
              QtyAvailable
            </div>
            <div class="text-xs">
              {{ trade.QtyAvailable }}
            </div>
            <div class="text-xxs">
              {{ trade.SecondPairSymbol }}
            </div>
          </div>
          <div
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <div class="text-gray-500 text-xxs">
              Return
            </div>
            <div class="text-xs">
              {{ trade.TotalReturn }}
            </div>
            <div class="text-xxs">
              {{ trade.FirstPairSymbol }}
            </div>
          </div>
          <div
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <span
              class="text-sm"
              :class="trade.Roi > 0 ? 'text-tradepositive' : 'text-tradenegative'">
              {{ trade.Roi }}%
            </span>
          </div>
          <div
            class="flex flex-col justify-center p-1 text-center col-span-2"
            v-if="isUserConnected && isUserProfile">
            <div class="flex flex-col">
              <button
                @click="deleteTrade(trade)"
                class="transform scale-50"
                title="Delete trade"
                type="button">
                <DeleteTrade/>
              </button>
            </div>
          </div>
        </div>
        <div
          :key="'B' + q"
          v-if="opened.includes(trade.Code)">
          <div
            class="mx-10 mb-3 bg-red-100 text-xxs bg-subtradesection"
            v-for="(subtrade, i) in trade.Subtrades"
            :key="i">
            <div class="flex justify-center">
              <div class="flex flex-col">
                <label class="text-center text-gray-400 text-xxs">CreatedAt</label>
                <input
                  :disabled="!isUserConnected || !isUserProfile"
                  name="formTimestamp" 
                  placeholder="Timestamp"
                  type="datetime-local"
                  class="mr-1 text-center border-b w-30 bg-subtradeeditable border-subtradeeditableborder"
                  v-model="subtrade.CreatedAt"
                  @change="updateSubtrade(subtrade)">
                </div>
              <div class="flex flex-col">
                <label class="text-center text-gray-400 text-xxs">Reason / Description</label>
                <input
                  :disabled="!isUserConnected || !isUserProfile"
                  name="formReason" 
                  placeholder="Insert a reason" 
                  type="text"
                  class="text-center border-b bg-subtradeeditable border-subtradeeditableborder"
                  v-model="subtrade.Reason"
                  @change="updateSubtrade(subtrade)">
              </div>
            </div>
            <div class="flex justify-center">
              <div class="flex flex-col">
                <label class="text-center text-gray-400 text-xxs">Type</label>
                <select
                  :disabled="!isUserConnected || !isUserProfile"
                  name="formType" 
                  class="mr-1 text-center border-b bg-subtradeeditable border-subtradeeditableborder"
                  v-model="subtrade.Type"
                  @change="updateSubtrade(subtrade)">
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </select>
              </div>
              <div class="flex flex-col">
                <label class="text-center text-gray-400 text-xxs">Quantity</label>
                <input 
                  :disabled="!isUserConnected || !isUserProfile"
                  min="0.00000000001"
                  name="formQuantity" 
                  placeholder="Quantity"
                  type="number"
                  step="any"
                  class="w-10 mr-1 text-center border-b bg-subtradeeditable border-subtradeeditableborder"
                  v-model.number="subtrade.Quantity"
                  @change="updateSubtrade(subtrade)">
              </div>
              <div class="flex flex-col">
                <label class="text-center text-gray-400 text-xxs">Avg Price</label>
                <input 
                  :disabled="!isUserConnected || !isUserProfile"
                  min="0.00000000001"
                  name="formAvgPrice" 
                  placeholder="Avg Price"
                  type="number"
                  step="any"
                  class="w-20 mr-1 text-center border-b bg-subtradeeditable col-span-1 border-subtradeeditableborder"
                  v-model.number="subtrade.AvgPrice"
                  @change="updateSubtrade(subtrade)">
              </div>
              <div class="flex flex-col">
                <label class="text-center text-gray-400 text-xxs">Total</label>
                <input 
                  :disabled="!isUserConnected || !isUserProfile"
                  min="0.00000000001"
                  name="formTotal" 
                  placeholder="Total"
                  type="number"
                  step="any"
                  class="w-20 mr-1 text-center border-b bg-subtradeeditable col-span-1 border-subtradeeditableborder"
                  v-model.number="subtrade.Total"
                  @change="updateSubtrade(subtrade)">
              </div>
            </div>
            <div
              class="flex flex-row items-center justify-center mt-1"
              v-if="isUserConnected && isUserProfile">
              <div
                class="flex flex-row items-center justify-center"
                v-if="trade.Subtrades.length > 1">
                <button
                  @click="removeSubtrade(subtrade)"
                  title="Remove subtrade"
                  type="button">
                  <RemoveSubtradeOpen class="transform scale-75"/>
                </button>
              </div>
              <div
                class="flex flex-row items-center justify-center"
                v-if="i == (trade.Subtrades.length - 1)">
                <button
                  @click="insertSubtrade(trade)"
                  title="Insert subtrade"
                  type="button">
                  <AddSubtradeOpen class="transform scale-75"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import axios from "axios";
  import TradeNew from '@/components/trades/TradeNew.vue';
  import InsertTrade from '@/components/svg/InsertTrade.vue';
  import ExpandTrade from '@/components/svg/ExpandTrade.vue';
  import CollapseTrade from '@/components/svg/CollapseTrade.vue';
  import CloseTrade from '@/components/svg/CloseTrade.vue';
  import OpenTrade from '@/components/svg/OpenTrade.vue';
  import DeleteTrade from '@/components/svg/DeleteTrade.vue';
  import AddSubtradeOpen from '@/components/svg/AddSubtradeOpen.vue';
  import RemoveSubtradeOpen from '@/components/svg/RemoveSubtradeOpen.vue';
  @Component({
    components: {
      TradeNew,
      InsertTrade,
      ExpandTrade,
      CollapseTrade,
      CloseTrade,
      OpenTrade,
      DeleteTrade,
      AddSubtradeOpen,
      RemoveSubtradeOpen
    }
  })
  export default class TradeOpen extends Vue {
    opened: number[] = [];
    isNewTrade: boolean = false;
    @Prop() isMobile!: boolean;
    @Prop() isUserConnected!: boolean;
    @Prop() trades!: object[];
    @Prop() isUserProfile!: boolean;
    validateSubtrade(subtrade: object) {
      var m = '';
      if (!subtrade['Quantity'] || subtrade['Quantity'] <= 0) m = "Wrong Quantity";
      if (!subtrade['AvgPrice'] || subtrade['AvgPrice'] <= 0) m = "Wrong AvgPrice";
      if (!subtrade['Total'] || subtrade['Total'] <= 0) m = "Wrong Total in subtrade";
      if (!subtrade['Reason']) m = "Reason missing in subtrade";
      if (!subtrade['Type']) m = "Type missing in subtrade";
      if (!subtrade['CreatedAt']) m = "Wrong Timestamp in subtrade";
      return m;
    }
    updateSubtrade(subtrade: object) {
      var validateMessage = this.validateSubtrade(subtrade);
      if (validateMessage == '') {
        let request_url = [
          process.env.VUE_APP_HTTP_URL,
          'update_subtrade'
        ].join('/');
        axios({
          method: "POST",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: request_url,
          data: subtrade
        }).catch(function (error) {
          console.log(error);
        })
      } else {
        alert("Please check the following errors:\n" + validateMessage);
      }
    }
    deleteTrade(trade: object) {
      var answer = window.confirm("Are you sure deleting this trade?");
      if (answer) {
        let request_url = [
          process.env.VUE_APP_HTTP_URL,
          'delete_trade',
          trade['Code']
        ].join('/');
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: request_url
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
    insertSubtrade(trade: object) {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'insert_subtrade',
        trade['Code']
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url
      }).catch(function (error) {
        console.log(error);
      })
    }
    removeSubtrade(subtrade: object) {
      var answer = window.confirm("Are you sure deleting this subtrade?");
      if (answer) {
        let request_url = [
          process.env.VUE_APP_HTTP_URL,
          'delete_subtrade',
          subtrade['Code']
        ].join('/');
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: request_url
        }).catch(function (error) {
          console.log(error);
        })
      }
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

<style>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  input[type="date"]::-webkit-inner-spin-button,    
  input[type="date"]::-webkit-clear-button { display: none; }
</style>
