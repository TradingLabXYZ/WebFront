<template>
  <div>
    <div class="border-2 border-header-dark rounded-md hover:border-header-light hover:bg-tradehero hover:text-white">
      <button
        id="buttonWallet"
        @click="toggleMenu"
        class="mx-2 my-1 text-xs tracking-wider sm:text-sm md:text-sm lg:text-base">
        {{ userWallet.substring(0, 5) }}...{{ userWallet.slice(-5) }}
      </button>
    </div>
    <div v-show="showUserMenu" class="absolute">
      <PopoverUserConsole @disconnectMetamask="disconnectMetamask"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Emit } from 'vue-property-decorator';
  import { getModule } from 'vuex-module-decorators'
  import Metamask from '@/store/metamaskModule';
  import PopoverUserConsole from '@/components/header/popover/PopoverUserConsole.vue';
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {
      PopoverUserConsole
    }
  })
  export default class Connected extends Vue {
    showUserMenu = false;
    get userWallet() {
      return metamaskStore.getWallet;
    }
    toggleMenu() {
      if (this.showUserMenu) {
        this.showUserMenu = false;
      } else {
        this.showUserMenu = true;
      }
    }
    @Emit('disconnectMetamask')
    disconnectMetamask(){}
  }
</script>
