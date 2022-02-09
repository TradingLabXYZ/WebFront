<template>
  <div>
    <Header/>
    <Hero v-bind:isMobile="isMobile"/>
    <div class="">
      <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
        <path d="M0,0 L0,80 Q0,80 500,0 L500,0"/>
      </svg>
    </div>
    <!--
    <Share/>
    <div class="">
      <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-azure">
        <path d="M0,0 C0,80 500,80 500,0"/>
      </svg>
    </div>
    <Features/>
    <div class="">
      <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-magentashine">
        <path d="M0,0 C150,30 350,30 500,0"/>
      </svg>
    </div>
    <Privacy1/>
    <Privacy2/>
    -->
    <Footer/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import Hero from '@/components/landing/Hero.vue';
  import Share from '@/components/landing/Share.vue';
  import Features from '@/components/landing/Features.vue';
  import Privacy1 from '@/components/landing/Privacy1.vue';
  import Privacy2 from '@/components/landing/Privacy2.vue';
  import Footer from '@/components/landing/Footer.vue';

  @Component({
    components: {
      Header,
      Hero,
      Share,
      Features,
      Privacy1,
      Privacy2,
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
