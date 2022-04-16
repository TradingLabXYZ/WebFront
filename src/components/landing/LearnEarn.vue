<template>
  <div class="flex flex-col items-center -mt-20 align-middle bg-universe text-cream pb-44">
    <div class="flex flex-row pt-40 font-medium xs:text-4xl sm:text-6xl xs:space-x-4 sm:space-x-8">
      <button
        @click="selectMode('learn')"
        class="p-3"
        :class="selectedMode=='learn' ? 'text-gray-800 bg-gray-100 rounded-md' : 'text-gray-200 font-thin'">
        Learn
      </button>
      <button
        @click="selectMode('earn')"
        class="p-3"
        :class="selectedMode=='earn' ? 'text-gray-800 bg-gray-100 rounded-md' : 'text-gray-200 font-thin'">
        Earn
      </button>
    </div>
    <div class="flex items-center justify-center pt-20 align-middle xs:flex-col sm:flex-row xs:space-x-0 sm:space-x-10 xs:space-y-10 sm:space-y-0">
      <div class="xs:p-1 sm:p-10">
        <img
          v-if="selectedMode=='learn'"
          src="@/assets/learn.png"
          class="xs:w-44 sm:w-80"
          alt="learn with TradingLab">
        <img v-else 
          src="@/assets/earn.png"
          class="xs:w-44 sm:w-80"
          alt="earn with TradingLab">
      </div>
      <div class="font-light xs:text-2xl sm:text-4xl xs:w-64 sm:w-8/12">
        <ul v-if="selectedMode=='learn'" class="list-disc list-inside">
          <li>
            Seamlessy track your investments
          </li>
          <li>
            Discover talented crypto influencers
          </li>
          <li>
            Evaluate <i>what if</i> scenarios
          </li>
          <li>
            Never lose control of your porfolio
          </li>
        </ul>
        <ul v-else class="list-disc list-inside">
          <li>
            Monetize your skills
          </li>
          <li>
            Autonomosly set your price 
          </li>
          <li>
            Create a new revenue stream
          </li>
        </ul>
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
