<template>
  <div class="h-screen dark:bg-universe">
    <Header/>
    <TradeHero
      @follow="manageFollow"
      v-bind:privacyStatus="privacyStatus"
      v-bind:isUserConnected="isUserConnected"
      v-bind:isUserProfile="isUserProfile"
      v-bind:isFollower="isFollower"
      v-bind:isSubscriber="isSubscriber"
      v-bind:isMobile="isMobile"
      v-bind:username="username"
      v-bind:twitter="twitter"
      v-bind:discord="discord"
      v-bind:github="github"
      v-bind:profilePicture="profilePicture"
      v-bind:followers="followers"
      v-bind:followings="followings"
      v-bind:subscribers="subscribers"
      v-bind:joinTime="joinTime"
      v-bind:totalReturn="totalReturn"
      v-bind:totalValueUsd="totalValueUsd"
      v-bind:roi="roi"
      v-bind:totalTrades="totalTrades"/>
    <div v-if="privacyStatus == 'OK'">
      <TradeConsole
        v-bind:isMobile="isMobile"
        v-bind:isUserConnected="isUserConnected"
        v-bind:trades="trades"
        v-bind:isUserProfile="isUserProfile"/>
    </div>
    <div v-else class="flex flex-col justify-center mt-12 text-xl text-center sm:text-4xl h-80 dark:text-gray-200">
      <div v-if="!isSubscribe"> 
        {{ privacyMessage }}
        <div v-if="privacyReason == 'user is not subscriber'">
          <button
            class="inline-block p-2 m-4 text-lg font-bold rounded hover:bg-deeplagune bg-dutchorange"
            @click="startSubscriptionProcess()">
            Subscribe
          </button>
        </div>
      </div>
      <div v-else>
        <Subscribe
          v-bind:wallet="$route.params.wallet"
          @stopSubscriptionProcess="stopSubscriptionProcess"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import axios from "axios";
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import UserModule from '@/store/userModule';
  const userStore = getModule(UserModule)
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  import Header from '@/components/header/Header.vue';
  import TradeHero from '@/components/trades/TradeHero.vue';
  import TradeConsole from '@/components/trades/TradeConsole.vue';
  import Subscribe from '@/components/subscription/Subscribe.vue';
  @Component({
    components: {
      Header,
      TradeHero,
      TradeConsole,
      Subscribe
    },
  })
  export default class User extends Vue {
    ws_url: string = '';
    privacyStatus: string = '';
    privacyReason: string = '';
    privacyMessage: string = '';
    isUserProfile: boolean = false;
    totalReturn: number = 0;
    totalValueUsd: number = 0;
    roi: number = 0;
    isFollower: boolean = false;
    isSubscriber: boolean = false;
    username: string = '';
    twitter: string = '';
    discord: string = '';
    github: string = '';
    profilePicture: string = '';
    followers: number = 0;
    followings: number = 0;
    subscribers: number = 0;
    joinTime: string = "";
    totalTrades: number = 0;
    trades: object[] = [];
    isMobile = false;
    isSubscribe = false;
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    created() {
      window.addEventListener('resize', this.checkIfMobile);
      this.checkIfMobile();
    }
    @Watch('$route', { immediate: true, deep: true })
    onUrlChange() {
      let storeWallet = userStore.userDetails['Wallet'];
      let routeWallet = this.$route.params.wallet;
      if (storeWallet == routeWallet) {
        this.isUserProfile = true; 
      }
      this.totalReturn = 0;
      this.roi = 0;
      this.trades = [];
      this.initialiseTradesWs();
    }
    generateRandomId() {
      return "noLogIn_" + (Math.random() + 1).toString(36).substring(2);
    }
    initialiseTradesWs() {
      var sessionId: string;
      if (userStore.userDetails['SessionId']) {
        sessionId = userStore.userDetails['SessionId'];
      } else {
        sessionId = this.generateRandomId();
      }
      let wallet = this.$route.params.wallet;
      this.ws_url = [
        process.env.VUE_APP_WS_URL,
        'get_trades',
        wallet,
        sessionId
      ].join('/');
      let ws = new WebSocket(this.ws_url);
      this.heartbeat(ws);
      ws.onmessage = (event: any) => {
        let ws_data = JSON.parse(event.data);
        console.log("WS DATA");
        console.log(ws_data);
        this.privacyStatus = ws_data.PrivacyStatus.Status;
        this.privacyReason = ws_data.PrivacyStatus.Reason;
        this.privacyMessage = ws_data.PrivacyStatus.Message;
        this.totalReturn = ws_data.TotalReturnUsd;
        this.totalValueUsd = ws_data.TotalPortfolioUsd;
        this.totalTrades = ws_data.CountTrades;
        this.roi = ws_data.Roi;
        this.isFollower = ws_data.IsFollower;
        this.isSubscriber = ws_data.IsSubscriber;
        this.username = ws_data.UserDetails.Username;
        this.twitter = ws_data.UserDetails.Twitter;
        this.discord = ws_data.UserDetails.Discord;
        this.github = ws_data.UserDetails.Github;
        this.profilePicture = ws_data.UserDetails.ProfilePicture;
        this.followers = ws_data.UserDetails.Followers;
        this.followings = ws_data.UserDetails.Followings;
        this.subscribers = ws_data.UserDetails.Subscribers;
        this.joinTime = ws_data.UserDetails.JoinTime;
        this.trades = [];
        for (var i in ws_data.Trades) {
          let trade = ws_data.Trades[i];
          this.trades.push(trade);
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
    manageFollow() {
      if (!this.isUserConnected) {
        alert("Please connect your wallet!");
        return;
      }
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'follow',
        this.$route.params.wallet,
        this.isFollower
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url,
      }).then(response => {
        if (response.status === 200) {
          if (this.isFollower) {
            this.isFollower = false;
            this.followers = this.followers - 1;
          } else {
            this.isFollower = true;
            this.followers = this.followers + 1;
          }
          this.initialiseTradesWs();
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
    startSubscriptionProcess() {
      this.isSubscribe = true;
    }
    stopSubscriptionProcess() {
      this.isSubscribe = false;
    }
  }
</script>
