<template>
  <div class="mt-2">Your actual plan is: <b>{{ userPlan.Plan }}</b></div>
  <div v-if="userPlan.Plan == 'basic'">
    <div v-if="!isUpgradeToPremium">
      <button class="p-3 m-3 bg-green-400 hover:bg-green-600" @click="upgradeToPremium()">
        Upgrade to Premium
      </button>
    </div>
    <div v-else>
      Upgrading to premium..
    </div>
    <div v-if="isUpgradeToPremium">
      <UpgradeToPremium/>
    </div>
  </div>
  <div v-if="userPlan.Plan == 'premium'">
    MANAGE PREMIUM
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import axios from "axios";
  export default {
    data: function() {
      return {
        isUpgradeToPremium: false
      }
    },
    computed: {
      ...mapState("settingsModule", ["userPlan"])
    },
    methods: {
      upgradeToPremium() {
        if (!this.isUpgradeToPremium) {
          this.isUpgradeToPremium = true;
        } else {
          this.isUpgradeToPremium = false;
        }
      }
    }
  }
</script>
