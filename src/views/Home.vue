<template>
  <div>
    <Header/>
    <Hero/>
    <div class="">
      <svg height="80" viewBox="0 0 500 80" preserveAspectRatio="none" class="fill-current text-blueshine">
        <path d="M0,0 L0,80 Q0,80 500,0 L500,0"/>
      </svg>
    </div>
    <Share/>
    <svg height="10" viewBox="0 0 500 80" preserveAspectRatio="none" fill="none">
      <path d="M0 0h1447v80C415.787 23.354 371.257 32.795 0 80V0Z" fill="#C901A1"/>
    </svg>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import Hero from '@/components/landing/Hero.vue';
  import Share from '@/components/landing/Share.vue';
  import Footer from '@/components/landing/Footer.vue';

  @Component({
    components: {
      Header,
      Hero,
      Share,
      Footer
    },
  })
  export default class Home extends Vue {}
</script>
