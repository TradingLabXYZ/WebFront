<template>
  <div>
    <Header/>
    <div class="mt-5 mb-5 text-center xs:text-xl sm:text-2xl">Relations</div>
    <div class="flex flex-col h-screen">
      <div class="flex flex-row justify-center mb-4">
        <div
          class="px-6 py-2 mr-1 text-xl border-2 rounded-md"
          :class="relationSection=='followers' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeRelationsSection('followers')">
          Followers
        </div>
        <div
          class="px-6 py-2 mr-1 text-xl border-2 rounded-md"
          :class="relationSection=='following' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeRelationsSection('following')">
          Following
        </div>
      </div>
      <div
        v-if="relationSection=='followers'"
        class="flex flex-col justify-center mt-3 space-y-5">
        <div
          v-for="(follower) in followers"
          :key="follower.Wallet"
          class="flex flex-row justify-evenly">
          <router-link :to="'/' + follower.Wallet" class="flex flex-row p-2 border-b-2 space-x-4">
            <img
              :src="follower.ProfilePicture"
              height="60" width="60"
              class="rounded-full">
            <div class="flex flex-col justify-center">
              <div class="text-base text-right">
                {{ follower.CountTrades }} Trades
              </div>
              <div class="text-xs text-gray-400">
                {{ follower.Wallet }} 
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div
        v-if="relationSection=='following'"
        class="flex flex-col justify-center mt-3 space-y-5">
        <div
          v-for="(following) in followings"
          :key="following.Wallet"
          class="flex flex-row justify-evenly">
          <router-link :to="'/' + following.Wallet" class="flex flex-row p-2 border-b-2 space-x-4">
            <img
              :src="following.ProfilePicture"
              height="60" width="60"
              class="rounded-full">
            <div class="flex flex-col justify-center">
              <div class="text-base text-right">
                {{ following.CountTrades }} Trades
              </div>
              <div class="text-xs text-gray-400">
                {{ following.Wallet }} 
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import axios from "axios";
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  @Component({
    components: {
      Header
    }
  })
  export default class Settings extends Vue {
    relationSection: string = 'followers';
    followers: object[] = [];
    followings: object[] = [];
    created() {
      this.getRelations();
      let view = this.$route.query.view;
      if (typeof view !== "undefined") {
        this.relationSection = view.toString();
      }
    }
    changeRelationsSection(section: string) {
      this.relationSection = section;
    }
    getRelations() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'get_relations',
        this.$route.params.wallet
      ].join('/');
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + document.cookie,
          "Access-Control-Allow-Origin": "*",
        },
        url: request_url,
      }).then(response => {
        if (response.status === 200) {
          this.followers = response.data['Followers'];
          this.followings = response.data['Following'];
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
