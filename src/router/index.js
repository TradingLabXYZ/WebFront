import { createRouter, createWebHistory } from 'vue-router'
import RoutesOut from '../router/out.js'
import RoutesIn from '../router/in.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      ...RoutesOut,
      ...RoutesIn
    ]
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
})

export default router
