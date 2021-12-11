<template>
  <div>
    <div v-if="!isUserConnected">
      <button
        id="connectButton"
        class="inline-block p-2 mr-2 font-bold rounded hover:bg-header-dark bg-homebutton"
        @click="loginMetamask">
        Connect
      </button>
    </div>
    <div v-else>
      <Connected @disconnectMetamask="disconnectMetamask"/>
    </div>
  </div>
</template>

<script lang="ts">
  declare let window: any;
  import axios from "axios";
  import { ethers } from "ethers";
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import { set, clear } from 'idb-keyval';
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
    vue_app_http_url = process.env.VUE_APP_HTTP_URL;
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    async created() {
      await this.defineMetamaskStoreVariables();
      this.instantiateMetamaskWatchers();
    }
    async defineMetamaskStoreVariables() {
      if(document.cookie.indexOf("sessionId") == -1) {
        return;
      }
      var accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length == 0) {
        return;
      }
      let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      let chainId = parseInt(chainIdHex, 16);
      if (chainId != this.vue_app_moonbeam_chainid) {
        return;
      }
      let balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest']});
      let balanceEth = parseFloat(ethers.utils.formatEther(balance));
      metamaskStore.updateWallet(accounts[0]);
      metamaskStore.updateChainId(chainId);
      metamaskStore.updateBalance(balanceEth);
      metamaskStore.updateIsConnected(true);
    }
    instantiateMetamaskWatchers() {
      var self = this;
      window.ethereum.on('accountsChanged', function() {
        self.cleanSession();
        self.loginMetamask();
      });
      window.ethereum.on('chainChanged', function() {
        self.cleanSession();
        window.location.reload();
      });
    }
    async loginMetamask() {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask not Detected");
        this.cleanSession();
        return;
      }
      let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      let chainId = parseInt(chainIdHex, 16);
      if (chainId != this.vue_app_moonbeam_chainid) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: process.env.VUE_APP_MOONBEAM_CHAINHEX }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              const params = [{
                chainId: '0x507',
                chainName: 'Moonbase Alpha',
                nativeCurrency: {
                  name: 'DEV',
                  symbol: 'DEV',
                  decimals: 18
                },
                rpcUrls: ['https://rpc.testnet.moonbeam.network'],
                blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network/']
              }]
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params
              });
            } catch (addError) {
              alert(`Onyl Moonbase ${process.env.VUE_APP_MOONBEAM_CHAINNAME} supported!`);
              this.cleanSession();
              return;
            }
          } else {
            alert(`Onyl Moonbase ${process.env.VUE_APP_MOONBEAM_CHAINNAME} supported!`);
            this.cleanSession();
            return;
          }
        }
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length == 0) {
        alert(`No accounts have been connected!`);
        this.cleanSession();
        return;
      }
      await this.generateSession(accounts[0])
      this.defineMetamaskStoreVariables();
      if (this.$route.params['wallet'] == accounts[0]) {
        window.location.reload();
        return;
      }
      this.$router.push({
        name: 'User',
        params: {
          wallet: accounts[0]
        }
      })
      return;
    }
    async generateSession(account: string) {
      this.cleanSession();
      let api_url = this.vue_app_http_url + '/login/' + account;
      const response = await axios.get(api_url);
      if (response.status != 200) {
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
      return;
    }
    async cleanSession() {
      // Reset indexeddb
      clear()
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
    async disconnectMetamask() {
      await this.cleanSession();
    }
  }
</script>
