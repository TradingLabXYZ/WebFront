<template>
  <button
    @click="goToSettings"
    title="Settings"
    class="">
    Settings
  </button>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import VueRouter from 'vue-router'
  const { isNavigationFailure, NavigationFailureType } = VueRouter
  @Component({})
  export default class Settings extends Vue {
      goToSettings() {
        this.$router.push({ 
          name: "Settings"
        }).catch(failure => {
          if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            console.log("Remaining in settings section...")
          };
        })
      }
    }
</script>
