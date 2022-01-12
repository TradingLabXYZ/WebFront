<template>
  <div>
    <Header/>
    SUBSCRIBE
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  @Component({
    components: {
      Header
    }
  })
  export default class Connections extends Vue {
  }
</script>
