<template>
  <div>
    <Header/>
    <TradeOpen v-bind:openedTrades="openedTrades"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/Header.vue';
  import TradeOpen from '@/components/trades/TradeOpen.vue';
  import User from '@/store/userModule';
  import { getModule } from 'vuex-module-decorators'
  const userStore = getModule(User)

  @Component({
    components: {
      Header,
      TradeOpen
    }
  })
  export default class UserTrades extends Vue {
    private openedTrades: object[] = [];
    private closedTrades: object[] = [];
    
    created() {
      this.initialiseTradesWs();
      let sessionId = userStore.userDetails['SessionId'];
      let username = userStore.userDetails['Username'];
      console.log(sessionId);
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
        let ws_data = JSON.parse(event.data);
        for (var i in ws_data['Trades']) {
          let trade = ws_data['Trades'][i];
          if (trade['IsOpen'] == "true") {
            this.openedTrades.push(trade);
          } else {
            this.closedTrades.push(trade);
          }
        }
      }
    }
  }
</script>

