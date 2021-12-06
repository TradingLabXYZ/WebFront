<template>
  <div>
    <div class="h-20 bg-white">
      <div class="flex justify-center p-8">
        <div class="text-2xl font-bold">
          Opened Trades
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
        <TradeNew @closeNewTradeSection="cancelInsertTrade"/>
      </div>
    </div>
    <div class="mb-10 grid place-items-center">
      <table class="block md:table">
        <thead class="block md:table-header-group bg-tradetablehead">
          <tr class="absolute block md:table-row -top-full md:top-auto -left-full md:left-auto md:relative ">
            <th 
              class="px-1 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
            </th>
            <th
              class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              Exchange
            </th>
            <th
              class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              First Pair
            </th>
            <th
              class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              Second Pair
            </th>
            <th
              class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              Current Price
            </th>
            <th
              class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              Qty Available
            </th>
            <th
              class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              Return
            </th>
            <th
              class="px-12 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              ROI
            </th>
            <th
              v-if="isUserConnected && isUserProfile"
              class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800"
              scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="block md:table-row-group">
          <template v-for="(trade, q) in openedTrades">
            <tr :key="'A' + q" class="block md:table-row">
              <td class="block p-2 text-left md:table-cell">
                <button
                  @click="toggle(trade.Code)"
                  class="xs:hidden md:block"
                  title="Expand/Collapse trade"
                  type="button">
                  <ExpandTrade v-if="opened.includes(trade.Code)"/>
                  <CollapseTrade v-else/>
                </button>
              </td>
              <td class="block p-2 text-left md:table-cell">
                <span class="inline-block w-1/3 font-bold md:hidden">
                  Exchange
                </span>
                {{ trade.Exchange }}
              </td>
              <td class="block p-2 text-left md:table-cell">
                <span class="inline-block w-1/3 font-bold md:hidden">
                  First Pair
                </span>
                <img
                  :src="trade.FirstPairUrlIcon"
                  width="15%"
                  class="inline-block align-middle"/>
                {{ trade.FirstPairSymbol }}
              </td>
              <td class="block p-2 text-left md:table-cell">
                <span class="inline-block w-1/3 font-bold md:hidden">
                  Second Pair
                </span>
                <img
                  :src="trade.SecondPairUrlIcon"
                  width="15%"
                  class="inline-block align-middle"/>
                {{ trade.SecondPairSymbol }}
              </td>
              <td class="block p-2 text-left md:table-cell">
                <span class="inline-block w-1/3 font-bold md:hidden">
                  Current Price
                </span>
                {{ trade.CurrentPrice }}
                <span class="text-xs">
                  {{ trade.FirstPairSymbol }} / {{ trade.SecondPairSymbol }}
                </span>
              </td>
              <td class="block p-2 text-left md:table-cell">
                <span class="inline-block w-1/3 font-bold md:hidden">
                  Qty Available
                </span>
                {{ trade.QtyAvailable }}
                <span class="text-xs">
                  {{ trade.SecondPairSymbol }}
                </span>
              </td>
              <td class="block p-2 text-left md:table-cell">
                <span class="inline-block w-1/3 font-bold md:hidden">
                  Total Return
                </span>
                {{ trade.TotalReturn }}
                <span class="text-xs">
                  {{ trade.FirstPairSymbol }}
                </span>
              </td>
              <td class="block p-2 text-left md:table-cell">
                <span class="inline-block w-1/3 font-bold md:hidden">
                  ROI
                </span>
                {{ trade.Roi + "%" }}
              </td>
              <td class="block p-2 text-left md:table-cell"
                v-if="isUserConnected && isUserProfile">
                <button
                  v-if="isUserConnected && isUserProfile"
                  @click="closeTrade(trade)"
                  class="m-2"
                  title="Close trade"
                  type="button">
                  <CloseTrade/>
                </button>
                <button
                  v-if="isUserConnected && isUserProfile"
                  @click="deleteTrade(trade)"
                  class="m-2"
                  title="Delete trade"
                  type="button">
                  <DeleteTrade/>
                </button>
              </td>
              <td class="block p-2 text-left md:table-cell">
                <button
                  @click="toggle(trade.Code)"
                  class="md:hidden"
                  title="Expand/Collapse trade"
                  type="button">
                  <ExpandTrade v-if="opened.includes(trade.Code)"/>
                  <CollapseTrade v-else/>
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
                  <table class="block md:table">
                    <thead class="block md:table-header-group bg-tradetablehead">
                      <tr class="absolute block md:table-row -top-full md:top-auto -left-full md:left-auto md:relative ">
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="block md:table-row"
                        v-for="(subtrade, i) in trade.Subtrades"
                        :key="i">
                        <td class="block p-2 text-left md:table-cell">
                          <span class="inline-block w-1/3 font-bold md:hidden">
                            Id 
                          </span>
                          <div class="mx-8">
                            {{ i + 1}}
                          </div>
                        </td>
                        <td class="block p-2 text-left md:table-cell">
                          <span class="inline-block w-1/3 font-bold md:hidden">
                            CreatedAt
                          </span>
                          <div class="w-40 mx-3 border-b border-subtradeeditableborder">
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
                        <td class="block p-2 text-left md:table-cell">
                          <span class="inline-block w-1/3 font-bold md:hidden">
                            Type
                          </span>
                          <div class="mx-3 border-b border-subtradeeditableborder">
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
                        <td class="block p-2 text-left md:table-cell">
                          <span class="inline-block w-1/3 font-bold md:hidden">
                            Reason
                          </span>
                          <div class="mx-3 border-b border-subtradeeditableborder">
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
                        <td class="block p-2 text-left md:table-cell">
                          <span class="inline-block w-1/3 font-bold md:hidden">
                            Quantity
                          </span>
                          <div class="w-24 mx-3 border-b border-subtradeeditableborder">
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
                        <td class="block p-2 text-left md:table-cell">
                          <span class="inline-block w-1/3 font-bold md:hidden">
                            Avg Price
                          </span>
                          <div class="w-24 mx-3 border-b border-subtradeeditableborder">
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
                        <td class="block p-2 text-left md:table-cell">
                          <span class="inline-block w-1/3 font-bold md:hidden">
                            Total
                          </span>
                          <div class="w-24 mx-3 border-b border-subtradeeditableborder">
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
                        <td v-if="isUserConnected && isUserProfile" class="block p-2 text-left md:table-cell">
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
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import axios from "axios";
  import TradeNew from '@/components/trades/TradeNew.vue';
  import InsertTrade from '@/components/svg/InsertTrade.vue';
  import ExpandTrade from '@/components/svg/ExpandTrade.vue';
  import CollapseTrade from '@/components/svg/CollapseTrade.vue';
  import CloseTrade from '@/components/svg/CloseTrade.vue';
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
      DeleteTrade,
      AddSubtradeOpen,
      RemoveSubtradeOpen
    }
  })
  export default class TradeOpen extends Vue {
    opened: number[] = [];
    isNewTrade: boolean = false;
    @Prop() isUserConnected!: boolean;
    @Prop() openedTrades!: object[];
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
    closeTrade(trade: object) {
      var answer = window.confirm("Are you sure closing this trade?");
      if (answer) {
        let request_url = [
          process.env.VUE_APP_HTTP_URL,
          'change_trade',
          trade['Code'],
          'false'
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
