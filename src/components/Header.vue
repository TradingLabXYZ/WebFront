<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private testVariable!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
