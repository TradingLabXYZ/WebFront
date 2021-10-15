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
      let requestId = (Math.random() + 1).toString(36).substring(2);
      let ws_url = [
        process.env.VUE_APP_WS_URL,
        'get_trades',
        username,
        requestId
      ].join('/');
      let ws = new WebSocket(ws_url);
      ws.onmessage = (event) => {
        var ws_data = JSON.parse(event.data);
        this.userTrades = ws_data;
      }
    }
  }
</script>

