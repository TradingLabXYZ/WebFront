<template>
  <router-view class="font-montserrat"></router-view>
</template>

<script>
  import idb from "@/db/idb.js"
  export default {
    async mounted() {
      if(document.cookie.indexOf("sessionId") > -1) {
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
