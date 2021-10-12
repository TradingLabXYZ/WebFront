<template>
  <div class="home">
    <Header/>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <Hero/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/Header.vue';
  import Hero from '@/components/Hero.vue';
  import Footer from '@/components/Footer.vue';

  @Component({
    components: {
      Header,
      Hero,
      Footer
    },
  })
  export default class Home extends Vue {}
</script>
