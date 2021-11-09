<template>
  <div>
    <div class="hidden md:block">
      <div v-if="!userWallet">
        <button
          class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark"
          @click="loginMetamask">
          Connect Wallet
        </button>
      </div>
      <div v-else>
        <ButtonSettings/>
        <button>
          {{ userWallet.substring(0, 5) }}...{{ userWallet.slice(-5) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  declare let window: any;
  import axios from "axios";
  import Web3 from "web3";
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import { get } from 'idb-keyval';
  import { set } from 'idb-keyval';
  import { del } from 'idb-keyval';
  import ButtonSettings from '@/components/ButtonSettings.vue';
  import User from '@/store/userModule';
  const userStore = getModule(User)
  @Component({
    components: {
      ButtonSettings
    }
  })
  export default class ConnectWallet extends Vue {
    get userWallet() {
      return userStore.getUserDetails['Wallet'];
    }
    async created() {
      if(document.cookie.indexOf("sessionId") > -1) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
      };
      var self = this;
      window.ethereum.on('accountsChanged', function () {
        self.verifyConnection();
      });
      window.ethereum.on('chainChanged', function(){
        self.verifyConnection();
      });
    }
    async loginMetamask() {
      if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
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
            alert("Please connect to Moonbase Alpha!")
            return;
          }
          axios({
            method: "GET",
            url: process.env.VUE_APP_HTTP_URL + "/login/" + accounts[0],
          }).then(response => {
            if (response.status == 200) {
              let sessionId: string = response.data['SessionId'];
              if (sessionId) {
                // Set cookie
                let d = new Date();
                d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
                let expires = "expires=" + d.toUTCString();
                document.cookie = "sessionId=" + sessionId + ";" + expires + "; path=/";
                // Save user's info in store
                userStore.updateUserDetails(response.data);
                // Save user's data in indexeddb
                set(response.data['SessionId'], response.data);
                // Update local variables
                console.log("SUCCESSFULLY CONNECTED WITH MOONBASE ALPHA:");
                console.log("\tChainId: ", chainId);
                console.log("\tAccount: ", accounts[0]);
                if (this.$route.params['wallet'] == accounts[0]) {
                  this.$router.go(0);
                } else if (this.$route.params['wallet'] != accounts[0]) {
                  this.$router.push({
                    name: 'UserTrades',
                    params: {
                      wallet: accounts[0] 
                    }
                  })
                }
              }
            }
          })
        }
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
      console.log(accounts);
      if (accounts.length > 0) {
        let chainId = await window.web3.eth.getChainId(function(chainId: any) {
          return chainId;
        });
        if (chainId != 1287) {
          this.clean()
          alert("Please connect to Moonbase Alpha!")
          return;
        } else {
          if (this.$route.params['wallet'] != accounts[0]) {
            this.$router.push({
              name: 'UserTrades',
              params: {
                wallet: accounts[0] 
              }
            })
          } else {
            this.$router.go(0);
          }
        }
      } else {
        this.clean();
        return
      }
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
      // Reset local variables
      // Refresh page
      this.$router.go(0);
    }
  }
</script>
