<template>
  <div>
    <div class="absolute">
      <svg height="300" width="6000" class="fill-current text-magentashine">
        <ellipse cx="1800" cy="10" rx="400" ry="250"/>
      </svg>
    </div>
    <div class="absolute">
      <svg height="300" width="5000" class="fill-current text-azure">
        <ellipse cx="1900" cy="-40" rx="200" ry="250"/>
      </svg>
    </div>
    <div class="absolute">
      <svg height="300" width="4000" class="fill-current text-deepmagenta">
        <ellipse cx="2000" cy="-60" rx="200" ry="250"/>
      </svg>
    </div>
    <div class="flex flex-col justify-center text-center text-gray-300 xs:py-28 sm:py-52 bg-blueshine diagonal-box">
      <div class="text-4xl">
        <span class="font-medium">H</span>
        <span class="italic">y</span>
        <span class="font-serif font-semibold">p</span>
        <span class="italic font-light">e</span>
        <span class="font-bold">r</span>
        <span> </span>
        <span class="font-light text-md">H</span>
        <span class="font-serif">y</span>
        <span class="font-black">b</span>
        <span class="italic font-light">r</span>
        <span class="font-mono">i</span>
        <span class="">d</span>
      </div>
      <div class="p-2 tracking-widest xs:text-3xl sm:text-6xl">
        Crypto Trading Community
      </div>
      <div class="flex flex-col items-center justify-center p-2 mt-6">
        <div class="text-xl font-light">
          Powered by
        </div>
        <img src="@/assets/moonbeam_logo.png" alt="Moonbeam">
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Hero extends Vue {}
</script>
<style>
  svg {
    width: 100%;
  }
</style>
