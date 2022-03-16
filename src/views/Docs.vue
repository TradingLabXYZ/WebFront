<template>
  <div class="">
    <Header/>
    <div class="max-h-screen grid grid-cols-3">
      <div class="col-span-1"></div>
      <div class="flex flex-col h-screen col-span-1">
        <div class="my-5 font-bold text-center xs:text-xl sm:text-2xl">
          API Docs
        </div>
        <div class="">
          It is possibile to interact with TradingLab programmatically using our API.<br>
          There are no limits to the use cases that can be built.<br>
          For example, automatically update a trade with realtime data from an exchange,
          or simply export all your data into a sheet.<br>
        </div>
        <div>
          <div class="mt-5 mb-2 font-medium text-left xs:text-xl sm:text-2xl">
            Generate API Token
          </div>
          <div class="">
            To retrieve a new API token, visit the <i>Settings</i> sections.
          </div>
        </div>
        <div>
          <div class="mt-5 mb-2 font-medium text-left xs:text-xl sm:text-2xl">
            Request template
          </div>
          <div class="">
            Add the API token in the header as Bearer Authentication as shown in the example below:
            <pre><code class="language-bash">
              curl 'API_ENDPOINT' \
                -H 'Access-Control-Allow-Origin: *'
                -H 'Authorization: Bearer sessionId=API_TOKEN'
            </code></pre>
          </div>
        </div>
        <div>
          <div class="mt-5 mb-2 font-medium text-left xs:text-xl sm:text-2xl space-y-5">
            API Endpoints
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_get_pairs"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_get_pairs" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                Get Pairs
              </div>
            </div>
            <div v-if="show_get_pairs" class="mt-4">
              Extract all the crypto codes available in TradingLab.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: get_pairs</p>
                <p><b>Type</b>: get</p>
                <p><b>Response</b>: dict</p>
              </div>
              <div class="space-y-4">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-javascript">
                    {
                      "1": {
                        "Symbol": "BTC",
                        "Name": "Bitcoin",
                        "Slug": "bitcoin"
                      },
                      "1027": {
                        "Symbol": "ETH",
                        "Name": "Ethereum",
                        "Slug":"ethereum"
                      },
                      ...
                    }
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_get_pair_ratio"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_get_pair_ratio" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                Get Pair Ratio
              </div>
            </div>
            <div v-if="show_get_pair_ratio" class="mt-4">
              Given two crypto id, retrive the latest price between them.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: get_pair_ratio/{firstPairId}/{secondPairId}</p>
                <p><b>Type</b>: get</p>
                <p><b>Response</b>: float</p>
              </div>
              <div class="space-y-4">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-bash">
                    12.112
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_insert_trade"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_insert_trade" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                Insert Trade
              </div>
            </div>
            <div v-if="show_insert_trade" class="mt-4">
              Insert a new trade into TradingLab, returning the trade code.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: insert_trade</p>
                <p><b>Type</b>: post</p>
                <p><b>Payload</b>: dict</p>
                <p><b>Response</b>: string</p>
              </div>
              <div class="space-y-4">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example payload:
                </div>
                <div>
                  <pre><code class="language-javascript">
                    {
                      "Exchange": "Binance", //Optional
                      "FirstPair": 1, // Mandatory
                      "SecondPair": 1027, // Mandatory
                      "Subtrades": [
                        {
                          "CreatedAt": "2022-03-16T11:21", // Optional
                          "Type": "BUY", // Mandatory
                          "Reason": "Test", // Optional
                          "AvgPrice": 0.06610740416574978, // Mandatory
                          "Quantity": "10", // Mandatory
                          "Total": 0.6610740416574978 // Mandatory
                        }
                      ]
                    }
                  </code></pre>
                </div>
              </div>
              <div>
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-bash">
                    XChsg268
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_delete_trade"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_delete_trade" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                Delete Trade
              </div>
            </div>
            <div v-if="show_delete_trade" class="mt-4">
              Delete a trade passing its code.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: delete_trade/{tradeCode}</p>
                <p><b>Type</b>: get</p>
                <p><b>Response</b>: int</p>
              </div>
              <div>
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-bash">
                    200
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_insert_subtrade"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_insert_subtrade" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                Insert Subtrade
              </div>
            </div>
            <div v-if="show_insert_subtrade" class="mt-4">
              Add an empty subtrade into an existing trade.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: insert_subtrade/{tradeCode}</p>
                <p><b>Type</b>: get</p>
                <p><b>Response</b>: string</p>
              </div>
              <div class="space-y-4">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-bash">
                    VXfag564
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_update_subtrade"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_update_subtrade" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                Update Subtrade
              </div>
            </div>
            <div v-if="show_update_subtrade" class="mt-4">
              Update a subtrade passing its code.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: update_subtrade</p>
                <p><b>Type</b>: post</p>
                <p><b>Payload</b>: dict</p>
                <p><b>Response</b>: int</p>
              </div>
              <div class="space-y-4">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example payload:
                </div>
                <div>
                  <pre><code class="language-javascript">
                    {
                      "Code": "HDG2732", // Mandatory
                      "CreatedAt": "2022-03-16T11:21", // Optional
                      "Type": "BUY", // Mandatory
                      "Reason": "Test", // Optional
                      "AvgPrice": 0.06610740416574978, // Mandatory
                      "Quantity": "10", // Mandatory
                      "Total": 0.6610740416574978 // Mandatory
                    }
                  </code></pre>
                </div>
              </div>
              <div>
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-bash">
                    200
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_delete_subtrade"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_delete_subtrade" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                Delete Subtrade
              </div>
            </div>
            <div v-if="show_delete_subtrade" class="mt-4">
              Delete a subtrade passing its code.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: delete_subtrade/{subtradeCode}</p>
                <p><b>Type</b>: get</p>
                <p><b>Response</b>: int</p>
              </div>
              <div>
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-bash">
                    200
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 m-5 bg-gray-300">
            <div
              @click="toggle_show_list_trades"
              class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
              <div v-if="!show_list_trades" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                +
              </div>
              <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
                -
              </div>
              <div>
                List Trades
              </div>
            </div>
            <div v-if="show_list_trades" class="mt-4">
              Return all the trade codes.
              <div
                class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                <p><b>Endpoint</b>: list_trades</p>
                <p><b>Type</b>: get</p>
                <p><b>Response</b>: []string</p>
              </div>
              <div class="space-y-4">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-javascript">
                    ["XChs7272", "JDssCJ273", "jd827tdz"]
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import Prism from "prismjs";
  import "prismjs/themes/prism-okaidia.css";
  require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
  @Component({
    components: {
      Header
    }
  })
  export default class Docs extends Vue {
    show_get_pairs = false;
    show_get_pair_ratio = false;
    show_insert_trade = false;
    show_delete_trade = false;
    show_insert_subtrade = false;
    show_update_subtrade = false;
    show_delete_subtrade = false;
    show_list_trades = false;
    mounted() {
      (window as any).Prism = (window as any).Prism || {};
      (window as any).Prism.manual = true;
      Prism.highlightAll();
    }
    updated() {
      Prism.highlightAll();
    }
    toggle_show_get_pairs() {
      if (this.show_get_pairs) {
        this.show_get_pairs = false;
      } else {
        this.show_get_pairs = true;
      }
    }
    toggle_show_get_pair_ratio() {
      if (this.show_get_pair_ratio) {
        this.show_get_pair_ratio = false;
      } else {
        this.show_get_pair_ratio = true;
      }
    }
    toggle_show_insert_trade() {
      if (this.show_insert_trade) {
        this.show_insert_trade = false;
      } else {
        this.show_insert_trade = true;
      }
    }
    toggle_show_delete_trade() {
      if (this.show_delete_trade) {
        this.show_delete_trade = false;
      } else {
        this.show_delete_trade = true;
      }
    }
    toggle_show_insert_subtrade() {
      if (this.show_insert_subtrade) {
        this.show_insert_subtrade = false;
      } else {
        this.show_insert_subtrade = true;
      }
    }
    toggle_show_update_subtrade() {
      if (this.show_update_subtrade) {
        this.show_update_subtrade = false;
      } else {
        this.show_update_subtrade = true;
      }
    }
    toggle_show_delete_subtrade() {
      if (this.show_delete_subtrade) {
        this.show_delete_subtrade = false;
      } else {
        this.show_delete_subtrade = true;
      }
    }
    toggle_show_list_trades() {
      if (this.show_list_trades) {
        this.show_list_trades = false;
      } else {
        this.show_list_trades = true;
      }
    }
  }
</script>
