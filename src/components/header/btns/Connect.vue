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
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
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
    async created() {
      if(document.cookie.indexOf("sessionId") > -1) {
        await walletStore.initializeWallet();
        if (walletStore.getWallet) {
          this.instantiateWatchers();
        }
      }
    }
    async connect() {
      cleanSession();
      await walletStore.connect();
      await generateSession();
      this.instantiateWatchers();
      if (this.$route.params['wallet'] == walletStore.getWallet) {
        window.location.reload();
      } else {
        this.$router.push({
          name: 'User',
          params: {
            wallet: walletStore.getWallet
          }
        })
      }
    }
    instantiateWatchers() {
      walletStore.getProviderObject.on(
        'accountsChanged', 
        async function(accounts: string[]) {
          console.log("ACCOUNT CHANGED", accounts);
          cleanSession();
          await walletStore.initializeWallet();
          await generateSession();
        }
      );
      walletStore.getProviderObject.on(
        'chainChanged',
        async function(chainId: number) {
          console.log("CHAIN CHANGED", chainId);
          cleanSession();
          await walletStore.initializeWallet();
          await generateSession();
        }
      );
    }
    disconnect() {
      cleanSession();
    }
    get isUserConnected() {
      return walletStore.getIsConnected;
    }
  }
</script>
