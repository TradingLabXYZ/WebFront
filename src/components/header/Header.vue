<template>
  <div class="sticky top-0 z-10 flex flex-row items-center justify-around border-b-2 border-magentashine xs:p-0 sm:p-4 bg-deepviolet xs:h-16 sm:h-20 md:h-24">
    <input
      type="checkbox"
      @change="toggleTheme">
    <div class="flex flex-row items-center align-middle xs:space-x-1 sm:space-x-3">
      <router-link to="/">
        <img src="@/assets/logo.png" class="xs:h-10 md:h-16" alt="Logo">
      </router-link>
      <div class="text-2xl font-bold text-verysoftcyan xs:hidden sm:block">
        TradingLab
      </div>
    </div>
    <div v-if="!isUserConnected && currentRoute == '/'"
      class="flex flex-row justify-around xs:text-sm sm:text-base xs:space-x-0 sm:space-x-4 text-verysoftcyan">
      <button class="font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
        <a href="https://github.com/TradingLabXYZ/Docs/tree/main/Whitepaper" target="_blank">
          Whitepaper
        </a>
      </button>
      <button class="font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
        <a href="https://discord.gg/PEEUfrbQ9c" target="_blank">
          Community
        </a>
      </button>
      <Connect class="xs:p-1 sm:p-2"/>
    </div>
    <div v-if="!isUserConnected && currentRoute != '/'"
      class="flex flex-row justify-around xs:text-sm sm:text-base xs:space-x-0 sm:space-x-4 text-verysoftcyan">
      <button class="font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
        <router-link to="/explore">
          Explore
        </router-link>
      </button>
      <Connect class="xs:p-1 sm:p-2"/>
    </div>
    <div v-if="isUserConnected"
      class="flex flex-row justify-around xs:text-sm sm:text-base xs:space-x-0 sm:space-x-4 text-verysoftcyan">
      <button class="inline-block font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
        <router-link to="/">
          Profile
        </router-link>
      </button>
      <button class="inline-block font-bold rounded xs:p-1 sm:p-2 hover:bg-deeplagune">
        <router-link to="/explore">
          Explore
        </router-link>
      </button>
      <Connect class="xs:p-1 sm:p-2"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Connect from '@/components/header/btns/Connect.vue';
  import { getModule } from 'vuex-module-decorators'
  import Metamask from '@/store/metamaskModule';
  const metamaskStore = getModule(Metamask)
  @Component({
    components: {
      Connect
    }
  })
  export default class Header extends Vue {
    theme = 'dark';
    get isUserConnected() {
      return metamaskStore.getIsConnected;
    }
    get currentRoute() {
      return this.$route.path;
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
  }
</script>
