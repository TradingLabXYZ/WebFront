<template>
  <div>
    <Header/>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <Hero/>
      </div>
      <div class="col-span-2"></div>
    </div>
    <div v-bind:class="{positiveday: score >= 0, negativeday: score < 0}" class="grid grid-cols-12">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <Moment :signalScore="score"/>
      </div>
      <div class="col-span-2"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState("loginModule", ["score"])
    },
    mounted: function() {
      this.$store.dispatch('loginModule/getScore')
    },
  }
</script>

<style>
  .positiveday {
    @apply bg-gradient-to-r from-green-300 via-green-400 to-green-300;
  }
  .negativeday {
    @apply bg-gradient-to-r from-red-300 via-red-400 to-red-300;
  }
</style>
