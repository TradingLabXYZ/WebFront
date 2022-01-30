<template>
  <div>
    <div v-if="network > 0 && network != 1287" class="flex justify-center w-full h-10 bg-red-200">
      <button
        @click="switchNetwork"
        class="p-1 m-1 bg-red-300 hover:bg-red-400">
        Please switch network on {{ providerName }}
      </button>
    </div>
    <div class="divide-x-8">
      <button
        @click="connect"
        class="bg-blue-300">
        Connect
      </button>
      <button
        @click="disconnect"
        class="bg-blue-300">
        Disconnect
      </button>
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
    components: {},
  })
  export default class Test extends Vue {
    vue_app_moonbeam_chainid = parseInt(process.env.VUE_APP_MOONBEAM_CHAINID || '');
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
        console.log("METAMASK -->", "NETWORK", this.network, "\nADDRESS", metamaskAddress);
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
          console.log("WALLETCONNECT -->", "NETWORK", this.network, "\nADDRESS", this.address);
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
      console.log("PROVIDER NAME", this.providerName, "\nNETWORK", this.network, "\nADDRESS", this.address);
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
    async switchNetwork() {
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
              return;
            }
          } else {
            alert(`Onyl Moonbase ${process.env.VUE_APP_MOONBEAM_CHAINNAME} supported!`);
            return;
          }
        }
      }
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
