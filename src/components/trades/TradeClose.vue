<template>
  <div>
    <div class="h-20 bg-white grid grid-cols-5">
      <div class="col-span-1"></div>
      <div class="flex justify-start mt-8 md-8 col-span-2">
        <div class="text-2xl font-bold">
          Closed Trades
        </div>  
      </div>
    </div>
    <div class="mb-20 grid place-content-center">
      <table>
        <thead class="bg-tradetablehead">
          <tr>
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
        <tbody>
          <template v-for="(trade, q) in closedTrades"> 
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
              <td class="text-center text-gray-700 fpy-4 text-md">
                <img
                  :src="trade.FirstPairUrlIcon"
                  width="15%"
                  class="inline-block align-middle"/>
                {{ trade.FirstPairSymbol }}
              </td>
              <td class="text-center text-gray-700 fpy-4 text-md">
                <img
                  :src="trade.SecondPairUrlIcon"
                  width="15%"
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
              <td class="py-4 text-center text-gray-700 text-md">
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
                  @click="openTrade(trade)"
                  class="m-2"
                  title="Open trade"
                  type="button">
                  <OpenTrade/>
                </button>
              </td>
            </tr>
            <tr
              :key="'B' + q"
              v-if="opened.includes(trade.Code)"
              class="bg-subtradesection">
              <td colspan="10" class="text-xs"> 
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
                        class="border-b-2 border-blue-50"
                        :key="i">
                        <td class="mx-8">
                          {{ i + 1}}
                        </td>
                        <td class="w-40 mx-3 text-center bg-subtradesection">
                          {{ subtrade.CreatedAt }}
                        </td>
                        <td class="w-40 mx-3 text-center bg-subtradesection">
                          {{ subtrade.Type }}
                        </td>
                        <td class="w-40 mx-3 text-center bg-subtradesection">
                          {{ subtrade.Reason }}
                        </td>
                        <td class="w-40 mx-3 text-center bg-subtradesection">
                          {{ subtrade.Quantity }}
                        </td>
                        <td class="w-40 mx-3 text-center bg-subtradesection">
                          {{ subtrade.AvgPrice }}
                        </td>
                        <td class="w-40 mx-3 text-center bg-subtradesection">
                          {{ subtrade.Total }}
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
  import ExpandTrade from '@/components/svg/ExpandTrade.vue';
  import CollapseTrade from '@/components/svg/CollapseTrade.vue';
  import OpenTrade from '@/components/svg/OpenTrade.vue';
  @Component({
    components: {
      ExpandTrade,
      CollapseTrade,
      OpenTrade
    }
  })
  export default class TradeClose extends Vue {
    opened: number[] = [];
    @Prop() isUserConnected!: boolean;
    @Prop() closedTrades!: object[];
    @Prop() isUserProfile!: boolean;
    openTrade(trade: object) {
      var answer = window.confirm("Are you sure re-opening this trade?");
      if (answer) {
        let request_url = [
          process.env.VUE_APP_HTTP_URL,
          'change_trade',
          trade['Code'],
          'true'
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
