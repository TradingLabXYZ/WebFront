<template>
  <div>
    <div class="absolute flex flex-row justify-between w-full">
      <div>
        <svg class="fill-current xs:h-20 sm:h-32 xs:w-20 sm:w-80 text-magentashine">
          <ellipse cx="0%" cy="0%" rx="100%" ry="100%"/>
        </svg>
      </div>
      <div>
        <svg class="fill-current xs:h-20 sm:h-32 xs:w-20 sm:w-80 text-azure">
          <ellipse cx="100%" cy="50%" rx="30%" ry="50%"/>
        </svg>
        <svg class="fill-current xs:h-20 sm:h-32 xs:w-20 sm:w-80 text-deepmagenta">
          <ellipse cx="110%" cy="50%" rx="30%" ry="50%"/>
        </svg>
      </div>
    </div>
    <div class="flex flex-col justify-center text-center text-gray-300 xs:py-28 sm:py-52 bg-blueshine diagonal-box">
      <div class="xs:text-2xl sm:text-4xl">
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
  import { Vue, Component, Prop } from 'vue-property-decorator';
  @Component({})
  export default class Hero extends Vue {
  }
</script>
