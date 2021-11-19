<template>
  <div class="mt-3 border-2 shadow-md bg-popoverUserConsole-background rounded-md">
    <div class="pt-3 pl-3">
      <div class="pb-2 font-semibold">
        ACCOUNT
      </div>
      <div class="grid grid-cols-2">
        <div class="col-span-1">
          Wallet: {{ userWallet.substring(0, 5) }}...{{ userWallet.slice(-5) }}
        </div>
        <div class="flex flex-row items-center ml-2 col-span-1">
          <button
            @click="copyWalletToClipboard">
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.65646 7.5C4.57698 6.5481 5.09308 6.0144 6.01361 5.0625M3.65646 7.5L6.01361 10.0114M3.65646 7.5C6.11119 7.5 7.48745 7.5 9.94218 7.5M2.57143 1C1.70355 1 1 1.72754 1 2.625V12.375C1 13.2725 1.70355 14 2.57143 14H10.4286C11.2965 14 12 13.2725 12 12.375V11.5625V2.625C12 1.72754 11.2965 1 10.4286 1H2.57143Z" stroke="#4A5568" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div>
        Balance: {{ userBalance.toFixed(3) }}
      </div>
      <div>
        ChainId: {{ userChainId }}
      </div>
    </div>
    <div class="flex justify-between p-3 px-4 py-1">
      <button
        class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark"
        @click="disconnectMetamask">
        Disconnect
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Emit } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {
      PopoverUserConsole
    }
  })
  export default class PopoverUserConsole extends Vue {
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
    @Emit('disconnectMetamask')
    disconnectMetamask(){}
  }
</script>
