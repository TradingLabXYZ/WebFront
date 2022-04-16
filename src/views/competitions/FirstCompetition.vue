<template>
  <div class="min-h-screen bg-universe text-cream">
    <Header/>
    <Hero/>
    <Countdown/>
    <Submit/>
    <Prizes/>
    <Rules/>
    <Faq class="mb-44"/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/landing/Footer.vue';
import Hero from '@/components/competitions/first_competition/Hero.vue'
import Countdown from '@/components/competitions/first_competition/Countdown.vue'
import Submit from '@/components/competitions/first_competition/Submit.vue'
import Prizes from '@/components/competitions/first_competition/Prizes.vue'
import Rules from '@/components/competitions/first_competition/Rules.vue'
import Faq from '@/components/competitions/first_competition/Faq.vue'

@Component({
  components: {
    Header,
    Footer,
    Hero,
    Countdown,
    Submit,
    Prizes,
    Rules,
    Faq,
  },
  metaInfo(this: FirstCompetition): MetaInfo {
    return {
      title: "TradingLab - Crypto Community Giveaway Competition",
      meta: [
        { charset: 'utf-8' },
        { name: 'keyword', content: 'crypto, trading, community, competition, giveaway' },
        { name: 'description', content: "TradingLab's crypto community can join the first crypto giveaway competition."},
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:url', content: 'https://www.tradinglab.xyz/crypto_competition/guess_btc_price'},
        {name: 'twitter:title', content: 'TradingLab - Crypto Community Giveaway Competition'},
        {name: 'twitter:description', content: "TradingLab's crypto community can join the first crypto giveaway competition."},
        {name: 'twitter:image', content: 'https://tradinglab.xyz/img/logo.181ac5cb.png'},
        {property: 'og:title', content: 'TradingLab - Crypto Community Giveaway Competition'},
        {property: 'og:type', content: 'website'},
        {property: 'og:url', content: 'https://www.tradinglab.xyz/crypto_competition/guess_btc_price'},
        {property: 'og:description', content: "TradingLab's crypto community can join the first crypto giveaway competition."},
        {property: 'og:image', content: 'https://tradinglab.xyz/img/logo.181ac5cb.png'}
      ]
    };
  },
})
export default class FirstCompetition extends Vue {}
</script>
