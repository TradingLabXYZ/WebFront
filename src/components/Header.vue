<template>
  <div v-if="!isSessionId" class="sticky top-0 z-50 border-b-2 bg-header grid grid-cols-12 gap-4">
    <div class="col-span-2"></div>
    <div class="col-span-8">
      <div class="flex justify-between p-4 ml-10">
        <div class="flex items-center">
          <router-link to="/" class="">
            <img src="/src/assets/logo.png" width="50" alt="Logo" class="mr-2">
          </router-link>
        </div>
        <div class="hidden md:block">
          <router-link to="/" class="inline-block p-2 mr-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200">
            Home
          </router-link>
          <router-link to="/login" class="inline-block p-2 mr-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200">
            Login
          </router-link>
          <router-link to="/register" class="inline-block px-4 py-2 text-blue-700 bg-blue-400 rounded hover:bg-blue-300 hover:text-blue-800">
            Register
          </router-link>
        </div>
    </div>
    <div class="col-span-2"></div>
  </div>
  </div>
    <div v-else class="sticky top-0 z-50 bg-header grid grid-cols-8">
      <div class="flex justify-end m-5 col-span-2">
        <router-link to="/">
          <img src="/src/assets/logo.png" width="70" alt="Logo" class="mr-2">
        </router-link>
        <span class="flex items-end text-2xl font-extrabold tracking-tight">
          TradingLab
        </span>
      </div>
      <div class="col-span-4"></div>
      <div class="flex justify-start mt-5 text-lg col-span-2">
        <span class="flex items-center text-lg font-extrabold tracking-tight">
          <ButtonLogout/>
        </span>
      <div class="col-span-2"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    data: function() {
      return {
        isSessionId: false,
      }
    },
    created: function() {
      if (this.$store.getters["loginModule/sessionId"]) {
        this.isSessionId = true;
      };
    }
  }
</script>
