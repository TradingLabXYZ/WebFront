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
  -H 'Access-Control-Allow-Origin: *' \
  -H 'Authorization: Bearer sessionId=API_TOKEN' \
  --compressed
            </code></pre>
          </div>
        </div>
        <div>
          <div class="mt-5 mb-2 font-medium text-left xs:text-xl sm:text-2xl">
            API Endpoints
          </div>
          <div class="">
            <div class="mt-3 mb-1 font-medium text-left xs:text-base sm:text-lg">
              Insert Trade
            </div>
            <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
              <p>Endpoint: <i>insert_trade</i></p>
              <p>Type: post</p>
              <p>Payload: dict</p>
              <p>Response: trade_code (string)</p>
            </div>
            <div>
              <div class="mt-3 mb-1 font-normal text-left xs:text-base sm:text-lg">
                Example paload:
              </div>
              <div>
                <pre><code class="language-javascript">
{
  "Exchange": "Binance",
  "FirstPair": 1,
  "SecondPair": 1027,
  "Subtrades": [
    {
      "CreatedAt": "2022-03-16T11:21",
      "Type": "BUY",
      "Reason": "Test",
      "AvgPrice": 0.06610740416574978,
      "Quantity": "10",
      "Total": 0.6610740416574978
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
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import Prism from "prismjs";
  import "prismjs/themes/prism-okaidia.css";
  @Component({
    components: {
      Header
    }
  })
  export default class Docs extends Vue {
    mounted() {
      (window as any).Prism = (window as any).Prism || {};
      (window as any).Prism.manual = true;
      Prism.highlightAll();
    }
  }
</script>
