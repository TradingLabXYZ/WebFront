<template>
  <div class="min-h-screen pb-20 bg-universe">
    <Header/>
    <TradeHero
      @follow="manageFollow"
      v-bind:privacyStatus="privacyStatus"
      v-bind:isUserConnected="isUserConnected"
      v-bind:isUserProfile="isUserProfile"
      v-bind:isFollower="isFollower"
      v-bind:isSubscriber="isSubscriber"
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
      v-bind:totalTrades="totalTrades"
      v-bind:visibility="visibility"/>
    <div v-if="privacyStatus == 'OK'">
      <TradeConsole
        v-bind:isUserConnected="isUserConnected"
        v-bind:trades="trades"
        v-bind:isUserProfile="isUserProfile"
        v-bind:visibility="visibility"/>
    </div>
    <div v-else class="flex flex-col justify-center mt-12 text-xl text-center text-gray-200 sm:text-4xl h-80">
      <div v-if="!isSubscribe">
        {{ privacyMessage }}
        <div v-if="privacyReason == 'user is not subscriber'">
          <button
            class="inline-block p-2 m-4 text-lg font-bold rounded hover:bg-blueshine bg-magentashine"
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
import axios from 'axios';
import {Component, Vue, Watch} from 'vue-property-decorator';
import {getModule} from 'vuex-module-decorators'
import UserModule from '@/store/userModule';
const userStore = getModule(UserModule)
import Wallet from '@/store/walletModule';
import Header from '@/components/header/Header.vue';
import Competition from '@/components/banners/Competition.vue';
import TradeHero from '@/components/trades/TradeHero.vue';
import TradeConsole from '@/components/trades/TradeConsole.vue';
import Subscribe from '@/components/subscription/Subscribe.vue';
const walletStore = getModule(Wallet)
  @Component({
    components: {
      Header,
      Competition,
      TradeHero,
      TradeConsole,
      Subscribe,
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
  joinTime: string = '';
  totalTrades: number = 0;
  trades: object[] = [];
  isSubscribe = false;
  visibility: object = {};
  get isUserConnected() {
    return walletStore.getIsConnected;
  }
  @Watch('$route', {immediate: true, deep: true})
  onUrlChange() {
    const storeWallet = userStore.userDetails['Wallet'];
    const routeWallet = this.$route.params.wallet;
    if (storeWallet == routeWallet) {
      this.isUserProfile = true;
    }
    this.totalReturn = 0;
    this.roi = 0;
    this.trades = [];
    this.initialiseTradesWs();
  }
  generateRandomId() {
    return 'noLogIn_' + (Math.random() + 1).toString(36).substring(2);
  }
  initialiseTradesWs() {
    let sessionId: string;
    if (userStore.userDetails['SessionId']) {
      sessionId = userStore.userDetails['SessionId'];
    } else {
      sessionId = this.generateRandomId();
    }
    const wallet = this.$route.params.wallet;
    this.ws_url = [
      process.env.VUE_APP_WS_URL,
      'get_trades',
      wallet,
      sessionId,
    ].join('/');
    const ws = new WebSocket(this.ws_url);
    this.heartbeat(ws);
    ws.onmessage = (event: any) => {
      const wsData = JSON.parse(event.data);
      this.privacyStatus = wsData.PrivacyStatus.Status;
      this.privacyReason = wsData.PrivacyStatus.Reason;
      this.privacyMessage = wsData.PrivacyStatus.Message;
      this.totalReturn = wsData.TotalReturnUsd;
      this.totalValueUsd = wsData.TotalPortfolioUsd;
      this.totalTrades = wsData.CountTrades;
      this.roi = wsData.Roi;
      this.isFollower = wsData.IsFollower;
      this.isSubscriber = wsData.IsSubscriber;
      this.username = wsData.UserDetails.Username;
      this.twitter = wsData.UserDetails.Twitter;
      this.discord = wsData.UserDetails.Discord;
      this.github = wsData.UserDetails.Github;
      this.profilePicture = wsData.UserDetails.ProfilePicture;
      this.followers = wsData.UserDetails.Followers;
      this.followings = wsData.UserDetails.Followings;
      this.subscribers = wsData.UserDetails.Subscribers;
      this.joinTime = wsData.UserDetails.JoinTime;
      this.visibility = wsData.VisibilityStatus;
      this.trades = [];
      for (const i in wsData.Trades) {
        this.trades.push(wsData.Trades[i]);
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
  manageFollow() {
    if (!this.isUserConnected) {
      alert('Please connect your wallet!');
      return;
    }
    const requestUrl = [
      process.env.VUE_APP_HTTP_URL,
      'follow',
      this.$route.params.wallet,
      this.isFollower,
    ].join('/');
    axios({
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + document.cookie,
        'Access-Control-Allow-Origin': '*',
      },
      url: requestUrl,
    }).then((response) => {
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
    }).catch(function(error) {
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
