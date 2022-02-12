<template>
  <div class="flex flex-col items-center -mt-20 align-middle bg-azure py-44 xs:space-y-2 sm:space-y-12">
    <div class="xs:text-4xl sm:text-6xl">
      There is more!
    </div>
    <div class="font-light xs:text-2xl sm:text-4xl xs:space-y-4 sm:space-y-10">
      <div class="flex items-center justify-center xs:flex-col sm:flex-row space-x-2">
        <div>
          Check out our whitepaper
        </div>
        <div>
          <button>
            <a href="https://github.com/TradingLabXYZ/Docs/tree/main/Whitepaper" target="_blank">
              <svg class="h-12" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="black"/>
              </svg>
            </a>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Privacy1 extends Vue {
    selectedMode = 'learn';
    selectMode(mode: string) {
      this.selectedMode = mode;
    }
  }
</script>
