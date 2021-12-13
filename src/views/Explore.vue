<template>
  <div>
    <Header/>
    <div class="mt-5 mb-5 text-center xs:text-xl sm:text-2xl">Explore</div>
    <div class="flex flex-col h-screen">
      <div
        v-for="event in events"
        :key="event.createdat"
        class="px-4 py-4 mb-4 border-gray-400 grid grid-cols-8">
        <div class="col-span-2"></div>
        <div v-if="event.eventtype=='trade'" class="text-center bg-gray-200 col-span-4">
          <div class="p-4 text-lg font-medium text-center">
            NEW TRADE<br>
            from {{ event.userwallet }}
          </div>
          <div>
            {{ event.minuteago }} minutes ago
          </div>
          <div class="flex flex-row justify-center space-x-4">
            <div>
              {{ event.exchange }}
            </div>
            <div>
              {{ event.firstpair }}
            </div>
            <div>
              {{ event.secondpair }}
            </div>
          </div>
        </div>
        <!--
        <div v-else>
          NEW SUBTRADE
          {{ event.tradecode }}
          {{ event.createdat }}
          {{ event.userwallet }}
          {{ event.type }}
          {{ event.reason }}
          {{ event.quantity }}
          {{ event.total }}
        </div>
        -->
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
