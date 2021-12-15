<template>
  <div>
    <Header/>
    <div class="mt-5 mb-3 text-center xs:text-xl sm:text-2xl">
      Explore
    </div>
    <div class="flex flex-col">
      <div
        v-for="event in events"
        :key="event.createdat"
        class="my-4 grid grid-cols-11">
        <div class="col-span-4"></div>
        <div class="flex flex-col text-center border-t border-b border-gray-200 col-span-3">
          <router-link :to="'/' + event.userwallet">
            <div class="flex flex-row justify-between">
              <div class="flex flex-row items-center justify-start mt-1 align-middle space-x-1">
                <img
                  :src="event.profilepicture"
                  height="30" width="30"
                  class="rounded-full">
                <span class="font-light text-gray-700 text-md">
                  {{ event.type }} {{ event.quantity }} {{ event.secondpairsymbol }}
                </span>
              </div>
              <div class="flex items-center mt-1 text-sm italic font-light text-gray-700 align-middle">
                "{{ event.reason }}"
              </div>
              <div class="flex flex-row items-center justify-end align-middle">
                <span class="font-light text-gray-700 text-md">
                  {{ event.firstpairsymbol }}/{{ event.secondpairsymbol }}
                </span>
                <img
                  :src="event.firstpairurlicon"
                  class="relative border rounded-full left-1"
                  height="20"
                  width="20">
                <img
                  :src="event.secondpairurlicon"
                  class="border rounded-full"
                  height="20"
                  width="20">
              </div>
            </div>
            <div class="flex flex-row items-center mt-2 mb-4 align-middle justify-evenly">
              <div class="flex flex-col text-center">
                <div class="text-gray-400 text-xxs">
                  Avg Price {{ event.firstpairsymbol }}/{{ event.secondpairsymbol }}
                </div>
                <div class="text-lg leading-3">
                  {{ event.avgprice }}
                </div>
              </div>
              <div class="flex flex-col text-center">
                <div class="text-gray-400 text-xxs">
                  Total {{ event.firstpairsymbol }}
                </div>
                <div class="text-lg leading-3">
                  {{ event.total }}
                </div>
              </div>
              <div class="flex flex-col text-center">
                <div class="text-gray-400 text-xxs">
                  Current Price {{ event.firstpairsymbol }}/{{ event.secondpairsymbol }}
                </div>
                <div class="flex flex-row items-start justify-center align-middle space-x-1">
                  <div class="text-lg leading-3">
                    {{ event.currentprice }}
                  </div>
                  <div
                    v-if="event.type=='BUY'"
                    class="text-xs"
                    :class="event.deltapriceperc > 0 ? 'text-tradepositive' : 'text-tradenegative'">
                    {{ event.deltapriceperc + "%" }}
                  </div>
                  <div
                    v-else
                    class="text-xs"
                    :class="event.deltapriceperc > 0 ? 'text-tradenegative' : 'text-tradepositive'">
                    {{ event.deltapriceperc + "%" }}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row justify-between text-gray-400 text-xxs">
              <div>
                {{ event.userwallet }}
              </div>
              <div>
                {{ event.timeago }}
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
          this.events = response.data;
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
