<template>
  <div class="min-h-screen bg-universe text-cream">
    <Header/>
    <div class="flex flex-col mx-auto xs:w-5/6 sm:w-1/2">
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
              -H 'Authorization: Bearer sessionId={API_TOKEN}'
          </code></pre>
        </div>
      </div>
      <div>
        <div class="mt-5 mb-2 font-medium text-left xs:text-xl sm:text-2xl space-y-5">
          API Endpoints
        </div>
        <div
          v-for="endpoint in endpoints"
          :key="endpoint.name"
          class="p-5 m-5 rounded bg-sandpurple rounded-md">
          <div
            @click="toggle(endpoint)"
            class="flex flex-row my-1 font-medium font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
            <div v-if="!endpoint.toggle" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
              +
            </div>
            <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded rounded-full">
              -
            </div>
            <div>
              {{ endpoint.name }}
            </div>
          </div>
          <div v-if="endpoint.toggle" class="mt-4">
            {{ endpoint.description }}
            <div
              class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
              <p><b>Endpoint</b>: {{ endpoint.endpoint }} </p>
              <p><b>Type</b>: {{ endpoint.type }} </p>
              <p><b>Response</b>: {{ endpoint.response }} </p>
            </div>
            <div class="space-y-4">
              <div v-if="endpoint.example_payload != ''">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example payload:
                </div>
                <div>
                  <pre><code class="language-javascript">
                    {{ endpoint.example_payload }}
                  </code></pre>
                </div>
              </div>
              <div v-if="endpoint.example_response != ''">
                <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                  Example response:
                </div>
                <div>
                  <pre><code class="language-javascript">
                    {{ endpoint.example_response }}
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
    example_response_get_snapshot = `
      {
       "UserDetails": {
          "Username": "TestUsername",
          "Twitter": "TestTwitter",
          "Github":"TestGithub",
          "Discord": "TestDiscord",
          "Followers": 12,
          "Followings": 24,
          "ProfilePicture": "default_picture.png",
          "JoinTime": "March2022"
       },
       "Trades": [
          {
             "Code": "dd034a10362",
             "Username": "TestUsername",
             "Userwallet": "0x7c299b2cf7A918BD6Ca3A0f6036F5466e18dA425",
             "Exchange": "Binance",
             "FirstPairId": 1,
             "SecondPairId": 1027,
             "FirstPairName": "Bitcoin",
             "SecondPairName": "Ethereum",
             "FirstPairSymbol": "BTC",
             "SecondPairSymbol": "ETH",
             "FirstPairPrice": 38895.68344802844,
             "SecondPairPrice": 2571.2926656195496,
             "FirstPairUrlIcon": "https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
             "SecondPairUrlIcon": "https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png",
             "CurrentPrice": ".06611",
             "QtyBuys": 10,
             "QtySells": 0,
             "QtyAvailable": "10",
             "TotalBuys": 0.6610740416574978,
             "TotalBuysBtc": 0.6610740416574978,
             "TotalBuysUsd": 25712.926660018802,
             "TotalSells": 0,
             "TotalSellsBtc": 0,
             "TotalSellsUsd": 0,
             "ActualReturn": -0.6610740416574978,
             "FutureReturn": 0.6610740415592015,
             "FutureReturnBtc": 0.6610740415592015,
             "FutureReturnUsd": 25712.926656195497,
             "TotalReturn": 0,
             "TotalReturnS": "0",
             "TotalReturnBtc": -9.82963731e-11,
             "TotalReturnUsd": -0.000003823304612186898,
             "TotalValueUsd": 25712.93,
             "TotalValueUsdS": "25,712.93",
             "Roi": 0,
             "BtcPrice": 38895.68344802844,
             "Subtrades": [
                {
                   "Code": "w4y6FqZCP5Oi",
                   "TradeCode": "dd034a10362",
                   "CreatedAt": "2022-03-16T11:21",
                   "Type": "BUY",
                   "Reason": "Test",
                   "Quantity": 10,
                   "AvgPrice": 0.066107,
                   "Total": 0.6610740416574978
                }
             ]
          }
       ],
       "CountTrades": 1,
       "TotalReturnUsd": "-0",
       "TotalReturnBtc": "-0",
       "Roi": -0,
       "TotalPortfolioUsd": "51,425.86"
    }`
    example_response_get_pairs = `
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
      }`
    example_payload_insert_trade = `
      {
        "Exchange": "Binance", //Optional
        "FirstPair": 1, // Mandatory
        "SecondPair": 1027, // Mandatory
        "Subtrades": [
          {
            "CreatedAt": "2022-03-16T11:21", // Mandatory
            "Type": "BUY", // Mandatory
            "Reason": "Test", // Optional
            "AvgPrice": 0.06610740416574978, // Mandatory
            "Quantity": "10", // Mandatory
            "Total": 0.6610740416574978 // Mandatory
          }
        ]
      }`
    example_payload_update_subtrade = `
      {
        "Code": "HDG2732", // Mandatory
        "CreatedAt": "2022-03-16T11:21", // Mandatory
        "Type": "BUY", // Mandatory
        "Reason": "Test", // Optional
        "AvgPrice": 0.06610740416574978, // Mandatory
        "Quantity": "10", // Mandatory
        "Total": 0.6610740416574978 // Mandatory
      }`
    endpoints = {
      get_pairs: {
        toggle: false,
        name: "Get Pairs",
        description: "Extract all the crypto codes available in TradingLab.",
        endpoint: "get_pairs",
        type: "get",
        response: "dict",
        example_payload: "",
        example_response: this.example_response_get_pairs
      },
      get_pair_ratio: {
        toggle: false,
        name: "Get Pair Ratio",
        description: "Given two crypto id, retrieve the latest price between them.",
        endpoint: "get_pair_ratio/{firstPairId}/{secondPairId}",
        type: "get",
        response: "float",
        example_payload: "",
        example_response: "12.112"
      },
      insert_trade: {
        toggle: false,
        name: "Insert Trade",
        description: "Insert a new trade into TradingLab, returning the trade code.",
        endpoint: "insert_trade",
        type: "post",
        response: "string",
        example_payload: this.example_payload_insert_trade,
        example_response: "GDHJChsj32"
      },
      delete_trade: {
        toggle: false,
        name: "Delete Trade",
        description: "Delete a trade passing its code.",
        endpoint: "delete_trade/{tradeCode}",
        type: "get",
        response: "int",
        example_payload: "",
        example_response: 200
      },
      list_trades: {
        toggle: false,
        name: "List Trades",
        description: "List all trades codes.",
        endpoint: "list_trades",
        type: "get",
        response: "[]string",
        example_payload: "",
        example_response: "['XChs7272', 'JDssCJ273', 'jd827tdz']"
      },
      insert_subtrade: {
        toggle: false,
        name: "Insert Subtrade",
        description: "Add an empty subtrade into an existing trade.",
        endpoint: "insert_subtrade/{tradeCode}",
        type: "get",
        response: "string",
        example_payload: "",
        example_response: "GDHJChsj32"
      },
      update_subtrade: {
        toggle: false,
        name: "Update Subtrade",
        description: "Update a subtrade passing its code.",
        endpoint: "update_subtrade",
        type: "post",
        response: "int",
        example_payload: this.example_payload_update_subtrade,
        example_response: 200
      },
      delete_subtrade: {
        toggle: false,
        name: "Delete Subtrade",
        description: "Delete a subtrade passing its code.",
        endpoint: "delete_subtrade",
        type: "get",
        response: "int",
        example_payload: "",
        example_response: 200
      },
      list_subtrades: {
        toggle: false,
        name: "List Subtrades",
        description: "Given a trade code, list all its subtrades codes.",
        endpoint: "list_subtrades/{tradeCode}",
        type: "get",
        response: "[]string",
        example_payload: "",
        example_response: "['LS9128gdg', 'HGFjs8267']"
      },
      get_snapshot: {
        toggle: false,
        name: "Get Snapshot",
        description: "Return the current snapshot of your crypto portfolio.",
        endpoint: "get_snapshot",
        type: "get",
        response: "dict",
        example_payload: "",
        example_response: this.example_response_get_snapshot
      }
    }
    created() {
      (window as any).Prism = (window as any).Prism || {};
      (window as any).Prism.manual = true;
      Prism.highlightAll();
    }
    mounted() {
      Prism.highlightAll();
    }
    updated() {
      Prism.highlightAll();
    }
    toggle(endpoint: object) {
      if (endpoint["toggle"]) {
        endpoint["toggle"] = false;
      } else {
        endpoint["toggle"] = true;
      }
    }
  }
</script>
