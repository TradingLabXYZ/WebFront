<template>
  <div v-if="isSectionVisible" class="bg-green-200">
    <div class="flex items-center justify-center text-center align-middle xs:text-xs sm:text-sm">
      A minute to help us?
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLScDVra6sDmsA7Vf6s9sp55gH1D5Wjd0rBK9w6KGBi3qnsxejg/viewform"
        target="_blank">
        <button class="font-bold text-blue-800 bg-blue-200 border border-blue-600 rounded xs:m-1 xs:p-1 sm:p-2 sm:m-2 hover:bg-blue-400 xs:text-xs sm:text-sm">
          Take me to the survey
        </button>
      </a>
      <button
        v-on:click="toggleVisibility"
        class="sm:ml-12 xs:ml-4">
        <CloseX/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import CloseX from '@/components/svg/CloseX.vue';
  @Component({
    components: {
      CloseX
    }
  })
  export default class Survey extends Vue {
    isSectionVisible = true;
    toggleVisibility() {
     this.isSectionVisible = false; 
    }
  }
</script>
