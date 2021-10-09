<template>
  <router-view class="font-montserrat"></router-view>
</template>

<script>
  import { mapState } from "vuex";
  import idb from "@/db/idb.js"
  export default {
    computed: {
      ...mapState("loginModule", ["sessionId"])
    },
    async mounted() {
      if(document.cookie.match('(^|;)\\s*sessionId\\s*=\\s*([^;]+)')?.pop() || '' != "") {
        var session_id = document.cookie.split("sessionId=")[1].split(";")[0];
        var userData = await idb.getUser(session_id);
        this.$store.dispatch("loginModule/setSessionId", session_id);
        this.$store.dispatch("loginModule/setUsername", userData.Username);
        this.$store.dispatch("loginModule/setUsercode", userData.Usercode);
        this.$store.dispatch("loginModule/setProfilePicture", userData.ProfilePicture);
      }
    }
  }
</script>
