<template>
  <div class="items-center justify-center h-auto m-40 grid grid-cols-5">
    <div class="col-span-2">
      <h2 class="text-4xl text-6xl">Embrace Crypto Trading</h2>
      <p class="mt-6 mb-6 text-2xl">Get the most out of it</p>
    </div>
    <div class="ml-24 col-span-3">
      <div class="p-6 grid grid-cols-4 grid-rows-4">
        <img src="../assets/eth.webp" alt="Ethereum" class="p-6 blob_1">
        <img src="../assets/dot.webp" alt="Polkadot" class="p-6 blob_2">
        <img src="../assets/link.webp" alt="Chainlin" class="p-6 blob_1">
        <img src="../assets/algo.webp" alt="Algorand" class="p-6 blob_2">
        <img src="../assets/sol.webp" alt="Solana" class="p-6 blob_1">
        <img src="../assets/btc.png" alt="Bitcoin" class="p-6 blob_2 row-span-2 col-span-2">
        <img src="../assets/matic.webp" alt="Matic" class="p-6 blob_2">
        <img src="../assets/ada.webp" alt="Cardano" class="p-6 blob_1">
        <img src="../assets/uni.webp" alt="Uniswap" class="p-6 blob_2">
        <img src="../assets/bnb.webp" alt="Binance" class="p-6 blob_1">
        <img src="../assets/ltc.webp" alt="Litecoin" class="p-6 blob_2">
        <img src="../assets/xmr.webp" alt="Monero" class="p-6 blob_1">
        <img src="../assets/enj.webp" alt="Enji" class="p-6 blob_2">
      </div>
    </div>
  </div>
</template>

<style>
  .blob_1 {
    animation: pulse_1 3.5s infinite;
  }
  @keyframes pulse_1 {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
  .blob_2 {
    animation: pulse_2 3s infinite;
  }
  @keyframes pulse_2 {
    0% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(0.95);
    }
  }
</style>
