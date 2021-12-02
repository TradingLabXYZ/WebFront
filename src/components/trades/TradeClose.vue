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
      <table class="">
        <thead class="bg-tradetablehead">
          <tr>
            <th scope="col" class="px-1 text-xs font-medium tracking-wider text-gray-800"></th>
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
                <th v-if="isUserConnected && isUserProfile" scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-gray-800">
                Actions
              </th>          
          </tr>
        </thead>
        <tbody class="">
          <template v-for="(trade, q) in closedTrades"> 
            <tr :key="'A' + q">
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
                {{ trade.Exchange }}
              </td>
              <td class="text-center text-gray-700 fpy-4 text-md">
                <img :src="trade.FirstPairUrlIcon" width="15%" class="inline-block align-middle"/> {{ trade.FirstPairSymbol }}
              </td>
              <td class="text-center text-gray-700 fpy-4 text-md">
                <img :src="trade.SecondPairUrlIcon" width="15%" class="inline-block align-middle"/> {{ trade.SecondPairSymbol }}
              </td>
              <td class="py-4 text-center text-gray-700 text-md text-fade-effect" v-bind:id="trade.Id">
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
              <td class="py-4 text-center text-gray-700 text-md" :class="trade.Roi > 0 ? 'text-tradepositive' : 'text-tradenegative'">
                {{ trade.Roi + "%" }}
              </td>
              <td v-if="isUserConnected && isUserProfile" class="py-4 text-center text-gray-700 text-md">
                <button
                  v-if="isUserConnected && isUserProfile"
                  @click="openTrade(trade)"
                  class="m-2"
                  title="Close trade"
                  type="button">
                  <svg width="18" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7.56" cy="7.56" r="6.81" stroke="#B1ADAD" sroke-width="1.5"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.143 10.313 18 2.16 16.537.57 7.614 8.785 1.527 2.698 0 4.225l7.637 7.637 1.527-1.527-.021-.022Z" fill="#00BED5"/>
                  </svg>
                </button>
              </td>
            </tr>
            <tr :key="'B' + q" v-if="opened.includes(trade.Id)" class="bg-subtradesection">
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
                      <tr v-for="(subtrade, i) in trade.Subtrades" class="border-b-2 border-blue-50" :key="i">
                        <td class="mx-8">
                          {{ i + 1}}
                        </td>
                        <td class="w-40 mx-3 text-center bg-subtradesection">
                          {{ subtrade.Timestamp }}
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

  @Component({})
  export default class TradeClose extends Vue {
    opened: number[] = [];
    @Prop() isUserConnected!: boolean;
    @Prop() closedTrades!: object[];
    @Prop() isUserProfile!: boolean;
    openTrade(trade: object) {
      var answer = window.confirm("Are you sure re-opening this trade?");
      if (answer) {
        axios({
          method: "GET",
          headers: {
            Authorization: "Bearer " + document.cookie,
            "Access-Control-Allow-Origin": "*",
          },
          url: process.env.VUE_APP_HTTP_URL + "/change_trade/" + trade['Code'] + "/true",
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
