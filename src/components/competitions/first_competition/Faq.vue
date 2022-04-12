<template>
  <div class="py-20 bg-magentashine">
    <svg height="80" viewBox="0 0 500 120" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,120 L500,0 500,120"/>
    </svg>
    <div
      v-for="faq in faqs"
      :key="faq.name"
      class="p-5 m-5 rounded bg-sandpurple">
      <div
        @click="toggle(faq)"
        class="flex flex-row my-1 font-semibold text-left xs:text-xl sm:text-2xl space-x-4">
        <div v-if="!faq.toggle" class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded-full">
          +
        </div>
        <div v-else class="w-8 h-8 font-bold text-center text-white bg-gray-700 rounded-full">
          -
        </div>
        <div>
          {{ faq.question }}
        </div>
      </div>
      <div v-if="endpoint.toggle" class="mt-4">
        {{ endpoint.answer }}
      </div>
    </div>
    <svg height="80" viewBox="0 0 500 120" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,0 L0,120 500,0"/>
    </svg>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  @Component({})
  export default class Faq extends Vue {
    faqs = {
      contact: {
        toggle: false,
        question: "Where can I contact you?",
        answer: "Reach us on discord, you will find the link at the bottom of the page!",
      }
    }
    toggle(endpoint: object) {
      if (endpoint["toggle"]) {
        endpoint["toggle"] = false;
      } else {
        endpoint["toggle"] = true;
      }
    }
  }
</script>
