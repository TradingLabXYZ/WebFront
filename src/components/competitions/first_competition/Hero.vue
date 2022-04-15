<template>
  <div class="flex xs:flex-col sm:flex-row xs:mt-12 sm:mt-auto">
    <div class="flex flex-col sm:my-40 xs:my-12 xs:ml-12 sm:ml-64 xs:max-w-lg sm:max-w-xl space-y-4">
      <div class="text-3xl font-bold">
        1st TradingLab Crypto Competition
      </div>
      <div class="text-7xl text-magentashine">
        What will be BTC price at the end of May 2022?
      </div>
      <div class="text-4xl font-bold">
        {{ countPartecipants }} partecipants registered
      </div>
      <div>
        <button
          class="p-2 mt-2 text-3xl font-bold rounded hover:bg-magentashine bg-blueshine">
          <router-link
            :to="{path: '/crypto_competition/guess_btc_price/rank'}">
            REAL TIME RANK
          </router-link>
        </button>
      </div>
    </div>
    <div class="my-12 mx-12">
      <img src="@/assets/competitions/first_competition/btc_micro.png" class="m-auto" alt="BtcMicro">
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Hero extends Vue {
  countPartecipants: number = 0;
  async created() {
    this.fetchCountPartecipants();
  }
  fetchCountPartecipants() {
    const requestUrl = [
      process.env.VUE_APP_HTTP_URL,
      'get_count_partecipants',
      'first_competition'
    ].join('/');
    axios({
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + document.cookie,
        'Access-Control-Allow-Origin': '*',
      },
      url: requestUrl,
    }).then((response) => {
      if (response.status === 200) {
        this.countPartecipants = response.data;
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
}
</script>
