<template>
  <div>
    <div class="hidden md:block">
      <div v-if="!isUserConnected">
        <button
          class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark"
          @click="loginMetamask">
          Connect Wallet
        </button>
      </div>
      <div v-else>
        <Connected @disconnectMetamask="disconnectMetamask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  declare let window: any;
  import axios from "axios";
  import { ethers } from "ethers";
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import { set, del } from 'idb-keyval';
  import User from '@/store/userModule';
  import Metamask from '@/store/metamaskModule';
  import Connected from '@/components/header/btns/Connected.vue';
  const userStore = getModule(User)
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {
      Connected
    }
  })
  export default class Connect extends Vue {
    vue_app_moonbeam_chainid = parseInt(process.env.VUE_APP_MOONBEAM_CHAINID || '');
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    async created() {
      await this.defineMetamaskStoreVariables();
      this.instantiateMetamaskWatchers();
    }
    async defineMetamaskStoreVariables() {
      if(document.cookie.indexOf("sessionId") > -1) {
        var accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
          let chainId = parseInt(chainIdHex, 16);
          if (chainId == this.vue_app_moonbeam_chainid) {
            let balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest']});
            let balanceEth = parseFloat(ethers.utils.formatEther(balance));
            metamaskStore.updateWallet(accounts[0]);
            metamaskStore.updateChainId(chainId);
            metamaskStore.updateBalance(balanceEth);
            metamaskStore.updateIsConnected(true);
          }
        }
      }
    }
    instantiateMetamaskWatchers() {
      var self = this;
      window.ethereum.on('accountsChanged', function() {
        self.clean();
        self.loginMetamask();
      });
      window.ethereum.on('chainChanged', function() {
        self.clean();
        window.location.reload();
      });
    }
    async loginMetamask() {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask not Detected");
        this.clean();
        return;
      }
      let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      let chainId = parseInt(chainIdHex, 16);
      if (chainId != this.vue_app_moonbeam_chainid) {
        alert("Onyl Moonbase Dev supported!");
        this.clean();
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      this.defineMetamaskStoreVariables();
      if (accounts.length > 0) {
        this.generateSession(accounts[0]);
      }
    }
    generateSession(account: string) {
      this.clean();
      axios({
        method: "GET",
        url: process.env.VUE_APP_HTTP_URL + "/login/" + account,
      }).then(response => {
        if (response.status != 200) {
          console.log("Cannot retrive sessionId");
          return
        }
        let sessionId: string = response.data['SessionId'];
        // Set cookie
        let d = new Date();
        d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = "sessionId=" + sessionId + ";" + expires + "; path=/";
        // Save user's info in store
        userStore.updateUserDetails(response.data);
        // Save user's data in indexeddb
        set(response.data['SessionId'], response.data);
        if (this.$route.params['wallet'] != account) {
          this.$router.push({
            name: 'UserTrades',
            params: {
              wallet: account
            }
          })
          return;
        }
        window.location.reload();
      })
    }
    clean() {
      // Reset indexeddb
      if(document.cookie.indexOf("sessionId") > -1) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        del(sessionId);
      }
      // Reset cookie
      const date = new Date();
      date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
      document.cookie = "sessionId=; expires="+date.toUTCString()+"; path=/";
      // Reset user store
      userStore.updateUserDetails({});
      // Reset metamask store
      metamaskStore.updateIsConnected(false);
      metamaskStore.updateBalance(0);
      metamaskStore.updateChainId(0);
      metamaskStore.updateWallet('');
    }
    disconnectMetamask() {
      this.clean();
    }
  }
</script>
