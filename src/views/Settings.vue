<template>
  <div>
    <Header/>
    <div class="mt-5 mb-5 text-2xl text-center">My Settings</div>
    <div class="grid grid-cols-12 gap-10">
      <div class="col-span-4"></div>
      <div class="col-span-1">
        <div
          class="m-2"
          :class="settingsSection=='profile' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('profile')">
          Profile
        </div>
        <div
          class="m-2"
          :class="settingsSection=='privacy' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('privacy')">
          Privacy
        </div>
        <div
          class="m-2"
          :class="settingsSection=='plan' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('plan')">
          Plan
        </div>
        <div
          class="m-2"
          :class="settingsSection=='password' ? 'bg-indigo-300' : 'bg-white'"
          @click="changeSettingsSection('password')">
          Password
        </div>
      </div>
      <div class="col-span-4">
        <section v-if="settingsSection=='profile'">
          <label class="text-xs text-subtradelabel">Email</label>
          <input
            placeholder="Email"
            class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
            v-model="userSettings.Email">
          <label class="text-xs text-subtradelabel">Twitter</label>
          <input
            placeholder="Twitter"
            class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
            v-model="userSettings.Twitter">
          <label class="text-xs text-subtradelabel">Website</label>
          <input
            placeholder="Website"
            class="w-full p-2 text-gray-800 border border-gray-200 border-gray-500"
            v-model="userSettings.Website">
            <button
              class="flex items-center px-4 py-2 m-6 font-bold text-white bg-indigo-700 rounded hover:bg-indigo-300"
              type="submit"
              @click="">
              Save
            </button>
        </section> 
        <section v-if="settingsSection=='privacy'">
          <div class="m-2">Privacy section</div>
        </section> 
        <section v-if="settingsSection=='plan'">
          <div class="m-2">Plan section</div>
        </section> 
        <section v-if="settingsSection=='password'">
          <div class="m-2">Password section</div>
        </section> 
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        settingsSection: "profile",
        userSettings:  {
          Email: "ciao@ciao.ciao",
          Twitter: "robi",
          Website: "www.ok.ciao"
        }
      }
    },
    methods: {
      changeSettingsSection(section) {
        console.log(section);
        this.settingsSection = section;
      }
    }
  }
</script>
