<template>
  <div v-if="!isMobile" class="flex flex-row justify-center py-2 space-x-12 bg-blueshine dark:bg-oldpurple">
    <div class="flex flex-row justify-center mt-1 space-x-3">
      <div class="flex items-center align-middle rounded-full">
        <img  
          :src="profilePicture"
          height="60" width="60"
          class="rounded-full">
      </div>
      <div class="flex flex-col justify-center space-y-2">
        <button v-if="twitter">
          <a v-bind:href="'https://twitter.com/'+ twitter" target="_blank">
            <Twitter class="text-white fill-current" height="18" width="18"/>
          </a>
        </button>
        <button v-if="discord">
          <a v-bind:href="'https://discord.com/users/'+ discord" target="_blank">
            <Discord class="text-white fill-current" height="18" width="18"/>
          </a>
        </button>
        <button v-if="github">
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
      <router-link
        :event="privacyStatus == 'OK' ? 'click' : ''"
        :to="{path: '/' + $route.params.wallet + '/connections', query: {view: 'followers'}}">
        {{ followers }}
        <span class="text-sm">
          followers
        </span>
      </router-link>
      <router-link
        :event="privacyStatus == 'OK' ? 'click' : ''"
        :to="{path: '/' + $route.params.wallet + '/connections', query: {view: 'following'}}">
        {{ followings }}
        <span class="text-sm">
          following
        </span>
      </router-link>
      <!-- temporaly disabled
      <div>
        {{ subscribers }}
        <span class="text-sm">
          subscribers
        </span>
      </div>
      -->
      <div class="text-sm">
        Joined {{ joinTime }}
      </div>
    </div>
    <div class="flex flex-col justify-center text-2xl text-white">
      <div class="" v-if="isUserProfile || visibility.TotalCountTrades">
        {{ totalTrades }}
        <span class="text-sm">
          Trades
        </span>
      </div>
      <div class="" v-if="isUserProfile || visibility.TotalPortfolio">
        {{ totalValueUsd }}
        <span class="text-sm">
          $ Portfolio
        </span>
      </div>
      <div class="" v-if="isUserProfile || visibility.TotalReturn">
        {{ totalReturn }}
        <span class="text-sm">
          $ Return
        </span>
      </div>
      <div class="" v-if="isUserProfile || visibility.TotalRoi">
        {{ roi + "%" }}
        <span class="text-sm">
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
  <div v-else class="flex flex-col py-2 text-white space-y-3 bg-blueshine">
    <div class="flex flex-row justify-center space-x-6">
      <div class="flex flex-col space-y-3">
        <div class="flex justify-center rounded-full">
          <img  
            :src="profilePicture"
            height="60" width="60"
            class="rounded-full">
        </div>
        <div class="flex flex-row justify-center space-x-2">
          <button v-if="twitter">
            <a v-bind:href="'https://twitter.com/'+ twitter" target="_blank">
              <Twitter class="fill-current" height="18" width="18"/>
            </a>
          </button>
          <button v-if="discord">
            <a v-bind:href="'https://discord.com/users/'+ discord" target="_blank">
              <Discord class="fill-current" height="18" width="18"/>
            </a>
          </button>
          <button v-if="github">
            <a v-bind:href="'https://github.com/'+ github" target="_blank">
              <Github class="fill-current" height="18" width="18"/>
            </a>
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center text-sm">
        <div class="font-bold">
          {{ username }}
        </div>
        <router-link
          :disabled="privacyStatus != 'OK'"
          :to="{path: '/' + $route.params.wallet + '/connections', query: {view: 'followers'}}">
          {{ followers }}
          <span class="">
            followers
          </span>
        </router-link>
        <router-link
          :disabled="privacyStatus != 'OK'"
          :to="{path: '/' + $route.params.wallet + '/connections', query: {view: 'following'}}">
          {{ followings }}
          <span class="">
            following
          </span>
        </router-link>
        <div>
          {{ subscribers }}
          <span class="">
            subscribers
          </span>
        </div>
        <div class="">
          Joined {{ joinTime }}
        </div>
      </div>
    </div>
    <div class="flex flex-row text-center justify-evenly">
      <div class="flex flex-col" v-if="isUserProfile || visibility.TotalCountTrades">
        <div>
          {{ totalTrades }}
        </div>
        <div class="text-xs">
          Trades
        </div>
      </div>
      <div class="flex flex-col" v-if="isUserProfile || visibility.TotalPortfolio">
        <div>
          {{ totalValueUsd }}
        </div>
        <div class="text-xs">
          $ Portfolio
        </div>
      </div>
      <div class="flex flex-col" v-if="isUserProfile || visibility.TotalReturn">
        <div>
          {{ totalReturn }}
        </div>
        <div class="text-xs">
          $ Return
        </div>
      </div>
      <div class="flex flex-col" v-if="isUserProfile || visibility.TotalRoi">
        <div>
        {{ roi + "%" }}
        </div>
        <div class="text-xs">
          ROI
        </div>
      </div>
    </div>
    <div v-if="!isUserProfile" class="flex flex-row text-sm justify-evenly space-x-1 text-bold">
      <div>
        <button
          v-if="!isFollower"
          class="inline-block px-2 py-1 font-bold bg-green-400 rounded"
          v-on:click="follow">
          Follow
        </button>
        <button
          v-else
          class="inline-block px-2 py-1 font-normal bg-gray-600 rounded"
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
    @Prop() isMobile!: boolean;
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
