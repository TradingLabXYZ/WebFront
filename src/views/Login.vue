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
  import { Component, Vue } from 'vue-property-decorator';
  import axios from "axios";

  import { namespace } from 'vuex-class';
  const User = namespace('User');

  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';
  import IndexedDb from '../functions/indexedDb'

  @Component({
    components: {
      Header,
      Footer
    },
  })

  export default class Login extends Vue {

    @User.State
    public username!: string;
    
    @User.Action
    public updateName!: (newName: string) => void;

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
        let sessionId: string = response.data['SessionId'];
        if (sessionId) {

          // Set cookie
          let d = new Date();
          d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie = "sessionId=" + sessionId + ";" + expires + "; path=/";

          // Save user's data in indexeddb
          const runIndexDb = async () => {
            const indexedDb = new IndexedDb('tradingLab');
            await indexedDb.createObjectStore(['user']);
            await indexedDb.putValue('user', {
              Username: response.data['UserName'],
              Usercode: response.data['Code'],
              ProfilePicture: response.data['ProfilePicture'],
            });
          }
          runIndexDb();

          console.log(this.username);
          console.log(this.updateName("MIAO"));
          console.log(this.username);

        } else {
          alert("Credentials not valid");
        }
      })
    }
  }
</script>
