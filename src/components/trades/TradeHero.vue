<template>
  <div class="bg-oldpurple text-cream">
    <div class="flex flex-row justify-center space-x-4 align-middle items-center xs:pt-2 sm:pt-4"> 
      <img 
        :src="profilePicture"
        class="rounded-full sm:h-20 sm:w-20 xs:h-10 xs:w-10"
        alt="user profile picture">
      <div class="flex xs:text-xl sm:text-2xl font-bold justify-center pt-2">
        {{ username }}
      </div>
    </div>
    <div class="flex flex-row justify-center xs:space-x-2 sm:space-x-4">
      <button v-if="twitter" class="p-1">
        <a v-bind:href="'https://twitter.com/'+ twitter" target="_blank">
          <Twitter class="text-white fill-current" height="18" width="18"/>
        </a>
      </button>
      <button v-if="discord" class="p-1">
        <a v-bind:href="'https://discord.com/users/'+ discord" target="_blank">
          <Discord class="text-white fill-current" height="18" width="18"/>
        </a>
      </button>
      <button v-if="github" class="p-1">
        <a v-bind:href="'https://github.com/'+ github" target="_blank">
          <Github class="text-white fill-current" height="18" width="18"/>
        </a>
      </button>
    </div>
    <div class="flex flex-row justify-center text-xs xs:space-x-2 sm:space-x-4 xs:py-2 sm:py-4 xs:text-sm sm:text-xl">
      <router-link
        :event="privacyStatus == 'OK' ? 'click' : ''"
        :to="{path: '/' + $route.params.wallet + '/connections', query: {view: 'followers'}}">
        {{ followers }}
        <span>
          followers
        </span>
      </router-link>
      <span>|</span>
      <router-link
        :event="privacyStatus == 'OK' ? 'click' : ''"
        :to="{path: '/' + $route.params.wallet + '/connections', query: {view: 'following'}}">
        {{ followings }}
        <span>
          following
        </span>
      </router-link>
      <span>|</span>
      <div>
        joined {{ joinTime }}
      </div>
    </div>
    <div class="flex xs:flex-col sm:flex-row justify-center items-center align-middle xs:text-md sm:text-3xl
    sm:space-x-8 pb-2">
      <div class="" v-if="isUserProfile || visibility['TotalCountTrades']">
        {{ totalTrades }}
        <span class="text-md font-extralight">
          Trades
        </span>
      </div>
      <div class="" v-if="isUserProfile || visibility['TotalPortfolio']">
        {{ totalValueUsd }}
        <span class="text-md font-extralight">
          $ Portfolio
        </span>
      </div>
      <div class="" v-if="isUserProfile || visibility['TotalReturn']">
        {{ totalReturn }}
        <span class="text-md font-extralight">
          $ Return
        </span>
      </div>
      <div class="" v-if="isUserProfile || visibility['TotalRoi']">
        {{ roi + "%" }}
        <span class="text-md font-extralight">
          ROI
        </span>
      </div>
    </div>
    <div v-if="!isUserProfile" class="flex flex-col justify-center space-y-2">
      <div>
        <button v-if="!isFollower"
          class="inline-block px-2 py-1 text-sm font-bold text-white bg-green-400 rounded"
          v-on:click="follow">
          Follow
        </button>
        <button v-else
          class="inline-block px-2 py-1 text-sm font-normal text-white bg-gray-600 rounded"
          v-on:click="follow">
          Followed
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
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
  @Prop() privacyStatus!: string;
  @Prop() isUserProfile!: boolean;
  @Prop() isUserConnected!: boolean;
  @Prop() isFollower!: boolean;
  @Prop() isSubscriber!: boolean;
  @Prop() username!: string;
  @Prop() twitter!: string;
  @Prop() discord!: string;
  @Prop() github!: string;
  @Prop() profilePicture!: string;
  @Prop() followers!: number;
  @Prop() followings!: number;
  @Prop() subscribers!: number;
  @Prop() joinTime!: string;
  @Prop() totalTrades!: number;
  @Prop() totalReturn!: number;
  @Prop() totalValueUsd!: number;
  @Prop() roi!: number;
  @Prop() visibility!: object;
  @Emit('follow')
  follow(){}
}
</script>
