<template>
  <div>
    <Header/>
    <TradeHero
      v-bind:totalReturn="totalReturn"
      v-bind:roi="roi"
      v-bind:totalTrades="totalTrades"/>
    <TradeOpen
      v-bind:isUserConnected="isUserConnected"
      v-bind:openedTrades="openedTrades"
      v-bind:isUserProfile="isUserProfile"/>
    <TradeClose
      v-bind:isUserConnected="isUserConnected"
      v-bind:closedTrades="closedTrades"
      v-bind:isUserProfile="isUserProfile"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import User from '@/store/userModule';
  const userStore = getModule(User)
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  import Header from '@/components/Header.vue';
  import TradeHero from '@/components/trades/TradeHero.vue';
  import TradeOpen from '@/components/trades/TradeOpen.vue';
  import TradeClose from '@/components/trades/TradeClose.vue';

  @Component({
    components: {
      Header,
      TradeHero,
      TradeOpen,
      TradeClose
    },
  })
  export default class UserTrades extends Vue {
    isUserProfile: boolean = false;
    totalReturn: number = 0;
    roi: number = 0;
    openedTrades: object[] = [];
    closedTrades: object[] = [];
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    created() {
      let storeUsername = userStore.userDetails['Wallet'];
      let routeUsername = this.$route.params.wallet;
      if (storeUsername == routeUsername) {
        this.isUserProfile = true; 
      }
    }
    @Watch('$route', { immediate: true, deep: true })
    onUrlChange() {
      this.totalReturn = 0;
      this.roi = 0;
      this.openedTrades = [];
      this.closedTrades = [];
      this.initialiseTradesWs();
    }
    initialiseTradesWs() {
      let wallet = this.$route.params.wallet;
      let requestId = (Math.random() + 1).toString(36).substring(2);
      let ws_url = [
        process.env.VUE_APP_WS_URL,
        'get_trades',
        wallet,
        requestId
      ].join('/');
      let ws = new WebSocket(ws_url);
      ws.onmessage = (event: any) => {
        this.openedTrades = [];
        this.closedTrades = [];
        let ws_data = JSON.parse(event.data);
        this.totalReturn = ws_data.TotalReturnUsd;
        this.roi = ws_data.Roi;
        for (var i in ws_data.Trades) {
          let trade = ws_data.Trades[i];
          if (trade.IsOpen == "true") {
            this.openedTrades.push(trade);
          } else {
            this.closedTrades.push(trade);
          }
        }
      }
    }
    get totalTrades() {
      return this.openedTrades.length + this.closedTrades.length;
    }
  }
</script>

