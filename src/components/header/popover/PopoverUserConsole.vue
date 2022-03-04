<template>
  <div class="mt-3 sm:w-72 xs:text-xs sm:text-base text-cream border-1 bg-magentashine rounded-md">
    <div class="px-3 pt-3 divide-y divide-universe">
      <div class="flex flex-col">
        <div class="flex p-2 tracking-widest align-middle xs:flex-col sm:flex-row">
          <div
            id="walletText"
            class="">
            <span class="font-bold">
              Wallet
            </span>
            : {{ userWallet.substring(0, 5) }}...{{ userWallet.slice(-5) }}
          </div>
          <div class="pl-2">
            <button
              class="p-1 hover:bg-blueshine hover:rounded"
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
      </div>
      <div class="flex justify-around p-3 px-4 py-1">
        <Settings class="inline-block p-2 mr-2 font-bold rounded hover:bg-blueshine"/>
      </div>
      <div class="flex justify-around p-3 px-4 py-1">
        <button
          id="disconnectButton"
          class="inline-block p-2 mr-2 font-bold rounded hover:bg-blueshine"
          @click="disconnectMetamask">
          Disconnect
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Emit } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import CopyToClipboard from '@/components/svg/CopyToClipboard.vue'
  import Settings from '@/components/header/btns/Settings.vue'
  import Wallet from '@/store/walletModule';
  const walletStore = getModule(Wallet)
  @Component({
    components: {
      PopoverUserConsole,
      Settings,
      CopyToClipboard
    }
  })
  export default class PopoverUserConsole extends Vue {
    showUserMenu = false;
    get userWallet() {
      return walletStore.getWallet;
    }
    get userChainId() {
      return walletStore.getChainId;
    }
    get userBalance() {
      return walletStore.getBalance;
    }
    copyWalletToClipboard() {
      navigator.clipboard.writeText(walletStore.getWallet);
    }
    @Emit('disconnectMetamask')
    disconnectMetamask(){}
  }
</script>
