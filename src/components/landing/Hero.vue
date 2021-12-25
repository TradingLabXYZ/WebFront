<template>
  <div>
    <div id="checkMouse" class="flex justify-center text-center text-gray-300 h-fit bgimgeffect">
      <div class="xs:py-28 sm:py-52">
        <div class="p-2 tracking-widest sm:text-5xl xs:text-3xl">
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
          Crypto Portfolio
        </div>
        <div class="flex flex-row justify-center p-2 mt-4">
          <div class="text-xl font-light">
            Powered by Polkadot
          </div>
          <div>
            <img src="@/assets/dot.webp" alt="Polkadot" class="w-4 top-6">
          </div>
        </div>
        <router-link to="/explore">
          <button class="inline-block px-10 py-2 mt-6 text-xl font-bold text-white rounded bg-magentashine">
            Explore
          </button>
        </router-link>
      </div>
    </div>
    <div class="flex justify-around py-16 font-extrabold text-center xs:space-y-3 sm:space-y-0 xs:text-3xl md:text-4xl xs:flex-col sm:flex-row h-fit bg-verysoftcyan text-deepmagenta">
      <div class="">
        Decentralised
      </div>
      <div class="">
        Open Source
      </div>
      <div class="">
        Innovative
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
  .bgimgeffect {
    background-image: url('~@/assets/background.png');
    background-size: 100% 100%;
  }
</style>
