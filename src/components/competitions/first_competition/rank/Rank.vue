<template>
  <div class="flex flex-col">
    <div class="flex flex-col sm:mt-4 xs:mt-4 xs:ml-12 sm:ml-64 text-2xl">
      <div class="flex flex-row space-x-4">
        <div>
          Latest BTC price: 
        </div>
        <div>
          {{ btcPrice }}
        </div>
      </div>
    </div>
    <div class="flex flex-row sm:mt-4 xs:mt-4 xs:ml-12 sm:ml-64 text-2xl">
      <div class="">
        Submbission ends in {{ countDownValue }}
      </div>
    </div>
    <div class="text-center my-4">
      <button
        class="p-2 mt-2 text-3xl font-bold rounded hover:bg-magentashine bg-blueshine">
        <router-link
          :to="{path: '/crypto_competition/guess_btc_price'}">
          Sumbit your prediction
        </router-link>
      </button>
    </div>
    <div class="flex justify-center mt-12">
      <table>
        <thead class="tracking-wider xs:text-xl sm:text-2xl bg-oldpurple">
          <tr>
            <th 
              class="px-6 py-4"
              scope="col">
              Rank
            </th>
            <th 
              class="px-6 py-4"
              scope="col">
              Username
            </th>
            <th 
              class="px-6 py-4"
              scope="col">
              Prediction ($)
            </th>
            <th 
              class="px-6 py-4"
              scope="col">
              Delta %
            </th>
          </tr>
        </thead>
        <tbody class="tracking-wider xs:text-xl sm:text-2xl bg-sandpurple text-center">
          <template v-for="(partecipant, i) in partecipants">
            <tr class="h-12">
              <td>
                {{ i + 1}}
              </td>
              <td>
                <div class="flex flex-row space-x-2 justify-center align-middle items-center">
                  <img  
                    :src="partecipant['ProfilePicture']"
                    height="30" width="30"
                    class="rounded-full">
                  <span v-if="partecipant['Username'] != ''">
                    {{ partecipant['Username'] }}
                  </span>
                  <span v-else>
                    {{ partecipant['Wallet'] }}
                  </span>
                </div>
              </td>
              <td>
                {{ partecipant['Prediction'] }}
              </td>
              <td>
                {{ partecipant['DeltaPerc'] }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {Component, Vue} from 'vue-property-decorator';
@Component({})
export default class Rank extends Vue {
  partecipants: object = [];
  countDownValue = '';
  btcPrice = 0;
  async created() {
    this.countDownTimer();
    await this.getPartecipants();
  }
  async getPartecipants() {
    const requestUrl = [
      process.env.VUE_APP_HTTP_URL,
      'get_partecipants',
      'first_competition',
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
        this.btcPrice = response.data[0]["BtcPrice"];
        this.partecipants = response.data;
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
  countDownTimer() {
    const countDownDate = new Date('Apr 30, 2022 23:59:59').getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.countDownValue = days + 'd ' + hours + 'h '+ minutes + 'm ' + seconds + 's ';
    setTimeout(() => {
      this.countDownTimer()
    }, 1000)
  }
}
</script>
