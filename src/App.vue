<template>
  <div class="fluid" v-if="sessionId">
    <UserTrades/>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import UserTrades from "./views/UserTrades.vue"
  export default {
    components: {
      UserTrades
    },
    computed: {
      ...mapState("loginModule", ["sessionId"])
    },
    mounted: function() {
      if(localStorage.getItem("sessionId") !== null) {
        var username = localStorage.getItem("username");
        this.$store.dispatch("tradesModule/getTrades", true);
        this.$store.dispatch("tradesModule/getTrades", false);
        this.$router.push({
          name: "UserTrades",
          params: {
            username: username
          }
        })
      }
      else {
        this.$router.push({ name: "HomeOut" })
      }
    }
  }
</script>
