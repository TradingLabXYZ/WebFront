<template>
  <div>
    <div v-if="!isUserConnected">
      <button
        id="connectButton"
        class="inline-block p-2 mr-2 font-bold rounded hover:bg-deeplagune bg-magentashine"
        @click="connect">
        Connect
      </button>
    </div>
    <div v-else>
      <Connected @disconnectMetamask="disconnect"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { getModule } from 'vuex-module-decorators'
  import { Component, Vue } from 'vue-property-decorator';
  import Wallet from '@/store/walletModule';
  const walletStore = getModule(Wallet)
  import Connected from '@/components/header/btns/Connected.vue';
  import { generateSession, cleanSession } from '@/functions/session';
  @Component({
    components: {
      Connected
    },
  })
  export default class Connect extends Vue {
    providerName: string = '';
    network = 0;
    address: string = '';
    get isUserConnected() {
      return walletStore.getIsConnected;
    }
    async created() {
      if(document.cookie.indexOf("sessionId") > -1) {
        await walletStore.initializeWallet();
        if (walletStore.getWallet) {
          this.instantiateWatchers(walletStore.providerObject);
        }
      }
    }
    async connect() {
      cleanSession();
      await walletStore.connect();
      await generateSession(walletStore.getWallet);
      this.instantiateWatchers(walletStore.providerObject);
      if (this.$route.params['wallet'] == walletStore.getWallet) {
        window.location.reload();
        return;
      }
      this.$router.push({
        name: 'User',
        params: {
          wallet: walletStore.getWallet
        }
      })
      return;
    }
    instantiateWatchers(provider: any) {
      provider.on('accountsChanged', function(accounts: string[]) {
        console.log("ACCOUNT CHANGED", accounts);
        cleanSession();
      });
      provider.on('chainChanged', function(chainId: number) {
        console.log("CHAIN CHANGED", chainId);
        cleanSession();
      });
    }
    async disconnect() {
      cleanSession();
      localStorage.clear();
    }
  }
</script>
