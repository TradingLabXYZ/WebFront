<template>
  <div>
    <div class="mt-2">Your actual plan is: <b>{{ userPlan }}</b></div>
    <div v-if="userPlan == 'basic'">
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
    <div v-if="userPlan == 'premium'">
      <UserPremiumData/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from "axios";
  import { getModule } from 'vuex-module-decorators'
  import User from '@/store/userModule';
  const userStore = getModule(User)
  import { get, set } from 'idb-keyval';

  @Component({})
  export default class Privacy extends Vue {
    selectedUserPrivacy: string = '';
  }
</script>
