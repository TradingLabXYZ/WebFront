<template>
  <div>
    HERE LOGIC
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import axios from "axios";
  import { getModule } from 'vuex-module-decorators'
  import User from '@/store/userModule';
  const userStore = getModule(User)
  import { get, set } from 'idb-keyval';
  import getContract from "@/functions/getContract"

  @Component({})
  export default class Privacy extends Vue {
    async created() {
      var contractInstance = await getContract.then(instance => {
        return instance;
      }).catch(e => console.log(e))
      contractInstance.methods.getBalance("0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac").call(function (err: any, res: any) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("The balance is: ", res)
      })
    }
  }
</script>
