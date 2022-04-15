<template>
  <div class="min-h-screen bg-universe text-cream pb-20">
    <Header/>
    <Hero/>
    <Rank class="mb-44"/>
    <Footer/>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/components/header/Header.vue';
import Footer from '@/components/landing/Footer.vue';
import Hero from '@/components/competitions/first_competition/rank/Hero.vue'
import Rank from '@/components/competitions/first_competition/rank/Rank.vue'

@Component({
  components: {
    Header,
    Footer,
    Hero,
    Rank,
  },
})
export default class FirstCompetition extends Vue {
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
