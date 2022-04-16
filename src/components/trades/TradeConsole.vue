<template>
  <div>
    <div v-if="!isMobile">
      <div
        v-if="isUserConnected && isUserProfile && isNewTrade"
        class="flex justify-center mt-5 mb-5">
        <TradeNew
          v-bind:isMobile="isMobile"
          @closeNewTradeSection="cancelInsertTrade"/>
      </div>
      <div class="flex justify-center my-10">
        <table>
          <thead class="tracking-wider text-cream xs:text-xs sm:text-base bg-oldpurple">
            <tr>
              <th 
                v-if="isUserProfile || visibility.SubtradesAll"
                class="px-1"
                scope="col">
              </th>
              <th
                class="py-3 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Exchange
              </th>
              <th
                class="py-3 lg:px-6 md:px-3 sm:px-1"
                scope="col">
                First Pair
              </th>
              <th
                class="py-3 lg:px-6 md:px-3 sm:px-1"
                scope="col">
                Second Pair
              </th>
              <th
                class="py-3 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Current Price
              </th>
              <th
                v-if="isUserProfile || visibility.TradeQtyAvailable"
                class="py-3 lg:px-8 md:px-4 sm:px-2"
                scope="col">
                Qty Available
              </th>
              <th
                v-if="isUserProfile || visibility.TradeValue"
                class="py-3 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                $ Value
              </th>
              <th
                v-if="isUserProfile || visibility.TradeReturn"
                class="py-3 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Return
              </th>
              <th
                v-if="isUserProfile || visibility.TradeRoi"
                class="py-3 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                ROI
              </th>
              <th
                v-if="isUserConnected && isUserProfile"
                class="py-3 lg:px-12 md:px-6 sm:px-3"
                scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="">
            <template v-for="(trade, q) in trades">
              <tr
                :key="'A' + q"
                class="h-16 text-xl font-medium tracking-wide text-center text-cream">
                <td
                  v-if="isUserProfile || visibility.SubtradesAll"
                  class="text-gray-700">
                  <button
                    @click="toggle(trade.Code)"
                    title="Expand/Collapse trade"
                    type="button">
                    <ExpandTrade v-if="opened.includes(trade.Code)"/>
                    <CollapseTrade v-else/>
                  </button>
                </td>
                <td class="">
                  {{ trade.Exchange }}
                </td>
                <td class="">
                  <img
                    :src="trade.FirstPairUrlIcon"
                    height="30"
                    width="30"
                    class="inline-block align-middle"
                    alt="first crypto icon">
                  {{ trade.FirstPairSymbol }}
                </td>
                <td class="">
                  <img
                    :src="trade.SecondPairUrlIcon"
                    height="30"
                    width="30"
                    class="inline-block align-middle"
                    alt="second crypto icon">
                  {{ trade.SecondPairSymbol }}
                </td>
                <td
                  class=""
                  v-bind:id="trade.Code">
                  {{ trade.CurrentPrice }}
                  <span class="text-xs">
                    {{ trade.FirstPairSymbol }} / {{ trade.SecondPairSymbol }}
                  </span>
                </td>
                <td
                  v-if="isUserProfile || visibility.TradeQtyAvailable"
                  class="">
                  {{ trade.QtyAvailable }}
                  <span class="text-xs">
                    {{ trade.SecondPairSymbol }}
                  </span>
                </td>
                <td
                  v-if="isUserProfile || visibility.TradeValue"
                  class="">
                  {{ trade.TotalValueUsdS }}
                  <span class="text-xs">
                    USD
                  </span>
                </td>
                <td
                  v-if="isUserProfile || visibility.TradeReturn"
                  class="">
                  {{ trade.TotalReturnS }}
                  <span class="text-xs">
                    {{ trade.FirstPairSymbol }}
                  </span>
                </td>
                <td
                  v-if="isUserProfile || visibility.TradeRoi"
                  class=""
                  :class="trade.Roi > 0 ? 'text-lagune' : 'text-dutchorange'">
                  {{ trade.Roi + "%" }}
                </td>
                <td
                  v-if="isUserConnected && isUserProfile"
                  class="">
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
                class="bg-universe">
                <td 
                  v-if="isUserProfile || visibility.SubtradesAll"
                  colspan="18"
                  class=""> 
                  <div class="flex justify-around">
                    <table>
                      <thead class="text-lg tracking-wide text-cream bg-sandpurple">
                        <th class="">
                          Id
                        </th>
                       <th class="">
                          Timestamp
                        </th>
                        <th class="">
                          Type
                        </th>
                        <th
                          v-if="isUserProfile || visibility.SubtradeReasons"
                          class="">
                          Reason
                        </th>
                        <th
                          v-if="isUserProfile || visibility.SubtradeQuantity"
                          class="">
                          Quantity
                        </th>
                        <th
                          v-if="isUserProfile || visibility.SubtradeAvgPrice"
                          class="">
                          Avg Price
                        </th>
                        <th
                          v-if="isUserProfile || visibility.SubtradeTotal"
                          class="">
                          Total
                        </th>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(subtrade, i) in trade.Subtrades"
                          :key="i"
                          class="h-10 bg-deepmagenta">
                          <td class="bg-deepmagenta">
                            <div class="h-5 mx-4 text-cream">
                              {{ i + 1}}
                            </div>
                          </td>
                          <td>
                            <div class="mx-3 border-b border-magentashine">
                              <input
                                :disabled="!isUserConnected || !isUserProfile"
                                name="formTimestamp" 
                                placeholder="Timestamp"
                                type="datetime-local"
                                class="w-full h-5 text-center text-cream bg-deepmagenta"
                                v-model="subtrade.CreatedAt"
                                @change="updateSubtrade(subtrade)">
                              </div>
                          </td>
                          <td>
                            <div class="mx-3 border-b border-magentashine">
                              <select
                                :disabled="!isUserConnected || !isUserProfile"
                                name="formType" 
                                class="h-5 text-center text-cream bg-deepmagenta"
                                v-model="subtrade.Type"
                                @change="updateSubtrade(subtrade)">
                                <option value="BUY">BUY</option>
                                <option value="SELL">SELL</option>
                              </select>
                            </div>
                          </td>
                          <td v-if="isUserProfile || visibility.SubtradeReasons">
                            <div class="mx-3 border-b border-magentashine">
                              <input
                                :disabled="!isUserConnected || !isUserProfile"
                                name="formReason" 
                                placeholder="Insert a reason" 
                                type="text"
                                class="h-5 text-center text-cream bg-deepmagenta"
                                v-model="subtrade.Reason"
                                @change="updateSubtrade(subtrade)">
                            </div>
                          </td>
                          <td v-if="isUserProfile || visibility.SubtradeQuantity">
                            <div class="mx-3 border-b border-magentashine">
                              <input 
                                :disabled="!isUserConnected || !isUserProfile"
                                min="0.00000000001"
                                name="formQuantity" 
                                placeholder="Quantity"
                                type="number"
                                step="any"
                                class="h-5 text-center text-cream bg-deepmagenta"
                                v-model.number="subtrade.Quantity"
                                @change="updateSubtrade(subtrade)">
                            </div>
                          </td>
                          <td v-if="isUserProfile || visibility.SubtradeAvgPrice">
                            <div class="mx-3 border-b border-magentashine">
                              <input
                                :disabled="!isUserConnected || !isUserProfile"
                                min="0.00000000001"
                                name="formAvgPrice" 
                                placeholder="Avg Price"
                                type="number"
                                step="any"
                                class="h-5 text-center text-cream bg-deepmagenta"
                                v-model.number="subtrade.AvgPrice"
                                @change="updateSubtrade(subtrade)">
                            </div>
                          </td>
                          <td v-if="isUserProfile || visibility.SubtradeTotal">
                            <div class="mx-3 border-b border-magentashine">
                              <input
                                :disabled="!isUserConnected || !isUserProfile"
                                min="0.00000000001"
                                name="formTotal" 
                                placeholder="Total"
                                type="number"
                                step="any"
                                class="h-5 text-center text-cream bg-deepmagenta"
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
                                  <RemoveSubtradeOpen class="text-red-800 fill-current"/>
                                </button>
                              </div>
                              <div
                                class="flex justify-start mx-3"
                                v-if="i == (trade.Subtrades.length - 1)">
                                <button
                                  @click="insertSubtrade(trade)"
                                  title="Insert subtrade"
                                  type="button">
                                  <AddSubtradeOpen class="text-green-800 fill-current"/>
                                </button>
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
      <div 
        v-if="isUserConnected && isUserProfile || isNewTrade"
        class="flex justify-center bg-universe text-cream">
        <button
          @click="insertTrade()"
          title="Insert a new trade"
          class="p-1 ml-4 text-6xl text-gray-400 rounded hover:text-gray-800">
          <InsertTrade class="text-gray-200 stroke-current stroke-2"/>
        </button>
      </div>
    </div>
    <div v-else class="text-cream">
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
        <div class="flex flex-row justify-around mx-1 mt-5 mb-1 bg-universe">
          <div
            class="flex flex-col justify-center"
            @click="toggle(trade.Code)">
            <div>
              <img
                :src="trade.FirstPairUrlIcon"
                height="20"
                width="20"
                alt="first crypto icon">
            </div>
            <div>
              <img
                :src="trade.SecondPairUrlIcon"
                height="20"
                width="20"
                alt="second crypto icon">
            </div>
          </div>
          <div
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <div class="text-xxs">
              Price
            </div>
            <div class="text-xs font-medium">
              {{ trade.CurrentPrice }}
            </div>
            <div class="text-xxs">
              {{ trade.FirstPairSymbol }}/{{ trade.SecondPairSymbol }}
            </div>
          </div>
          <div
            v-if="isUserProfile || visibility.TradeQtyAvailable"
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <div class="text-xxs">
              QtyAvailable
            </div>
            <div class="text-xs font-medium">
              {{ trade.QtyAvailable }}
            </div>
            <div class="text-xxs">
              {{ trade.SecondPairSymbol }}
            </div>
          </div>
          <div
            v-if="isUserProfile || visibility.TradeReturn"
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <div class="text-xxs">
              Return
            </div>
            <div class="text-xs font-medium">
              {{ trade.TotalReturnS }}
            </div>
            <div class="text-xxs">
              {{ trade.FirstPairSymbol }}
            </div>
          </div>
          <div
            v-if="isUserProfile || visibility.TradeRoi"
            class="flex flex-col justify-center p-1 text-center"
            @click="toggle(trade.Code)">
            <span
              class="font-medium"
              :class="trade.Roi > 0 ? 'text-lagune' : 'text-dutchorange'">
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
          <div v-if="isUserProfile || visibility.SubtradesAll">
            <div
              class="pb-2 mx-10 mb-3 text-xxs bg-sandpurple"
              v-for="(subtrade, i) in trade.Subtrades"
              :key="i">
              <div class="flex justify-center">
                <div class="flex flex-col">
                  <label class="text-center text-xxs">CreatedAt</label>
                  <input
                    :disabled="!isUserConnected || !isUserProfile"
                    name="formTimestamp" 
                    placeholder="Timestamp"
                    type="datetime-local"
                    class="h-4 mr-1 text-center border-b text-cream w-30 bg-deepmagenta border-magentashine"
                    v-model="subtrade.CreatedAt"
                    @change="updateSubtrade(subtrade)">
                  </div>
                <div
                  v-if="isUserProfile || visibility.SubtradeReasons"
                  class="flex flex-col">
                  <label class="text-center text-xxs">Reason</label>
                  <input
                    :disabled="!isUserConnected || !isUserProfile"
                    name="formReason" 
                    placeholder="Insert a reason" 
                    type="text"
                    class="h-4 text-center border-b text-cream bg-deepmagenta border-magentashine"
                    v-model="subtrade.Reason"
                    @change="updateSubtrade(subtrade)">
                </div>
              </div>
              <div class="flex justify-center">
                <div class="flex flex-col">
                  <label class="text-center text-xxs">Type</label>
                  <select
                    :disabled="!isUserConnected || !isUserProfile"
                    name="formType" 
                    class="h-4 mr-1 text-center border-b text-cream bg-deepmagenta border-magentashine"
                    v-model="subtrade.Type"
                    @change="updateSubtrade(subtrade)">
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>
                <div
                  v-if="isUserProfile || visibility.SubtradeQuantity"
                  class="flex flex-col">
                  <label class="text-center text-xxs">Quantity</label>
                  <input 
                    :disabled="!isUserConnected || !isUserProfile"
                    min="0.00000000001"
                    name="formQuantity" 
                    placeholder="Quantity"
                    type="number"
                    step="any"
                    class="w-10 h-4 mr-1 text-center border-b text-cream bg-deepmagenta border-magentashine"
                    v-model.number="subtrade.Quantity"
                    @change="updateSubtrade(subtrade)">
                </div>
                <div
                  v-if="isUserProfile || visibility.SubtradeAvgPrice"
                  class="flex flex-col">
                  <label class="text-center text-xxs">Avg Price</label>
                  <input 
                    :disabled="!isUserConnected || !isUserProfile"
                    min="0.00000000001"
                    name="formAvgPrice" 
                    placeholder="Avg Price"
                    type="number"
                    step="any"
                    class="w-20 h-4 mr-1 text-center border-b text-cream col-span-1 bg-deepmagenta border-magentashine"
                    v-model.number="subtrade.AvgPrice"
                    @change="updateSubtrade(subtrade)">
                </div>
                <div 
                  class="flex flex-col"
                  v-if="isUserProfile || visibility.SubtradeTotal">
                  <label class="text-center text-xxs">Total</label>
                  <input 
                    :disabled="!isUserConnected || !isUserProfile"
                    min="0.00000000001"
                    name="formTotal" 
                    placeholder="Total"
                    type="number"
                    step="any"
                    class="w-20 h-4 mr-1 text-center border-b text-cream col-span-1 bg-deepmagenta border-magentashine"
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
      <div class="flex justify-center mt-4 mb-2 text-cream">
        <div v-if="isUserConnected && isUserProfile || isNewTrade">
          <button
            @click="insertTrade()"
            title="Insert a new trade"
            class="p-1 ml-1 text-6xl text-gray-400 rounded hover:text-gray-800">
            <InsertTrade class="text-gray-200 stroke-current transform scale-75 stroke-2"/>
          </button>
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
    @Prop() visibility!: object;
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
