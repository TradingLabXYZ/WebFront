<template>
  <div class="flex flex-col -mt-20 bg-verysoftcyan justify-evenly pb-44">
    <div class="flex justify-center xs:flex-col sm:flex-row mt-44">
      <div class="flex flex-col items-center p-12 align-middle">
        <div>
          <img src="@/assets/feature_simple.png" alt="Simple">
        </div>
        <div class="text-3xl font-bold">
          Simple
        </div>
        <div class="text-xl text-center">
          A comprenshive, <br>intuitive and<br>user friendly interface
        </div>
      </div>
      <div class="flex flex-col items-center p-12 align-middle">
        <div>
          <img src="@/assets/feature_decentralized.png" alt="Decentralized">
        </div>
        <div class="text-3xl font-bold">
          Decentralized
        </div>
        <div class="text-xl text-center">
          Login with your<br>favourite wallet<br>and be ready to go
        </div>
      </div>
    </div>
    <div class="flex justify-center xs:flex-col sm:flex-row mt-44">
      <div class="flex flex-col items-center p-12 align-middle">
        <div>
          <img src="@/assets/feature_secure.png" alt="Secure">
        </div>
        <div class="text-3xl font-bold">
          Secure
        </div>
        <div class="text-xl text-center">
          Platform and smart contracts<br>are safe by design
        </div>
      </div>
      <div class="flex flex-col items-center p-12 align-middle">
        <div>
          <img src="@/assets/feature_profitable.png" alt="Profitable">
        </div>
        <div class="text-3xl font-bold">
          Profitable
        </div>
        <div class="text-xl text-center">
          Earn crypto <br>letting other users<br>watching your portfolio
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component({})
  export default class Share extends Vue {}
</script>
<style>
  svg {
    width: 100%;
  }
</style>
