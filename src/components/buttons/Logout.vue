<template>
  <button
    @click="logout"
    class="p-2 mr-2 text-gray-700 rounded-full hover:text-gray-900 hover:bg-red-200">
    Logout
  </button>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch("loginModule/clearLocalStorage");
        this.$store.dispatch("loginModule/delSessionId");
        this.$store.dispatch("loginModule/delUsername");
        this.$router.push({ name: "Home" });
      },
    }
  }
</script>

