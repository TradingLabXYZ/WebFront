<template>
  <div class="dark:bg-universe">
    <Header/>
    <div class="mt-5 mb-5 text-center xs:text-xl sm:text-2xl">My Settings</div>
    <div class="flex flex-col h-screen">
      <div class="flex flex-row justify-center mb-4">
        <div
          class="px-6 py-2 mr-1 text-xl border-2 rounded-md"
          :class="settingsSection=='profile' ? 'bg-blueshine text-white font-semibold dark:bg-magentashine' : 'bg-white dark:bg-deepgray dark:text-gray-200'"
          @click="changeSettingsSection('profile')">
          Profile
        </div>
        <div
          class="px-6 py-2 mr-1 text-xl border-2 rounded-md"
          :class="settingsSection=='privacy' ? 'bg-blueshine text-white font-semibold dark:bg-magentashine' : 'bg-white dark:bg-deepgray dark:text-gray-200'"
          @click="changeSettingsSection('privacy')">
          Privacy
        </div>
        <div
          class="px-6 py-2 mr-1 text-xl border-2 rounded-md"
          :class="settingsSection=='plan' ? 'bg-blueshine text-white font-semibold dark:bg-magentashine' : 'bg-white dark:bg-deepgray dark:text-gray-200'"
          @click="changeSettingsSection('plan')">
          Plan
        </div>
      </div>
      <div class="flex justify-center">
        <section v-if="settingsSection=='profile'">
          <Profile/>
        </section> 
        <section v-if="settingsSection=='privacy'">
          <Privacy/>
        </section> 
        <section v-if="settingsSection=='plan'">
          <Plan/>
        </section>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/header/Header.vue';
  import Profile from '@/components/settings/Profile.vue';
  import Privacy from '@/components/settings/Privacy.vue';
  import Plan from '@/components/settings/Plan.vue';
  @Component({
    components: {
      Header,
      Profile,
      Privacy,
      Plan
    }
  })
  export default class Settings extends Vue {
    settingsSection: string = 'profile';
    changeSettingsSection(section: string) {
      this.settingsSection = section;
    }
  }
</script>
