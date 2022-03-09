<template>
  <div>
    <Header/>
    <div class="flex flex-col h-screen bg-universe text-cream">
      <div class="mt-5 mb-5 text-center xs:text-xl sm:text-2xl">Connections</div>
      <div class="flex flex-row justify-center mb-4">
        <div
          class="px-6 py-2 mr-1 text-xl border-2 rounded-md"
          :class="connectionSection=='followers' ? 'bg-magentashine text-white font-semibold' : 'bg-blueshine'"
          @click="changeConnectionsSection('followers')">
          Followers
        </div>
        <div
          class="px-6 py-2 mr-1 text-xl border-2 rounded-md"
          :class="connectionSection=='following' ? 'bg-magentashine text-white font-semibold' : 'bg-blueshine'"
          @click="changeConnectionsSection('following')">
          Following
        </div>
      </div>
      <div
        v-if="connectionSection=='followers'"
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
              <div class="text-xs">
                {{ follower.Wallet }} 
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="privacyStatus == 'OK'">
        <div
          v-if="connectionSection=='following'"
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
                <div class="text-xs">
                  {{ following.Wallet }} 
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col justify-around text-xl text-center sm:text-4xl h-80">
        {{ privacyMessage }}
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import axios from "axios";
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  @Component({
    components: {
      Header
    }
  })
  export default class Connections extends Vue {
    connectionSection: string = 'followers';
    followers: object[] = [];
    followings: object[] = [];
    privacyReason: string = '';
    privacyStatus: string = '';
    privacyMessage: string = '';
    created() {
      this.getConnections();
      let view = this.$route.query.view;
      if (typeof view !== "undefined") {
        this.connectionSection = view.toString();
      }
    }
    changeConnectionsSection(section: string) {
      this.connectionSection = section;
    }
    getConnections() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'get_connections',
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
          this.privacyStatus = response.data['Privacy']['Status'];
          this.privacyReason = response.data['Privacy']['Reason'];
          this.privacyMessage = response.data['Privacy']['Message'];
          this.followers = response.data['Followers'];
          this.followings = response.data['Following'];
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
