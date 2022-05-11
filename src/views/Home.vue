<template>
  <div>
    <Header/>
    <Competition/>
    <Hero/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,50 500,0"/>
    </svg>
    <Share/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L500,0 500,50"/>
    </svg>
    <Features/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 C150,30 350,30 500,0"/>
    </svg>
    <Privacy1/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L0,3 500,3 500,0"/>
    </svg>
    <Privacy2/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,20 500,0"/>
      <path d="M0,0 L500,0 500,20"/>
    </svg>
    <LearnEarn/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L0,50 500,0"/>
    </svg>
    <Develop/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L500,0 500,50"/>
    </svg>
    <More/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,0 500,0 500,50"/>
    </svg>
    <Links/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,3 500,3 500,0"/>
    </svg>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { MetaInfo } from 'vue-meta';
  import Header from '@/components/header/Header.vue';
  import Competition from '@/components/banners/Competition.vue';
  import Hero from '@/components/landing/Hero.vue';
  import Share from '@/components/landing/Share.vue';
  import Features from '@/components/landing/Features.vue';
  import Privacy1 from '@/components/landing/Privacy1.vue';
  import Privacy2 from '@/components/landing/Privacy2.vue';
  import LearnEarn from '@/components/landing/LearnEarn.vue';
  import Develop from '@/components/landing/Develop.vue';
  import More from '@/components/landing/More.vue';
  import Links from '@/components/landing/Links.vue';
  import Footer from '@/components/landing/Footer.vue';

  @Component({
    components: {
      Header,
      Competition,
      Hero,
      Share,
      Features,
      Privacy1,
      Privacy2,
      LearnEarn,
      Develop,
      More,
      Links,
      Footer
    },
    metaInfo(this: Home): MetaInfo {
      return {
        title: "TradingLab - Crypto Community",
        meta: [
          { charset: 'utf-8' },
          { name: 'keyword', content: 'crypto, trading, community, portfolio' },
          { name: 'description', content: 'TradingLab aims to create a funny, entertaining, never ending user experience in which crypto passionate can converge, learning and earning from each others simply sharing their crypto portfolios.'},
          {name: 'twitter:card', content: 'summary'},
          {name: 'twitter:url', content: 'https://www.tradinglab.xyz'},
          {name: 'twitter:title', content: 'TradingLab - Crypto Community'},
          {name: 'twitter:description', content: 'TradingLab aims to create a funny, entertaining, never ending user experience in which crypto passionate can converge, learning and earning from each others simply sharing their crypto portfolios.'},
          {name: 'twitter:image', content: 'https://tradinglab.xyz/img/logo.181ac5cb.png'},
          {property: 'og:title', content: 'TradingLab - Crypto Community'},
          {property: 'og:type', content: 'website'},
          {property: 'og:url', content: 'https://www.tradinglab.xyz'},
          {property: 'og:description', content: 'TradingLab aims to create a funny, entertaining, never ending user experience in which crypto passionate can converge, learning and earning from each others simply sharing their crypto portfolios.'},
          {property: 'og:image', content: 'https://tradinglab.xyz/img/logo.181ac5cb.png'}
        ]
      };
    },
  })
  export default class Home extends Vue {}
</script>
