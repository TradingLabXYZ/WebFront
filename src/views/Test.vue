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
  @Component({
    components: {},
  })
  export default class Test extends Vue {
    async created() {
      const provider = new WalletConnectProvider({
        rpc: {
            1287: "https://rpc.api.moonbase.moonbeam.network",
        },
        qrcode: true
      });
      await provider.enable();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      var address = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});
      console.log("HERE THE ADDRESS", address);
      provider.on("accountsChanged", (accounts: string[]) => {
        console.log(accounts);
      });
    }
    async handleWalletConnect() {
    };
    async resetApp() {
    };
  }
</script>
