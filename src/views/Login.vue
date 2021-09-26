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
                  src="/src/assets/logo.png"
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
              <div class="mb-3">
                <a class="float-left text-sm text-indigo-700 hover:text-pink-700" href="#">Forgot Password?</a>
                <a class="float-right text-sm text-indigo-700 hover:text-pink-700" href="#">Create Account</a>
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

<script>
  import axios from "axios";
    export default {
      components: {},
      data: () => ({
        email: "",
        password: "",
      }),
      methods: {
        loginUser () {
          axios({
            method: "POST",
            url: import.meta.env.VITE_ROOT_API + "/login",
            data: {
              email: this.email,
              password: this.password
            }
          }).then(response => {
            let sessionId = response.data.SessionId;
            if (sessionId) {
              let username = response.data.UserName;
              localStorage.setItem("sessionId", sessionId);
              localStorage.setItem("username", username);
              this.$store.dispatch("loginModule/setSessionId", sessionId);
              this.$store.dispatch("loginModule/setUsername", username);
              let d = new Date();
              d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
              let expires = "expires=" + d.toUTCString();
              document.cookie = "sessionId=" + sessionId + ";" + expires + "; path=/";
              this.$router.push({
                name: "UserTrades",
                params: {
                  username: username
                }
              })
            } else {
              alert("Credentials not valid");
            }
          })
        },
      }, 
    }  
</script>
