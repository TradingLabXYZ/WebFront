<template>
  <div class="bg-universe text-cream">
    <Header/>
    <div class="mt-5 mb-3 font-bold tracking-wider text-center xs:text-xl sm:text-2xl">
      Explore
    </div>
    <div class="flex flex-col">
      <div
        v-for="event in events"
        :key="event.createdat"
        class="my-4 grid sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-11">
        <div class="xs:hidden sm:block sm:col-span-1 md:col-span-2 lg:col-span-3"></div>
        <div class="flex flex-col text-center border-t border-b border-gray-200 xs:mx-3 sm:col-span-6 md:col-span-6 lg:col-span-5">
          <router-link :to="'/' + event.userwallet">
            <div class="flex flex-row justify-between font-light xs:text-sm md:text-xl">
              <div class="flex flex-row items-center justify-start mt-1 align-middle space-x-1">
                <img
                  :src="event.profilepicture"
                  height="30" width="30"
                  class="rounded-full">
                <span class="font-normal">
                  {{ event.type }} {{ event.quantity }} {{ event.secondpairsymbol }}
                </span>
              </div>
              <div class="flex flex-row items-center justify-end align-middle">
                <span class="font-normal">
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
            <div class="mt-1 italic font-light text-center xs:text-sm sm:text-xl">
              "{{ event.reason }}"
            </div>
            <div class="flex flex-row items-center justify-around mt-2 mb-4 align-middle">
              <div class="flex flex-col text-center">
                <div class="relative font-light xs:text-xxs xs:text-sm top-1">
                  Avg Price
                </div>
                <div class="xs:text-md sm:text-xl lg:text-2xl">
                  {{ event.avgprice }}
                </div>
                <div class="relative font-light xs:text-xxs xs:text-sm bottom-1">
                  {{ event.firstpairsymbol }}/{{ event.secondpairsymbol }}
                </div>
              </div>
              <div class="flex flex-col text-center">
                <div class="relative font-light xs:text-xxs xs:text-sm top-1">
                  Total
                </div>
                <div class="xs:text-md sm:text-xl lg:text-2xl">
                  {{ event.total }}
                </div>
                <div class="relative font-light xs:text-xxs xs:text-sm bottom-1">
                  {{ event.firstpairsymbol }}
                </div>
              </div>
              <div class="flex flex-col text-center">
                <div class="relative font-light xs:text-xxs xs:text-sm top-1">
                  Current Price
                </div>
                <div class="flex flex-row justify-center space-x-1">
                  <div class="xs:text-md sm:text-xl lg:text-2xl">
                    {{ event.currentprice }}
                  </div>
                  <div
                    v-if="event.type=='BUY'"
                    class="flex items-center text-xs align-bottom"
                    :class="event.deltapriceperc > 0 ? 'text-lagune' : 'text-dutchorange'">
                    {{ event.deltapriceperc + "%" }}
                  </div>
                  <div
                    v-else
                    class="flex items-center text-xs align-bottom"
                    :class="event.deltapriceperc > 0 ? 'text-dutchorange' : 'text-lagune'">
                    {{ event.deltapriceperc + "%" }}
                  </div>
                </div>
                <div class="relative font-light xs:text-xxs xs:text-sm bottom-1">
                  {{ event.firstpairsymbol }}/{{ event.secondpairsymbol }}
                </div>
              </div>
            </div>
            <div class="flex flex-row justify-between font-light xs:text-xxs sm:text-xs">
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
  import axios from "axios";
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  Component.registerHooks([
    'beforeRouteLeave'
  ])
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
    mounted () {
      window.addEventListener('scroll', this.scroll);
    }
    beforeRouteLeave(_: any, __: any, next: any) {
      window.removeEventListener('scroll', this.scroll);
      next()
    }
    scroll () {
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;
      if (offset >= height) {
        this.getLatestEvents();
      }
    }
    getLatestEvents() {
      let request_url = [
        process.env.VUE_APP_HTTP_URL,
        'get_explore',
        this.events.length
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
          this.events.push.apply(this.events, response.data);
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
</script>
