<template>
  <div>
    <div class="sticky top-0 z-50 border-b-2 bg-header grid grid-cols-12 gap-4">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <div class="flex justify-between p-4 ml-10">
          <div class="flex items-center">
            <router-link to="/" class="">
              <img src="../assets/logo.png" width="50" alt="Logo" class="mr-2">
            </router-link>
          </div>
          <div class="hidden md:block">
            <ConnectWallet/>
          </div>
        </div>
        <div class="col-span-2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import ConnectWallet from '@/components/ConnectWallet.vue';

  @Component({
    components: {
      ConnectWallet
    }
  })
  export default class Header extends Vue {
  }
</script>
