<template>
  <div>
    <Header/>
    <TradeHero
      v-bind:isMobile="isMobile"
      v-bind:username="username"
      v-bind:twitter="twitter"
      v-bind:discord="discord"
      v-bind:github="github"
      v-bind:profilePicture="profilePicture"
      v-bind:followers="followers"
      v-bind:subscribers="subscribers"
      v-bind:joinTime="joinTime"
      v-bind:totalReturn="totalReturn"
      v-bind:roi="roi"
      v-bind:totalTrades="totalTrades"/>
    <div v-if="privacyStatus == 'OK'">
      <TradeConsole
        tradesType="open"
        title="Opened Trades"
        v-bind:isMobile="isMobile"
        v-bind:isUserConnected="isUserConnected"
        v-bind:trades="openedTrades"
        v-bind:isUserProfile="isUserProfile"/>
      <TradeConsole
        tradesType="close"
        title="Closed Trades"
        v-bind:isMobile="isMobile"
        v-bind:isUserConnected="isUserConnected"
        v-bind:trades="closedTrades"
        v-bind:isUserProfile="isUserProfile"/>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
      {{ privacyReason }}
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import UserModule from '@/store/userModule';
  const userStore = getModule(UserModule)
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  import Header from '@/components/header/Header.vue';
  import TradeHero from '@/components/trades/TradeHero.vue';
  import TradeConsole from '@/components/trades/TradeConsole.vue';
  @Component({
    components: {
      Header,
      TradeHero,
      TradeConsole
    },
  })
  export default class User extends Vue {
    privacyStatus: string = '';
    privacyReason: string = '';
    isUserProfile: boolean = false;
    totalReturn: number = 0;
    roi: number = 0;
    username: string = '';
    twitter: string = '';
    discord: string = '';
    github: string = '';
    profilePicture: string = '';
    followers: number = 0;
    subscribers: number = 0;
    joinTime: string = "";
    totalTrades: number = 0;
    openedTrades: object[] = [];
    closedTrades: object[] = [];
    isMobile = false;
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    created() {
      window.addEventListener('resize', this.checkIfMobile);
      this.checkIfMobile();
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
    initialiseTradesWs() {
      var sessionId: string;
      if (userStore.userDetails['SessionId']) {
        sessionId = userStore.userDetails['SessionId'];
      } else {
        sessionId = "noLogIn_" + (Math.random() + 1).toString(36).substring(2);
      }
      let wallet = this.$route.params.wallet;
      let ws_url = [
        process.env.VUE_APP_WS_URL,
        'get_trades',
        wallet,
        sessionId
      ].join('/');
      let ws = new WebSocket(ws_url);
      this.heartbeat(ws);
      ws.onmessage = (event: any) => {
        let ws_data = JSON.parse(event.data);
        this.privacyStatus = ws_data.PrivacyStatus.Status;
        this.privacyReason = ws_data.PrivacyStatus.Reason;
        this.totalReturn = ws_data.TotalReturnUsd;
        this.totalTrades = ws_data.CountTrades;
        this.roi = ws_data.Roi;
        this.username = ws_data.UserDetails.Username;
        this.twitter = ws_data.UserDetails.Twitter;
        this.discord = ws_data.UserDetails.Discord;
        this.github = ws_data.UserDetails.Github;
        this.profilePicture = ws_data.UserDetails.ProfilePicture;
        this.followers = ws_data.UserDetails.Followers;
        this.subscribers = ws_data.UserDetails.Subscribers;
        this.joinTime = ws_data.UserDetails.JoinTime;
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
    heartbeat(ws: any) {
      setTimeout(()=>{
        if (!ws) return;
        if (ws.readyState !== 1) return;
        ws.send('ping');
        this.heartbeat(ws);
      }, 5000)
    }
    checkIfMobile() {
      if( screen.width <= 800 ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  }
</script>
