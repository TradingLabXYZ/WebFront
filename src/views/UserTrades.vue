<template>
  <div>
    <Header/>
    <TradeHero/>
    <TradeOpen/>
    <TradeClose/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from "axios";
  export default {
    created: function() {
      this.$store.dispatch(
        "tradesModule/getTrades",
        this.$route.params.username
      ); 
    }
  }
</script>
