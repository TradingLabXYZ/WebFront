import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store"
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
    if (store.getters["loginModule/sessionId"]) {
      next()
    } else {
      next("/login")
    }
  } else {
     next()
  }
})

export default router
