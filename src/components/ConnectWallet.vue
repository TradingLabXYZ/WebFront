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
        <Settings/>
        <button>
          {{ userWallet.substring(0, 5) }}...{{ userWallet.slice(-5) }}
        </button>
        <button
          class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark"
          @click="clean">
          Disconnect
        </button>
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
  import Settings from '@/components/header/btns/Settings.vue';
  const userStore = getModule(User)
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {
      Settings
    }
  })
  export default class ConnectWallet extends Vue {
    vue_app_moonbeam_chainid = parseInt(process.env.VUE_APP_MOONBEAM_CHAINID || '');
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    get userWallet() {
      return metamaskStore.getWallet;
    }
    async created() {
      console.log("created");
      await this.defineMetamaskStoreVariables();
      this.instantiateMetamaskWatchers();
    }
    async defineMetamaskStoreVariables() {
      console.log("defineMetamaskStoreVariables");
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
        console.log("accountChanged");
        self.clean();
        self.loginMetamask();
      });
      window.ethereum.on('chainChanged', function() {
        self.clean();
        window.location.reload();
      });
    }
    async loginMetamask() {
      console.log("login metamask");
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask not Detected");
        this.clean();
        return;
      }
      let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      let chainId = parseInt(chainIdHex, 16);
      if (chainId != this.vue_app_moonbeam_chainid) {
        alert(`Onyl Moonbase ${process.env.VUE_APP_MOONBEAM_CHAINNAME} supported!`);
        this.clean();
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      this.defineMetamaskStoreVariables();
      if (accounts.length > 0) {
        this.generateSession(accounts[0]);
        if (this.$route.params['wallet'] != accounts[0]) {
          this.$router.push({
            name: 'UserTrades',
            params: {
              wallet: accounts[0]
            }
          })
          return;
        } else {
          window.location.reload();
        }
      }
    }
    generateSession(account: string) {
      console.log("generateSession");
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
  }
</script>
