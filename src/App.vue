<template>
  <div class="fluid" v-if="sessionId">
    <HomeIn/>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import HomeIn from "./views/HomeIn.vue"
  export default {
    components: {
      HomeIn
    },
    computed: {
      ...mapState("loginModule", ["sessionId"])
    },
    mounted: function() {
      if(localStorage.getItem("sessionId") !== null) {
        this.$store.dispatch("tradesModule/getTrades", true);
        this.$store.dispatch("tradesModule/getTrades", false);
        this.$router.push({ name: "HomeIn" })
      }
      else {
        this.$router.push({ name: "HomeOut" })
      }
    }
  }
</script>
