
<template>
  <div class="min-h-screen bg-universe text-cream">
    <Header/>
    <Hero/>
    <Countdown class="mb-44"/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/landing/Footer.vue';
import Hero from '@/components/competitions/first_competition/Hero.vue'
import Countdown from '@/components/competitions/first_competition/Countdown.vue'

@Component({
  components: {
    Header,
    Footer,
    Hero,
    Countdown,
  },
})
export default class FirstCompetition extends Vue {
  isMobile = false;
  checkIfMobile() {
    if ( screen.width <= 800 ) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
</script>
