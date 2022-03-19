<template>
  <div class="flex flex-col justify-center pb-20 -mt-20 text-center pt-44 bg-gradient-to-br from-universelight via-universe to-universe space-y-2">
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
      <button>
        <a href="https://www.youtube.com/channel/UC0MysGuteFUSLrTpzSHdoIg" target="_blank">
          <Youtube class="transform scale-75"/>
        </a>
      </button>
    </div>
    <div class="text-2xl font-semibold text-magentashine">
      TradingLab
    </div>
    <div class="font-normal text-cream text-md">
      Copyright © tradinglab.xyz 2022
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Discord from '@/components/svg/Discord.vue';
  import Twitter from '@/components/svg/Twitter.vue';
  import Github from '@/components/svg/Github.vue';
  import Youtube from '@/components/svg/Youtube.vue';
  @Component({
    components: {
      Discord,
      Twitter,
      Github,
      Youtube
    }
  })
  export default class Footer extends Vue {}
</script>
