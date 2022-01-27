<template>
  <div>
    <div>
      IS CONNECTED: {{ isConnected }}
    </div>
    <div>
      <button
        @click="handleWalletConnect"
        class="bg-red-300">
        WalletConnect
      </button>
      <button
        @click="resetApp"
        class="bg-green-300">
        Reset
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ethers } from "ethers";
  import Web3Modal from 'web3modal';
  import { providerOptions } from '@/web3/config';
  /* import WalletConnectProvider from "@walletconnect/web3-provider"; */
  import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

  import { walletconnect } from "@/web3/test"

  @Component({
    components: {},
  })

  export default class Test extends Vue {
    isConnected = false;
    web3Modal = new Web3Modal({
      theme: 'dark',
      providerOptions,
    });

    async created() {

        /* var walletconnect = new WalletConnectConnector({
          rpc: {
              1287: 'https://rpc.api.moonbase.moonbeam.network'
          },
          bridge: 'https://bridge.walletconnect.org',
          qrcode: true
        })
        
        let { provider } = await walletconnect.activate();
        
        const signer = provider.getSigner();
 */

      /* let { provider } = await walletconnect.activate(); */
      is:open is:issue 
      /*const signer = provider.getSigner();

      const mamma = new ethers.providers.Web3Provider(signer);



      /* const provider = new ethers.providers.Web3Provider(walletconnect);
      await provider.getNetwork().then(function(network) {console.log(network)}); */


      const instance = await this.web3Modal.connect();
     /* const provider = new ethers.providers.Web3Provider(instance);
      await provider.getNetwork().then(function(network) {console.log(network)}); */

      /* instance.on('accountsChanged', async (accounts: object) => {
        console.log("ACCOUNT CHANGED", accounts);
      });
      instance.on('chainChanged', async (chainId: string) => {
        console.log("CHAIN CHANGED", chainId);
      }); */

      /* await provider.getNetwork().then(function(network) {console.log(network)}); */
      /* if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) {
        this.isConnected = true;
      } */
    }

    async handleWalletConnect() {
      /* const instance = await this.web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      await provider.getNetwork().then(function(network) {console.log(network)});
      await signer.getBalance().then(function(balance) {console.log(balance.toString())});
      this.isConnected = true; */
    };
    async resetApp() {
      /* this.web3Modal.clearCachedProvider();
      this.isConnected = false; */
    };
  }
</script>
