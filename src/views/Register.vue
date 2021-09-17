<template>
  <div class="flex flex-col h-screen justify-between">
    <Header/>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-2"></div>
      <div class="col-span-8">
        <div class="grid grid-cols-9 gap-2">
          <div class="col-span-3"></div>
          <div class="col-span-3">
            <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
              <div>
                <img src="/src/assets/logo_complimenti.png" alt="Ethereum" class="w-20 mx-auto mb-5">
              </div>
              <div>
                <label class="block mb-2 text-indigo-500">Username</label>
                <input class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="text" v-model="username" required>
              </div>
              <div>
                <label class="block mb-2 text-indigo-500">Email</label>
                <input class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" v-model="email" required>
              </div>
              <div>
                <label class="block mb-2 text-indigo-500">Password</label>
                <input class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" v-model="password" required>
              </div>
              <div>          
                <button class="w-full bg-indigo-700 hover:bg-indigo-300 text-white font-bold py-2 px-4 mb-6 rounded" type="submit" @click="registerUser">
                  Register
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

<script>
  import axios from 'axios';
    export default {
      components: {},
      data: () => ({
        username: '',
        email: '',
        password: '',
      }),
      methods: {
        registerUser () {
          axios({
            method: 'POST',
            url: import.meta.env.VITE_ROOT_API + '/register',
            data: {
              email: this.email,
              username: this.username,
              password: this.password
            }
          }).then(response => {
            if (response.data == "OK") {
              this.$router.push({ name: 'Login' })
            }
            else {
              console.log(body)
            }
          })
        },
      }, 
    }  
</script>
