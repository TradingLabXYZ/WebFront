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
      <div class="flex justify-center">
        <section v-if="relationSection=='followers'">
          LIST OF FOLLOWERS
        </section> 
        <section v-if="relationSection=='following'">
          LIST OF FOLLOWINGS
        </section> 
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
  export default class Settings extends Vue {
    relationSection: string = 'followers';
    followers: object[] = [];
    following: object[] = [];
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
          // TODO
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
