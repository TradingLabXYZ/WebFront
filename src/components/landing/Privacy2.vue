<template>
  <div class="flex flex-col items-center -mt-20 align-middle bg-lagune">
    <div class="pt-40 text-6xl font-medium">
      Even more <span id="blur">privacy</span>
    </div>
    <div class="p-10 text-2xl">
      Granulary control external visibility of your portfolio
    </div>
    <div class="flex flex-row text-4xl space-x-6">
      <div class="flex flex-col justify-around space-y-4">
        <div>
          Number of trades
        </div>
        <div>
          $ Portfolio
        </div>
        <div>
          $ Return
        </div>
        <div>
          Quantities
        </div>
      </div>
      <div class="flex flex-col justify-around space-y-4">
        <div>
          <input type="checkbox" v-model="numberTrades" class="w-8 h-8"> 
        </div>
        <div>
          <input type="checkbox" v-model="sizePortfolio" class="w-8 h-8"> 
        </div>
        <div>
          <input type="checkbox" v-model="sizeReturn" class="w-8 h-8"> 
        </div>
        <div>
          <input type="checkbox" v-model="quantities" class="w-8 h-8"> 
        </div>
      </div>
      <div class="flex flex-col justify-around space-y-4">
        <div>
          <div v-if="numberTrades">
            12
          </div>
          <div v-else>
            /
          </div>
        </div>
        <div>
          <div v-if="sizePortfolio">
            47'837
          </div>
          <div v-else>
            /
          </div>
        </div>
        <div>
          <div v-if="sizeReturn">
            35.6%
          </div>
          <div v-else>
            /
          </div>
        </div>
        <div>
          <div v-if="quantities">
            0.98 BTC
          </div>
          <div v-else>
            /
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Privacy1 extends Vue {
    numberTrades= true;
    sizePortfolio= false;
    sizeReturn= true;
    quantities= false;
  }
</script>
<style>
  #blur {
    color: transparent;
    text-shadow: 0 0 15px #000;
  }
</style>
