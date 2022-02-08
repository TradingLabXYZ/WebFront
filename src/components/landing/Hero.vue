<template>
  <div>
    <div class="flex flex-col justify-center text-center text-gray-300 xs:py-28 sm:py-52 bg-blueshine">
      <div class="p-2 tracking-widest sm:text-4xl xs:text-3xl">
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
    <div id="triangle-topleft">
      OK
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Hero extends Vue {}
</script>
<style>
    #triangle-topleft {
      background-color: blue;
      width: 0;
      height: 0;
      border-top: 100px solid red;
      border-right: 100px solid transparent;
    }
</style>
