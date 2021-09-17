<template>
  <div class="fluid" v-if="token">
    <HomeIn/>
  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import HomeIn from './views/HomeIn.vue'
  export default {
    components: {
      HomeIn
    },
    computed: {
      ...mapState("loginModule", ["token"])
    },
    mounted: function() {
      if(localStorage.getItem('user_token') !== null) {
        this.$store.dispatch("loginModule/setToken")
        this.$router.push({ name: 'HomeIn' })
      }
      else {
        this.$router.push({ name: 'HomeOut' })
      }
    },
  }
</script>
