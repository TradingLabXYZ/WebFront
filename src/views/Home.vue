<template>
  <div>
    <Header/>
    <Survey/>
    <Hero/>
    <svg v-if="isMobile" height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,80 500,0"/>
    </svg>
    <svg v-else height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,20 500,0"/>
    </svg>
    <Share/>
    <svg v-if="isMobile" height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L500,0 500,80"/>
    </svg>
    <svg v-else height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L500,0 500,20"/>
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
    <svg v-if="isMobile" height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L0,80 500,0"/>
    </svg>
    <svg v-else height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L0,20 500,0"/>
    </svg>
    <More/>
    <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,3 500,3 500,0"/>
    </svg>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import Survey from '@/components/landing/Survey.vue';
  import Hero from '@/components/landing/Hero.vue';
  import Share from '@/components/landing/Share.vue';
  import Features from '@/components/landing/Features.vue';
  import Privacy1 from '@/components/landing/Privacy1.vue';
  import Privacy2 from '@/components/landing/Privacy2.vue';
  import LearnEarn from '@/components/landing/LearnEarn.vue';
  import More from '@/components/landing/More.vue';
  import Footer from '@/components/landing/Footer.vue';

  @Component({
    components: {
      Header,
      Survey,
      Hero,
      Share,
      Features,
      Privacy1,
      Privacy2,
      LearnEarn,
      More,
      Footer
    },
  })
  export default class Home extends Vue {
    isMobile = false;
    checkIfMobile() {
      if( screen.width <= 800 ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  }
</script>
