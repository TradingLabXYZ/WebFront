import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/modules/user'
Vue.use(Vuex)
Vue.config.devtools = true
const store = new Vuex.Store({
  modules: {
    User
  }
})
export default store
