<template>
  <div>
    <Header/>
    <TradeHero
      v-bind:totalReturn="totalReturn"
      v-bind:roi="roi"
      v-bind:totalTrades="totalTrades"/>
    <TradeOpen
      v-bind:openedTrades="openedTrades"
      v-bind:isUserProfile="isUserProfile"/>
    <TradeClose
      v-bind:closedTrades="closedTrades"
      v-bind:isUserProfile="isUserProfile"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import User from '@/store/userModule';
  import { getModule } from 'vuex-module-decorators'
  const userStore = getModule(User)
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
    }
  })
  export default class UserTrades extends Vue {
    private isUserProfile: boolean = false;
    private totalReturn: number = 0;
    private roi: number = 0;
    private openedTrades: object[] = [];
    private closedTrades: object[] = [];
    
    created() {
      this.initialiseTradesWs();
      let storeUsername = userStore.userDetails['Username'];
      let routeUsername = this.$route.params.username;
      if (storeUsername == routeUsername) {
        this.isUserProfile = true; 
      }
    }
    initialiseTradesWs() {
      let username = this.$route.params['username'];
      let requestId = (Math.random() + 1).toString(36).substring(2);
      let ws_url = [
        process.env.VUE_APP_WS_URL,
        'get_trades',
        username,
        requestId
      ].join('/');
      let ws = new WebSocket(ws_url);
      ws.onmessage = (event) => {
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

