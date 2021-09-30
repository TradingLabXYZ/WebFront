<template>
  <div>
    <Header/>
    <div v-if="isTradesDisabled">
      <div class="flex h-screen">
        <div class="m-auto">
          <span v-if="disabledReason=='login'">
            <h1>You need to login to visualise user's profile</h1>
          </span>
          <span v-if="disabledReason=='private'">
            <h1>It seems this user does like to keep things private</h1>
          </span>
          <span v-if="disabledReason=='follow'">
            <h1>You need to follow this user to visualise the profile</h1>
          </span>
          <span v-if="disabledReason=='subscribe'">
            <h1>You need to subscribe to visualise the profile</h1>
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <TradeHero/>
      <TradeOpen/>
      <TradeClose/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from "axios";
  export default {
    computed: {
      ...mapState("tradesModule", ["isTradesDisabled", "disabledReason"])
    },
    created: function() {
      this.$store.dispatch(
        "tradesModule/getTrades",
        this.$route.params.username
      ); 
    }
  }
</script>
