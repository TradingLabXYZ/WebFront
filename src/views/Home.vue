<template>
  <div class="home">
    <h1>Test</h1>
    <Header/>
    <Hero/>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import Hero from '@/components/landing/Hero.vue';
  import Footer from '@/components/landing/Footer.vue';

  @Component({
    components: {
      Header,
      Hero,
      Footer
    },
  })
  export default class Home extends Vue {}
</script>
