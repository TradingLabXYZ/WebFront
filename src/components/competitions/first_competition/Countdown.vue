<template>
  <div class="py-20 bg-universe">
    <svg height="80" viewBox="0 0 500 120" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,120 L500,0 500,120"/>
    </svg>
    <div class="py-20 text-center bg-blueshine space-y-6">
      <div class="xs:text-3xl sm:text-5xl">
        submbission ends in
      </div>
      <div class="xs:text-4xl sm:text-8xl">
        {{ countDownValue }}
      </div>
    </div>
    <svg height="80" viewBox="0 0 500 120" preserveAspectRatio="none" class="fill-current text-blueshine">
      <path d="M0,0 L0,120 500,0"/>
    </svg>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component({})
export default class Countdown extends Vue {
  countDownValue = ''
  created() {
    this.countDownTimer();
  }
  countDownTimer() {
    const countDownDate = new Date('Apr 30, 2022 23:59:59').getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.countDownValue = days + 'd ' + hours + 'h '+ minutes + 'm ' + seconds + 's ';
    setTimeout(() => {
      this.countDownTimer()
    }, 1000)
  }
}
</script>
