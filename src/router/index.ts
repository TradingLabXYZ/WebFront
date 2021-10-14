import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import UserTrades from '../views/UserTrades.vue'
import { get } from 'idb-keyval';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(document.cookie.indexOf("sessionId") > -1) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        get(sessionId).then((sessionData) => 
          next('/' + sessionData['UserName'])
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
    path: '/:username',
    name: 'UserTrades',
    component: UserTrades,
    meta: {
      requiresAuth: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if(document.cookie.indexOf("sessionId") > -1) {
      next()
    } else {
      next("/login")
    }
  } else {
     next()
  }
});

export default router
