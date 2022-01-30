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
  import axios from "axios";
  import { ethers } from "ethers";
  import Web3Modal from "web3modal";
  import { getProviderInfo } from "web3modal";
  import { set, clear } from 'idb-keyval';
  import { getModule } from 'vuex-module-decorators'
  import { Component, Vue } from 'vue-property-decorator';
  import WalletConnectProvider from '@walletconnect/ethereum-provider'
  import User from '@/store/userModule';
  const userStore = getModule(User)
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  import Connected from '@/components/header/btns/Connected.vue';
  @Component({
    components: {
      Connected
    },
  })
  export default class Test extends Vue {
    vue_app_http_url = process.env.VUE_APP_HTTP_URL;
    providerName: string = '';
    network = 0;
    address: string = '';
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    async created() {
      await this.defineMetamaskStoreVariables();
    }
    async defineMetamaskStoreVariables() {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      this.network = await web3Provider.getNetwork().then(function(newtwork) {return newtwork.chainId});
      var metamaskAddress = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});
      if (metamaskAddress) {
        this.address = metamaskAddress;
        this.instantiateWatchers(window.ethereum);
      } else {
        const provider = new WalletConnectProvider({
          rpc: {
            1287: "https://rpc.api.moonbase.moonbeam.network",
          },
          qrcode: true
        });
        var isConnectedToWalletConnect = provider.connected;
        if (isConnectedToWalletConnect) {
          await provider.enable();
          const web3Provider = new ethers.providers.Web3Provider(provider);
          this.network = await web3Provider.getNetwork().then(function(newtwork) {return newtwork.chainId});
          this.address = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});
          this.instantiateWatchers(provider);
        }
      }
      if (this.address) {
        metamaskStore.updateWallet(this.address);
        metamaskStore.updateChainId(this.network);
        metamaskStore.updateIsConnected(true); 
      } else {
        console.log("USER NOT CONNECTED");
      }
    }
    async connect() {
      var providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
                1287: "https://rpc.api.moonbase.moonbeam.network",
            }
          }
        }
      }
      const web3Modal = new Web3Modal({providerOptions})
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      this.network = await web3Provider.getNetwork().then(function(newtwork) {return newtwork.chainId});
      this.address = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});
      this.providerName = getProviderInfo(provider)['name'];
      await this.generateSession(this.address)
      await this.defineMetamaskStoreVariables();
      if (this.$route.params['wallet'] == this.address) {
        window.location.reload();
        return;
      }
      this.$router.push({
        name: 'User',
        params: {
          wallet: this.address
        }
      })
      return;
    }
    instantiateWatchers(provider: any) {
      var self = this;
      provider.on('accountsChanged', function(accounts: string[]) {
        console.log("ACCOUNT CHANGED", accounts);
        self.cleanSession();
      });
      provider.on('chainChanged', function(chainId: number) {
        console.log("CHAIN CHANGED", chainId);
        self.cleanSession();
      });
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
    async disconnect() {
      localStorage.removeItem('walletconnect');
      await this.cleanSession();
      localStorage.clear();
    }
  }
</script>
