<template>
  <div class="mt-12 border-8 border-magentashine">
    <div class="flex flex-col text-center py-36 space-y-4">
      <div class="text-4xl">
        insert your prediction in USD $
      </div>
      <div class="flex flex-col items-center align-middle">
        <input
          type="number"
          placeholder="Prediction"
          class="p-2 text-5xl text-center text-black border border-gray-200 border-gray-500 w-96 bg-cream"
          v-model="prediction">
      </div>
      <div>
        <button
          class="inline-block p-4 mt-2 text-3xl font-bold rounded hover:bg-blueshine bg-magentashine">
          SUBMIT YOUR PREDICTION
        </button>
      </div>
    </div>
  </div>
</template>
