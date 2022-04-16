<template>
  <div class="flex flex-col justify-center pb-20 -mt-20 text-center pt-44 bg-gradient-to-br from-universelight via-universe to-universe space-y-4">
    <div class="flex flex-row justify-center xs:space-x-2 sm:space-x-6">
      <button>
        <a href="https://discord.gg/PEEUfrbQ9c" target="_blank">
          <Discord class="transform xs:scale-50 sm:scale-75"/>
        </a>
      </button>
      <button>
        <a href="https://twitter.com/TradingLabXYZ" target="_blank">
          <Twitter class="transform xs:scale-50 sm:scale-75"/>
        </a>
      </button>
      <button>
        <a href="https://github.com/TradingLabXYZ" target="_blank">
          <Github class="transform xs:scale-50 sm:scale-75"/>
        </a>
      </button>
      <button>
        <a href="https://www.metafora.app/tradinglab" target="_blank">
          <Metafora class="transform xs:scale-50 sm:scale-75"/>
        </a>
      </button>
      <button>
        <a href="https://www.youtube.com/channel/UC0MysGuteFUSLrTpzSHdoIg" target="_blank">
          <Youtube class="transform xs:scale-50 sm:scale-75"/>
        </a>
      </button>
      <button>
        <a href="https://polygonscan.com/token/0x01962c00c783ce44c5b031c07435f2dc4a627394" target="_blank">
          <Polyscan class="transform xs:scale-50 sm:scale-75"/>
        </a>
      </button>
    </div>
    <div class="flex flex-row justify-center space-x-2">
      <img
        src="@/assets/logo.png"
        class="h-8"
        alt="TradingLab logo">
      <div class="text-2xl font-semibold text-magentashine">
        TradingLab
      </div>
    </div>
    <div class="font-normal text-cream text-md">
      Copyright © tradinglab.xyz 2022
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Discord from '@/components/svg/Discord.vue';
import Twitter from '@/components/svg/Twitter.vue';
import Github from '@/components/svg/Github.vue';
import Youtube from '@/components/svg/Youtube.vue';
import Metafora from '@/components/svg/Metafora.vue';
import Polyscan from '@/components/svg/Polyscan.vue';
@Component({
  components: {
    Discord,
    Twitter,
    Github,
    Youtube,
    Metafora,
    Polyscan,
  },
})
export default class Footer extends Vue {}
</script>
