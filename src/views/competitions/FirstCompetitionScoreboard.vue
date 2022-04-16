<template>
  <div class="min-h-screen bg-universe text-cream pb-20">
    <Header/>
    <Hero/>
    <Scoreboard class="mb-44"/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {Component, Vue} from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/landing/Footer.vue';
import Hero from '@/components/competitions/first_competition/scoreboard/Hero.vue'
import Scoreboard from '@/components/competitions/first_competition/scoreboard/Scoreboard.vue'

@Component({
  components: {
    Header,
    Footer,
    Hero,
    Scoreboard,
  },
  metaInfo(this: FirstCompetitionScoreboard): MetaInfo {
    return {
      title: "TradingLab - Crypto Competition Scoreboard",
      meta: [
        { charset: 'utf-8' },
        { name: 'keyword', content: 'crypto, trading, community, competition, giveaway' },
        { name: 'description', content: "TradingLab's crypto community can join the first crypto giveaway competition."},
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:url', content: 'https://www.tradinglab.xyz/crypto_competition/guess_btc_price/scoreboard'},
        {name: 'twitter:title', content: 'TradingLab - Crypto Community Giveaway Competition'},
        {name: 'twitter:description', content: "TradingLab's crypto community can join the first crypto giveaway competition."},
        {name: 'twitter:image', content: 'https://tradinglab.xyz/img/logo.181ac5cb.png'},
        {property: 'og:title', content: 'TradingLab - Crypto Community Giveaway Competition'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://www.tradinglab.xyz/crypto_competition/guess_btc_price/scoreboard'},
        {property: 'og:description', content: "TradingLab's crypto community can join the first crypto giveaway competition."},
        {property: 'og:image', content: 'https://tradinglab.xyz/img/logo.181ac5cb.png'}
      ]
    };
  },
})
export default class FirstCompetitionScoreboard extends Vue {
  partecipants: object = [];
  async created() {
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
        this.partecipants = response.data;
      }
    }).catch(function(error) {
      console.log(error);
    })
  }
}
</script>
