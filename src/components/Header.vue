<template>
  <div>
    <div v-if="!isSessionIdPresent" class="sticky top-0 z-50 border-b-2 bg-header grid grid-cols-12 gap-4">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <div class="flex justify-between p-4 ml-10">
          <div class="flex items-center">
            <router-link to="/" class="">
              <img src="../assets/logo.png" width="50" alt="Logo" class="mr-2">
            </router-link>
          </div>
          <div class="hidden md:block">
            <router-link to="/" class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark">
              Home
            </router-link>
            <router-link to="/login" class="inline-block p-2 mr-2 text-gray-800 rounded hover:bg-header-dark">
              Login
            </router-link>
          </div>
        </div>
        <div class="col-span-2"></div>
      </div>
    </div>
    <div v-else class="bg-header grid grid-cols-8">
      <div class="col-span-1"></div>
      <div class="flex justify-start mt-5 mb-3 col-span-2">
        <router-link to="/">
          <img src="../assets/logo.png" width="70" alt="Logo" class="mr-2">
        </router-link>
        <span class="flex items-end text-2xl font-extrabold tracking-tight">
          TradingLab
        </span>
      </div>
      <div class="col-span-3"></div>
      <div class="flex justify-end mt-5 text-lg col-span-1">
        <span class="flex items-center text-lg font-extrabold tracking-tight">
          <Logout/>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Logout from '@/components/Logout.vue';


  @Component({
    components: {
      Logout
    }
  })
  export default class Header extends Vue {

    public isSessionIdPresent: boolean = false;

    created() {
      if(document.cookie.indexOf("sessionId") > -1) {
        this.isSessionIdPresent = true;
      };
    }
  }
</script>
