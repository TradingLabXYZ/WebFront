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
  import Header from '@/components/header/Header.vue';
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
    totalTrades: number = 0;
    openedTrades: object[] = [];
    closedTrades: object[] = [];
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    created() {
      let storeWallet = userStore.userDetails['Wallet'];
      let routeWallet = this.$route.params.wallet;
      if (storeWallet == routeWallet) {
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
    generateRandomRequestId() {
      return (Math.random() + 1).toString(36).substring(2);
    }
    initialiseTradesWs() {
      let wallet = this.$route.params.wallet;
      let requestId = this.generateRandomRequestId();
      let ws_url = [
        process.env.VUE_APP_WS_URL,
        'get_trades',
        wallet,
        requestId
      ].join('/');
      let ws = new WebSocket(ws_url);
      ws.onmessage = (event: any) => {
        let ws_data = JSON.parse(event.data);
        this.totalReturn = ws_data.TotalReturnUsd;
        this.roi = ws_data.Roi;
        this.totalTrades = ws_data.CountTrades;
        this.openedTrades = [];
        this.closedTrades = [];
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
  }
</script>
