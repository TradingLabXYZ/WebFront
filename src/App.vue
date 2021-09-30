<template>
  <router-view class="font-montserrat"></router-view>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState("loginModule", ["sessionId"])
    },
    mounted: function() {
      if(localStorage.getItem("sessionId") !== null) {
        this.$store.dispatch("loginModule/setSessionId", localStorage.getItem("sessionId"));
        this.$store.dispatch("loginModule/setUsername", localStorage.getItem("username"));
        this.$store.dispatch("loginModule/setProfilePicture", localStorage.getItem("profilePicture"));
      }
    }
  }
</script>
