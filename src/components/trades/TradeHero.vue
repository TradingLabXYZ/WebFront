<template>
  <div class="flex flex-row justify-center py-2 space-x-12 bg-tradehero">
    <div class="flex flex-row justify-center mt-1 space-x-3">
      <div class="flex items-center align-middle rounded-full">
        <img  
          :src="profilePicture"
          height="60" width="60"
          class="rounded-full">
      </div>
      <div class="flex flex-col justify-center space-y-2">
        <button>
          <a v-bind:href="'https://twitter.com/'+ twitter" target="_blank">
            <Twitter class="text-white fill-current" height="18" width="18"/>
          </a>
        </button>
        <button>
          <a v-bind:href="'https://discord.com/users/'+ discord" target="_blank">
            <Discord class="text-white fill-current" height="18" width="18"/>
          </a>
        </button>
        <button>
          <a v-bind:href="'https://github.com/'+ github" target="_blank">
            <Github class="text-white fill-current" height="18" width="18"/>
          </a>
        </button>
      </div>
    </div>
    <div class="flex flex-col justify-center text-white text-md">
      <div class="font-bold">
        {{ username }}
      </div>
      <div>
        {{ followers }}
        <span class="text-sm">
          followers
        </span>
      </div>
      <div>
        {{ subscribers }}
        <span class="text-sm">
          subscribers
        </span>
      </div>
      <div class="text-sm">
        Joined March 2021
      </div>
    </div>
    <div class="flex flex-col justify-center text-white text-md">
      <div class="">
        {{ totalTrades }}
        <span class="text-sm">
          Trades
        </span>
      </div>
      <div class="">
        {{ totalReturn }}
        <span class="text-sm">
          $ Return
        </span>
      </div>
      <div class="">
        {{ roi + "%" }}
        <span class="text-sm">
          ROI
        </span>
      </div>
    </div>
    <div class="flex flex-col justify-center space-y-2">
      <button
        class="inline-block px-2 py-1 text-sm font-bold text-white rounded bg-homebutton"
        v-on:click="tempFunction">
        Follow
      </button>
      <button
        class="inline-block px-2 py-1 text-sm font-bold text-white rounded bg-homebutton"
        v-on:click="tempFunction">
        Subscribe
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
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
  export default class TradeHero extends Vue {
    @Prop() username!: string;
    @Prop() twitter!: string;
    @Prop() discord!: string;
    @Prop() github!: string;
    @Prop() profilePicture!: string;
    @Prop() followers!: number;
    @Prop() subscribers!: number;
    @Prop() totalTrades!: number;
    @Prop() totalReturn!: number;
    @Prop() roi!: number;
    @Prop() isMobile!: boolean;
    tempFunction() {
      alert("Coming soon!");
    }
  }
</script>
