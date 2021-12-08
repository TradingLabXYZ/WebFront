<template>
  <div class="sticky top-0 z-50 bg-header">
    <div class="flex flex-row items-center justify-center justify-around p-4">
      <router-link to="/">
        <img src="@/assets/logo.png" width="50" alt="Logo">
      </router-link>
      <div>
        <Connect/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Connect from '@/components/header/btns/Connect.vue';
  @Component({
    components: {
      Connect
    }
  })
  export default class Header extends Vue {}
</script>
