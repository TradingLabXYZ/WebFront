<template>
  <div class="py-20 bg-universe">
    <svg height="80" viewBox="0 0 500 120" preserveAspectRatio="none" class="fill-current text-magentashine">
      <path d="M0,120 L500,0 500,120"/>
    </svg>
    <div class="text-3xl font-bold text-center bg-magentashine py-4">
      FAQ
    </div>
    <div
      v-for="faq in faqs"
      :key="faq.question"
      class="flex flex-col align-middle items-center p-5 rounded bg-magentashine">
      <div
        @click="toggle(faq)"
        class="my-1 font-semibold xs:text-center sm:text-left xs:text-2xl sm:text-4xl space-x-4">
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
      legit: {
        toggle: false,
        question: "Is this a scam or is it legit",
        answer: "Our users are the most important asset we have, we will never harm you.",
      },
      connect: {
        toggle: false,
        question: "Is connecting my wallet safe?",
        answer: "Yes, you can safely connect your wallet, we will not ask you any further action.",
      },
      why: {
        toggle: false,
        question: "Why do I need to connect my wallet?",
        answer: "Since we do not ask you an email, your wallet is the only way we have to store your vote.",
      },
      smartContract : {
        toggle: false,
        question: "Do you use smart contracts?",
        answer: "No, competition's data are stored in a regular database.",
      },
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
        question: "When will be the prizes distributed?",
        answer: "All the prizes will be distributed within a week since the end of the competition.",
      },
      polygon : {
        toggle: false,
        question: "How can I add polygon on my Metamask?",
        answer: "Please follow the official guide on https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/",
      },
      profilePicture : {
        toggle: false,
        question: "How can I add a profile picture?",
        answer: "Connect to TradingLab with your wallet and visit the Settings section..",
      },
      millionToken : {
        toggle: false,
        question: "What is Million Token?",
        answer: "Million Token is an cryptocurrency with solid tokenomics, read more on milliontoken.org",
      },
      labToken : {
        toggle: false,
        question: "What is LAB Token?",
        answer: "LAB is the native token of TradingLab, check the link at the bottom of this page",
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
