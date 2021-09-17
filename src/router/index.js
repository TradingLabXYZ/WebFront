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

export default router
