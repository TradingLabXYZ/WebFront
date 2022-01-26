<template>
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
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ethers } from "ethers";
  import Web3Modal from 'web3modal';
  import { providerOptions } from '@/web3/config';
  @Component({
    components: {},
  })

  export default class Test extends Vue {
    web3Modal = new Web3Modal({
      theme: 'dark',
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    });

    created() {
      var ciao = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
      console.log(ciao);
    }

    async handleWalletConnect() {
      const instance = await this.web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      await signer.getBalance().then(function(balance) {console.log(balance.toString())});
    };
    async resetApp() {
      this.web3Modal.clearCachedProvider();
    };
  }
</script>
