<template>
  <div>
    <div class="sticky top-0 z-50 border-b-2 bg-header grid grid-cols-12 gap-4">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <div class="flex justify-between p-4 ml-10">
          <div class="flex items-center">
            <router-link to="/" class="">
              <img src="../assets/logo.png" width="50" alt="Logo" class="mr-2">
            </router-link>
          </div>
          <div class="hidden md:block">
            <div v-if="errorMessage">
              {{ errorMessage }}
            </div>
            <div v-else>
              <button v-if="!isConnected"
                class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark"
                @click="loginMetamask">
                Connect Wallet
              </button>
              <button v-else>
                {{ userWallet.substring(0, 5) }}...{{ userWallet.slice(-5) }}
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  declare let window: any;
  import { Component, Vue } from 'vue-property-decorator';
  import Web3 from "web3";
  @Component({
    components: {}
  })
  export default class LoginMeta extends Vue {
    isConnected: boolean = false;
    isAccountChanged: boolean = false;
    userWallet: string = "";
    errorMessage: string = "";
    created() {
      var self = this;
      window.addEventListener("load", function() {
        window.ethereum.on('accountsChanged', function () {
          self.verifyConnection();
        });
        window.ethereum.on('chainChanged', function(){
          self.verifyConnection();
        });
      })
      this.verifyConnection();
    }
    async loginMetamask() {
      if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
      }
    }
    async verifyConnection() {
      window.web3 = new Web3(window.ethereum);
      let accounts = await window.web3.eth.getAccounts(function(error: any, accounts: any) {
        if (error) {
          console.log("Error: ", error);
        } else {
          return accounts;
        }
      });
      if (accounts.length > 0) {
        let chainId = await window.web3.eth.getChainId(function(chainId: any) {
          return chainId;
        });
        if (chainId != 1287) {
          this.isConnected = false;
          this.errorMessage = "Wrong network"
          alert("Please connect to Moonbase Alpha!")
          return;
        }
        this.isConnected = true;
        this.userWallet = accounts[0];
        this.errorMessage = ""
        console.log("SUCCESSFULLY CONNECTED WITH MOONBASE ALPHA:");
        console.log("\tChainId: ", chainId);
        console.log("\tAccount: ", accounts[0]);
      } else {
        console.log("User is not logged in to MetaMask");
        this.isConnected = false;
        return
      }
    }
  }
</script>
