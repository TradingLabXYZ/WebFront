<template>
  <div class="mt-3 text-white shadow-md text-header-light border-1 bg-deepgray rounded-md">
    <div class="px-3 pt-3 divide-y divide-gray-500">
      <section>
        <div class="p-2 tracking-widest grid grid-cols-6">
          <div
            id="walletText"
            class="col-span-5">
            <span class="font-bold">
              Wallet
            </span>
            : {{ userWallet.substring(0, 5) }}...{{ userWallet.slice(-5) }}
          </div>
          <div class="flex flex-row items-center pl-2 justify-left col-span-1">
            <button
              class="p-1 hover:bg-gray-400 hover:rounded"
              title="Copy to clipboard"
              @click="copyWalletToClipboard">
              <CopyToClipboard/>
            </button>
          </div>
        </div>
        <div class="p-2">
          <span class="font-bold">
            Balance
          </span>
          : {{ userBalance }}
        </div>
        <div class="p-2">
          <span class="font-bold">
            ChainId
          </span>
          : {{ userChainId }}
        </div>
      </section>
      <section class="flex justify-around p-3 px-4 py-1">
        <span class="font-bold">
          DarkMode
        </span>
        <input
          type="checkbox"
          @change="toggleTheme">
      </section>
      <section class="flex justify-around p-3 px-4 py-1">
        <Settings class="inline-block p-2 mr-2 font-bold rounded hover:bg-azure hover:text-header-dark"/>
      </section>
      <section class="flex justify-around p-3 px-4 py-1">
        <button
          id="disconnectButton"
          class="inline-block p-2 mr-2 font-bold rounded hover:bg-azure hover:text-header-dark"
          @click="disconnectMetamask">
          Disconnect
        </button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Emit } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import CopyToClipboard from '@/components/svg/CopyToClipboard.vue'
  import Settings from '@/components/header/btns/Settings.vue'
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {
      PopoverUserConsole,
      Settings,
      CopyToClipboard
    }
  })
  export default class PopoverUserConsole extends Vue {
    theme = 'dark';
    showUserMenu = false;
    get userWallet() {
      return metamaskStore.getWallet;
    }
    get userChainId() {
      return metamaskStore.getChainId;
    }
    get userBalance() {
      return metamaskStore.getBalance;
    }
    copyWalletToClipboard() {
      navigator.clipboard.writeText(metamaskStore.getWallet);
    }
    toggleTheme() {
      if (this.theme == 'dark') {
        document.getElementById('html')?.classList.remove('dark')
        this.theme = '';
      } else {
        document.getElementById('html')?.classList.add('dark');
        this.theme = 'dark';
      }
    }
    @Emit('disconnectMetamask')
    disconnectMetamask(){}
  }
</script>
