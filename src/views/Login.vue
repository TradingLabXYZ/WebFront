<template>
  <div class="flex flex-col justify-between h-screen">
    <Header/>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <div class="grid grid-cols-9 gap-2">
          <div class="col-span-3"></div>
          <div class="col-span-3">
            <div class="w-full max-w-xs p-5 m-auto bg-indigo-100 rounded">
              <div>
                <img
                  src="../assets/logo.png"
                  alt="TradingLab"
                  class="w-20 mx-auto mb-5">
              </div>
              <div>
                <label class="block mb-2 text-indigo-500">
                  Email
                </label>
                <input required
                  class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="email"
                  v-model="email">
              </div>              
              <div>
                <label class="block mb-2 text-indigo-500">
                  Password
                </label>
                <input required
                  class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
                  type="password"
                  v-model="password">
              </div>           
              <div>          
                <button
                  class="w-full px-4 py-2 mb-6 font-bold text-white bg-indigo-700 rounded hover:bg-indigo-300"
                  type="submit"
                  @click="loginUser">
                  Login
                </button>
              </div>
            </div>
          </div>  
        </div>
        <div class="col-span-3"></div>
      </div>
      <div class="col-span-2"></div>
    </div>
    <Footer/>  
  </div>
</template>

<script lang="ts">
  import axios from "axios";
  import { Component, Vue } from 'vue-property-decorator';
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';

  import { set } from 'idb-keyval';

  import User from '@/store/userModule';
  import { getModule } from 'vuex-module-decorators'
  const userStore = getModule(User)

  @Component({
    components: {
      Header,
      Footer
    }
  })

  export default class Login extends Vue {

    private email: string = "";
    private password: string = "";

    public loginUser() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_HTTP_URL + "/login",
        data: {
          email: this.email,
          password: this.password
        }
      }).then(response => {
        if (response.status == 200) {
          let sessionId: string = response.data['SessionId'];
          if (sessionId) {

            // Set cookie
            let d = new Date();
            d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            document.cookie = "sessionId=" + sessionId + ";" + expires + "; path=/";

            // Save user's data in indexeddb
            set(response.data['SessionId'], response.data);

            // Save user's info in store
            userStore.updateUserDetails(response.data);

            this.$router.push({
              name: 'UserTrades',
              params: {
                username: response.data['Username']
              }
            })
          } else {
            alert("Credentials not valid");
          }
        }
      }).catch(function () {
        alert("Credentials not valid");
      })
    }
  }
</script>
