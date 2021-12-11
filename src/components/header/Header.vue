<template>
  <div class="sticky top-0 z-50 flex flex-row items-center justify-around p-4 bg-tradehero xs:h-16 sm:h-20 md:h-24">
    <div class="flex flex-row items-center align-middle space-x-3">
      <router-link to="/">
        <img src="@/assets/logo.png" class="xs:h-10 md:h-16" alt="Logo">
      </router-link>
      <div class="text-2xl font-bold text-tradenew">
        TradingLab
      </div>
    </div>
    <div class="flex flex-row justify-around space-x-4 text-tradenew">
      <button class="inline-block p-2 font-bold rounded hover:bg-header-dark">
        <a href="https://github.com/TradingLabXYZ/Docs/tree/main/Whitepaper" target="_blank">
          Whitepaper
        </a>
      </button>
      <button class="inline-block p-2 font-bold rounded hover:bg-header-dark">
        <a href="https://discord.gg/PEEUfrbQ9c" target="_blank">
          Community
        </a>
      </button>
      <Connect class="p-2"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Connect from '@/components/header/btns/Connect.vue';
  @Component({
    components: {
      Connect
    }
  })
  export default class Header extends Vue {}
</script>
