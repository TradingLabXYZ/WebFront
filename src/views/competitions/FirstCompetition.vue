
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
})
export default class FirstCompetition extends Vue {}
</script>
