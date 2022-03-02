<template>
  <div class="flex flex-col">
    <!-- temporaly disabled
    <div v-if="isUserConnected && !isCorrectNetwork" class="flex justify-center w-full bg-red-200 h-9">
      <div v-if="currentNetworkProvider=='walletconnect'">
        <button disabled
          class="p-1 m-1 bg-red-300 hover:bg-red-400">
          Please switch network to Moonbase and reconnect
        </button>
      </div>
      <div v-else-if="currentNetworkProvider=='metamask'">
        <button
          @click="switchNetwork"
          class="p-1 m-1 bg-red-300 hover:bg-red-400">
          Switch network
        </button>
      </div>
    </div>
    -->
    <div class="sticky top-0 z-10 flex flex-row items-center justify-around border-b-2 border-magentashine xs:p-0 sm:p-4 bg-universe xs:h-16 sm:h-20 md:h-24">
      <div class="flex flex-row items-center align-middle space-x-2">
        <router-link to="/">
          <img src="@/assets/logo2.png" class="xs:h-14 md:h-18" alt="Logo">
        </router-link>
        <div class="text-4xl font-bold text-magentashine xs:hidden sm:block">
          TradingLab
        </div>
        <div class="font-bold text-red-200 xs:text-xxs sm:text-xs sm:block transform -skew-y-6 -skew-x-6 -translate-y-3 -translate-x-3 animate-pulse">
          Beta
        </div>
      </div>
      <div v-if="!isUserConnected && currentRoute == '/'"
        class="flex flex-row items-center justify-around align-middle xs:text-sm sm:text-base xs:space-x-0 sm:space-x-4 text-verysoftcyan">
        <button class="font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
          <router-link to="/explore">
            Explore
          </router-link>
        </button>
        <Connect class="xs:p-1 sm:p-2"/>
      </div>
      <div v-if="!isUserConnected && currentRoute != '/'"
        class="flex flex-row justify-around xs:text-sm sm:text-base xs:space-x-0 sm:space-x-4 text-verysoftcyan">
        <button class="font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
          <router-link to="/explore">
            Explore
          </router-link>
        </button>
        <Connect class="xs:p-1 sm:p-2"/>
      </div>
      <div v-if="isUserConnected"
        class="flex flex-row justify-around xs:text-sm sm:text-base xs:space-x-0 sm:space-x-4 text-verysoftcyan">
        <button class="inline-block font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
          <router-link to="/">
            Profile
          </router-link>
        </button>
        <button class="inline-block font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
          <router-link to="/explore">
            Explore
          </router-link>
        </button>
        <Connect class="xs:p-1 sm:p-2"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Connect from '@/components/header/btns/Connect.vue';
  import { getModule } from 'vuex-module-decorators'
  import Wallet from '@/store/walletModule';
  const walletStore = getModule(Wallet)
  @Component({
    components: {
      Connect
    }
  })
  export default class Header extends Vue {
    vue_app_moonbeam_chainid = parseInt(process.env.VUE_APP_MOONBEAM_CHAINID || '');
    get isUserConnected() {
      return walletStore.getIsConnected;
    }
    get currentNetworkProvider() {
      return walletStore.getProviderName;
    }
    get isCorrectNetwork() {
      let currentNetwork = walletStore.getChainId.toString();
      let desiredNetwork =  process.env.VUE_APP_MOONBEAM_CHAINID;
      return currentNetwork == desiredNetwork;
    }
    get currentRoute() {
      return this.$route.path;
    }
    async switchNetwork() {
      await walletStore.switchNetwork();
    }
  }
</script>
