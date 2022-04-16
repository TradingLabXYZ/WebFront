<template>
  <div class="flex flex-col items-center -mt-20 align-middle bg-gradient-to-br from-universelight via-universe to-universe pb-44 text-cream">
    <h2 class="pt-40 font-medium text-center xs:text-4xl sm:text-6xl">
      Even more <span id="blur">privacy</span>
    </h2>
    <h3 class="p-10 text-2xl text-center space-y-8">
      Granulary control external visibility of your portfolio
    </h3>
    <div class="flex flex-row xs:text-xl sm:text-4xl xs:space-x-5 sm:space-x-20">
      <div class="flex flex-col justify-around space-y-4">
        <div @click="switchNumberTrades()">
          <div v-if="numberTrades">
            <BlueDot/>
          </div>
          <div v-else>
            <MagentaDot/>
          </div>
        </div>
        <div @click="switchSizePortfolio()">
          <div v-if="sizePortfolio">
            <BlueDot/>
          </div>
          <div v-else>
            <MagentaDot/>
          </div>
        </div>
        <div @click="switchSizeReturn()">
          <div v-if="sizeReturn">
            <BlueDot/>
          </div>
          <div v-else>
            <MagentaDot/>
          </div>
        </div>
        <div @click="switchQuantities()">
          <div v-if="quantities">
            <BlueDot/>
          </div>
          <div v-else>
            <MagentaDot/>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-around space-y-4">
        <div>
          # trades
        </div>
        <div>
          $ Portfolio
        </div>
        <div>
          % Return
        </div>
        <div>
          Quantities
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
            4'837
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
            0.9 ₿
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
  import BlueDot from '@/components/svg/BlueDot.vue';
  import MagentaDot from '@/components/svg/MagentaDot.vue';
  @Component({
    components: {
      BlueDot,
      MagentaDot
    }
  })
  export default class Privacy1 extends Vue {
    numberTrades= true;
    sizePortfolio= false;
    sizeReturn= true;
    quantities= false;
    switchNumberTrades() {
      this.numberTrades = this.numberTrades ? false : true;
    }
    switchSizePortfolio() {
      this.sizePortfolio = this.sizePortfolio ? false : true;
    }
    switchSizeReturn() {
      this.sizeReturn = this.sizeReturn ? false : true;
    }
    switchQuantities() {
      this.quantities = this.quantities ? false : true;
    }
  }
</script>
<style>
  #blur {
    color: transparent;
    text-shadow: 0 0 15px white;
  }
</style>
