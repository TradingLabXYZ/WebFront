<template>
  <div>
    <div>
    </div>
    <div class="divide-x-8">
      <button
        @click="connect"
        class="bg-red-300">
        WalletConnect
      </button>
      <button
        @click="switchNetwork"
        class="bg-blue-300">
        Switch Network
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ethers } from "ethers";
  import WalletConnectProvider from '@walletconnect/ethereum-provider'
  import Web3Modal from "web3modal";
  import { getProviderInfo } from "web3modal";
  import Metamask from '@/store/metamaskModule';
  import { getModule } from 'vuex-module-decorators'
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {},
  })
  export default class Test extends Vue {
    vue_app_moonbeam_chainid = parseInt(process.env.VUE_APP_MOONBEAM_CHAINID || '');
    vue_app_http_url = process.env.VUE_APP_HTTP_URL;
    providerName: string = '';
    network = 0;
    address: string = '';
    async created() {
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
      provider.on('accountsChanged', function(account: any) {
        console.log("ACCOUNT CHANGED");
      });
      provider.on('chainChanged', function() {
        console.log("CHAIN CHANGED");
      });
    }
    async switchNetwork() {
      let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      let chainId = parseInt(chainIdHex, 16);
      console.log(chainId);
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
  }
</script>
