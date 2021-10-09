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
  import idb from "@/db/idb.js"
  export default {
    computed: {
      ...mapState("loginModule", ["sessionId, username"])
    },
    async created() {
      if(document.cookie.match('(^|;)\\s*sessionId\\s*=\\s*([^;]+)')?.pop() || '' != "") {
        var session_id = document.cookie.split("sessionId=")[1].split(";")[0];
        var userData = await idb.getUser(session_id);
        this.$router.push({
          name: "UserTrades",
          params: {
            username: userData.Username
          }
        })
      };
    }
  }
</script>
