<template>
  <div class="py-20 bg-universe">
    <svg height="80" viewBox="0 0 500 120" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,120 L500,0 500,120"/>
    </svg>
    <div class="text-6xl font-bold text-center bg-magentashine py-4">
      FAQ
    </div>
    <div
      v-for="faq in faqs"
      :key="faq.question"
      class="flex flex-col align-middle items-center p-5 rounded bg-magentashine">
      <div
        @click="toggle(faq)"
        class="my-1 font-semibold xs:text-center sm:text-left xs:text-3xl sm:text-4xl space-x-4">
        <span v-if="!faq.toggle" class="w-8 h-8 font-bold text-center text-white">
          +
        </span>
        <span v-else class="w-8 h-8 font-bold text-center text-white">
          -
        </span>
        <span>
          {{ faq.question }}
        </span>
      </div>
      <div v-if="faq.toggle" class="my-4 xs:text-2xl sm:text-4xl text-center mx-20">
        {{ faq.answer }}
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
      },
      modify : {
        toggle: false,
        question: "Can I modify or delete my prediction?",
        answer: "Yes, on this exact page you can modify or delete your prediction.",
      },
      distribution : {
        toggle: false,
        question: "When will be the prizes distrubuted?",
        answer: "All the prizes will be ditributed within a week since the end of the competition.",
      },
      polygon : {
        toggle: false,
        question: "How can I add polygon on my Metamask?",
        answer: "Please follow the official guide on https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/",
      },
      profilePicture : {
        toggle: false,
        question: "How can I add a profile picure?",
        answer: "Once you connect to TradingLab with your wallet, on the top right under the section Settings you will easily be able to add a profile picture.",
      },
      millionToken : {
        toggle: false,
        question: "What is Million Token?",
        answer: "Million Token is an innovative cryptocurrency with solid tokenomics, read more on milliontoken.org",
      },
      labToken : {
        toggle: false,
        question: "What is LAB Token?",
        answer: "LAB is the native token of TradingLab, find more on https://polygonscan.com/token/0x01962c00c783ce44c5b031c07435f2dc4a627394",
      },
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
