<template>
  <div>
    <div>
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
  import WalletConnectProvider from '@walletconnect/ethereum-provider'
  import Web3Modal from "web3modal";
  @Component({
    components: {},
  })
  export default class Test extends Vue {
    async created() {


      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
                1287: "https://rpc.api.moonbase.moonbeam.network",
            }
          }
        }
      };

      const web3Modal = new Web3Modal({
        providerOptions
      });

      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
     

      var network = await web3Provider.getNetwork().then(function(newtwork) {return newtwork.chainId});
      
      var address = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});

      var balance = await web3Provider.getBalance(address).then(function(balance) {return balance.toString()});
      
      console.log("NETWORK", network, "\nADDRESS", address, "\nBALANCE", balance);
      


      /* const provider = new WalletConnectProvider({
        rpc: {
            1287: "https://rpc.api.moonbase.moonbeam.network",
        },
        qrcode: true
      });
      await provider.enable();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      var network = await web3Provider.getNetwork().then(function(newtwork) {return newtwork.chainId});
      var address = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});
      var balance = await web3Provider.getBalance(address).then(function(balance) {return balance.toString()});
      console.log("NETWORK", network, "\nADDRESS", address, "\nBALANCE", balance);
      provider.on("accountsChanged", (accounts: string[]) => {
        console.log(accounts);
      }); */
    }
    async handleWalletConnect() {
    };
    async resetApp() {
    };
  }
</script>
