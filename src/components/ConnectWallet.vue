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
        <button
          class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark"
          @click="disconnectMetamask">
          Disconnect
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  declare let window: any;
  import axios from "axios";
  import { Component, Vue } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
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
      this.instanciateMetamaskWatchers();
    }
    async instanciateMetamaskWatchers() {
      var self = this;
      window.ethereum.on('accountsChanged', function() {
        self.clean();
        self.loginMetamask();
      });
      window.ethereum.on('chainChanged', function() {
        self.clean();
        window.location.reload();
      });
    }
    async loginMetamask() {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask not Detected");
        this.clean();
        return;
      }
      console.log("SONO QUI");
      let chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      let chainId = parseInt(chainIdHex, 16);
      if (chainId != 1281) {
        alert("Onyl Moonbase Dev supported!");
        this.clean();
        return;
      }
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts);
      if (accounts.length == 0) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        accounts = await window.ethereum.request({ method: 'eth_accounts' });
      }
      this.generateSession(accounts[0]);
    }
    generateSession(account: string) {
      this.clean();
      axios({
        method: "GET",
        url: process.env.VUE_APP_HTTP_URL + "/login/" + account,
      }).then(response => {
        if (response.status != 200) {
          console.log("Cannot retrive sessionId");
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
        window.location.reload();
      })
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
    }
    disconnectMetamask() {
      this.clean();
      window.location.reload();
    }
  }
</script>
