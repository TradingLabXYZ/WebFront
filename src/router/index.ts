import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

import { get } from 'idb-keyval';
import User from '@/store/userModule';
import { getModule } from 'vuex-module-decorators'
const userStore = getModule(User)

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserTrades from '../views/UserTrades.vue'
import Settings from '../views/Settings.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(document.cookie.indexOf("sessionId") > -1) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        get(sessionId).then((sessionData) => 
          next('/' + sessionData['Username'])
        )
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    async beforeEnter (to, from, next) {
      if(document.cookie.indexOf("sessionId") > -1) {
        var session_id = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(session_id).then((val) => userStore.updateUserDetails(val));
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/:username',
    name: 'UserTrades',
    component: UserTrades,
    async beforeEnter (to, from, next) {
      if(document.cookie.indexOf("sessionId") > -1) {
        var session_id = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(session_id).then((val) => userStore.updateUserDetails(val));
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
