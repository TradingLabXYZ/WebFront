<template>
  <div>
    <Header/>
    <div class="mt-5 mb-5 text-center xs:text-xl sm:text-2xl">Explore</div>
    <div class="flex flex-col">
      <div
        v-for="event in events"
        :key="event.createdat"
        class="grid grid-cols-12 divide-y-2 divide-gray-300">
        <div class="col-span-4"></div>
        <div v-if="event.eventtype=='trade'" class="py-12 text-center col-span-4">
          <router-link :to="'/' + event.userwallet">
            <div class="flex flex-row items-center justify-center align-middle space-x-5">
              <img  
                :src="event.profilepicture"
                class="rounded-full h-14">
              <div class="text-left">
                <div class="flex flex-row items-center align-middle space-x-1">
                  <div class="text-lg font-bold">
                    New trade
                  </div>
                  <div class="">
                    on {{ event.exchange }}
                  </div>
                </div>
                <div class="text-xs italic text-gray-500">
                  {{ event.userwallet }}
                </div>
                <div class="text-xs italic text-gray-500">
                {{ event.timeago }}
                </div>
              </div>
              <div class="flex flex-row items-center justify-center text-center align-middle space-x-5">
                <div class="">
                  <img
                    :src="event.firstpairurlicon"
                    height="30px" width="30px">
                  <div class="text-gray-500 text-xxs">
                    {{ event.firstpairsymbol }}
                  </div>
                </div>
                <div>
                  <img
                    :src="event.secondpairurlicon"
                    height="30px" width="30px">
                  <div class="text-gray-500 text-xxs">
                    {{ event.secondpairsymbol }}
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <div v-else class="py-12 text-center col-span-4">
          <router-link :to="'/' + event.userwallet">
            <div class="flex flex-row items-center justify-center align-middle space-x-8">
              <img
                :src="event.profilepicture"
                class="rounded-full h-14">
              <div class="text-left">
                <div class="flex flex-row items-center align-middle space-x-1">
                  <div class="font-bold">
                    {{ event.type }}
                  </div>
                  <div class="">
                    {{ event.quantity }}
                  </div>
                  <div class="">
                    <img
                      :src="event.secondpairurlicon"
                      class="inline-block"
                      height="30px" width="30px">
                  </div>
                  <div class="">
                      {{ event.secondpairsymbol }}
                  </div>
                  <div class="">
                    {{ event.timeago }}
                  </div>
                </div>
                <div class="text-xs italic text-gray-500">
                  {{ event.userwallet }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import axios from "axios";
  @Component({
    components: {
      Header
    }
  })
  export default class Settings extends Vue {
    events: object[] = [];
    created() {
      this.getLatestEvents();
    }
    getLatestEvents() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'get_explore'
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
          console.log(response.data);
          this.events = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
