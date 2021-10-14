<template>
  <div>
    <Header/>

    {{ userTrades }}

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/Header.vue';

  @Component({
    components: {
      Header
    }
  })
  export default class UserTrades extends Vue {

    private userTrades: object = {};
    
    created() {
      this.initialiseTradesWs();
    }
    initialiseTradesWs() {
      let username = this.$route.params['username'];
      let ws = new WebSocket(process.env.VUE_APP_WS_URL + '/get_trades/' + username);
      ws.onmessage = (event) => {
        var ws_data = JSON.parse(event.data);
        this.userTrades = ws_data;
        console.log(this.userTrades);
      }
    }
  }
</script>

