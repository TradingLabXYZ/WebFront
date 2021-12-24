<template>
  <div class="flex flex-col justify-center py-16 text-center bg-lagune space-y-2">
    <div class="flex flex-row justify-center">
      <button>
        <a href="https://discord.gg/PEEUfrbQ9c" target="_blank">
          <Discord class="transform scale-75"/>
        </a>
      </button>
      <button>
        <a href="https://twitter.com/TradingLabXYZ" target="_blank">
          <Twitter class="transform scale-75"/>
        </a>
      </button>
      <button>
        <a href="https://github.com/TradingLabXYZ" target="_blank">
          <Github class="transform scale-75"/>
        </a>
      </button>
    </div>
    <div class="text-2xl font-semibold">
      TradingLab
    </div>
    <div class="font-normal text-md">
      Copyright © tradinglab.xyz 2021
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Discord from '@/components/svg/Discord.vue';
  import Twitter from '@/components/svg/Twitter.vue';
  import Github from '@/components/svg/Github.vue';
  @Component({
    components: {
      Discord,
      Twitter,
      Github
    }
  })
  export default class Header extends Vue {}
</script>
