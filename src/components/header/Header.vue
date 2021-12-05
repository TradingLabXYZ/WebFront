<template>
  <div class="sticky top-0 z-50 bg-header">
    <div class="flex flex-row items-center justify-center justify-between p-4 header-responsive">
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

<style>
  @responsive {
    .header-responsive {
      @apply sm:ml-10;
      @apply md:ml-52;
      @apply lg:ml-80;
      @apply sm:mr-10;
      @apply md:mr-52;
      @apply lg:mr-80;
    }
  }
</style>
