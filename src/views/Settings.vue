<template>
  <div>
    <Header/>
    <div class="mt-5 mb-5 text-2xl text-center">My Settings</div>
    <div class="h-screen grid grid-cols-12 gap-10">
      <div class="col-span-3"></div>
      <div class="border-r-2 col-span-1">
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='profile' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('profile')">
          Profile
        </div>
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='password' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('password')">
          Password
        </div>
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='privacy' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('privacy')">
          Privacy
        </div>
        <div
          class="px-2 py-2 pr-12 mr-1 rounded-md text-xol"
          :class="settingsSection=='plan' ? 'bg-tradehero text-white font-semibold' : 'bg-white'"
          @click="changeSettingsSection('plan')">
          Plan
        </div>
      </div>
      <div class="col-span-4">
        <section v-if="settingsSection=='profile'">
          <Profile/>
        </section> 
        <section v-if="settingsSection=='password'">
          <Password/>
        </section> 
        <section v-if="settingsSection=='privacy'">
          <Privacy/>
        </section> 
        <section v-if="settingsSection=='plan'">
          <Plans/>
        </section> 
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapState } from 'vuex';
  export default {
    data: function() {
      return {
        settingsSection: "profile",
      }
    },
    created: function() {
      this.$store.dispatch("settingsModule/getUserSettings");
    },
    methods: {
      changeSettingsSection(section) {
        this.settingsSection = section;
      }
    }
  }
</script>

