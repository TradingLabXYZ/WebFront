<template>
  <div class="sticky top-0 z-50 bg-header xs:h-16 sm:h-20 md:h-24">
    <div class="flex flex-row items-center justify-around p-4">
      <router-link to="/">
        <img src="@/assets/logo.png" class="xs:h-10 md:h-16" alt="Logo">
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
