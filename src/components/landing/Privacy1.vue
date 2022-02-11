<template>
  <div class="flex flex-col items-center -mt-20 align-middle bg-softlagune">
    <div class="pt-40 font-medium xs:text-4xl sm:text-4xl">
      Privacy, done right
    </div>
    <div class="p-10 text-2xl text-center">
      Choose a privacy mode that suits you the best
    </div>
    <div class="flex flex-row space-x-4">
      <div
        class=""
        v-for="(sentence, mode) in modes"
        :key="mode">
        <button
          @click="selectMode(mode)"
          class="p-3 border border-gray-600 rounded-full"
          :class="selectedMode==mode ? 'bg-blue-800' : 'bg-blue-200'">
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center pt-10 pb-40 align-middle">
      <div class="mt-4 text-3xl">
        {{ selectedMode }}
      </div>
      <div class="text-center xs:text-md sm:text-xl">
        {{ modes[selectedMode] }}
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Privacy1 extends Vue {
    selectedMode = 'Private';
    modes = {
      'Private': 'Only you and nobody else can see your profile',
      'All': 'Everyone can access and see your profile',
      'Followers': 'Only the users following you will see your profile',
      'Subscribers': 'Only the users subscribing you will see your profile',
    }
    selectMode(mode: string) {
      this.selectedMode = mode;
    }
  }
</script>
