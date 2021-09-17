<template>
    <div class="grid grid-cols-12 gap-4 bg-white border-b-2 sticky top-0 z-50">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <div class="ml-10 p-4 flex justify-between">
          <!-- LEFT SIDE !-->
          <div class="flex items-center">
            <router-link to="/" class="">
              <img src="/src/assets/logo_complimenti.png" width="50" alt="Logo" class="mr-2">
            </router-link>
          </div>
          <!-- RIGHT SIDE -->
          <div class="hidden md:block">
            <router-link to="/" class="inline-block p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 mr-2">
              Home
            </router-link>
            <router-link to="/login" class="inline-block p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200 mr-2">
              Login
            </router-link>
            <router-link to="/register" class="inline-block py-2 px-4 text-blue-700 bg-blue-400 hover:bg-blue-300 hover:text-blue-800 rounded">
              Register
            </router-link>
          </div>
      </div>
      <div class="col-span-2"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
