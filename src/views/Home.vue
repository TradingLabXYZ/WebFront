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
    <Footer/>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState("loginModule", ["sessionId"])
    },
    created: function() {
      if (this.$store.getters["loginModule/sessionId"]) {
        this.$router.push({
          name: "UserTrades",
          params: {
            username: this.$store.getters["loginModule/username"] 
          }
        })
      };
    }
  }
</script>
