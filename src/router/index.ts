import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
Vue.use(VueRouter)

import {getModule} from 'vuex-module-decorators'

import Wallet from '@/store/walletModule';
const walletStore = getModule(Wallet)

import User from '@/store/userModule';
const userStore = getModule(User)

import {get} from 'idb-keyval';
import {cleanSession} from '@/functions/session';

import Home from '../views/Home.vue'
import Docs from '../views/Docs.vue'
import Explore from '../views/Explore.vue'
import UserView from '../views/User.vue'
import Settings from '../views/Settings.vue'
import Connections from '../views/Connections.vue'
import GuessBtcPrice from '../views/competitions/FirstCompetition.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    async beforeEnter({}, {}, next) {
      if (await walletStore.verifyConnection()) {
        if (document.cookie.indexOf('sessionId') > -1) {
          const sessionId = document.cookie.split('sessionId=')[1].split(';')[0];
          await get(sessionId).then((val) => userStore.updateUserDetails(val));
          const sessionData = userStore.getUserDetails;
          next('/' + sessionData['Wallet']);
        } else {
          cleanSession();
          next()
        }
      } else {
        cleanSession();
        next()
      }
    },
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs,
    async beforeEnter({}, {}, next) {
      next();
    },
  },
  {
    path: '/guess_btc_price',
    name: 'GuessBtcPrice',
    component: GuessBtcPrice,
    async beforeEnter({}, {}, next) {
      if (document.cookie.indexOf('sessionId') > -1) {
        const sessionId = document.cookie.split('sessionId=')[1].split(';')[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next()
      } else {
        cleanSession();
        next();
      }
    },
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
    async beforeEnter({}, {}, next) {
      if (document.cookie.indexOf('sessionId') > -1) {
        const sessionId = document.cookie.split('sessionId=')[1].split(';')[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next()
      } else {
        cleanSession();
        next();
      }
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    async beforeEnter({}, {}, next) {
      if (document.cookie.indexOf('sessionId') > -1) {
        const sessionId = document.cookie.split('sessionId=')[1].split(';')[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next()
      } else {
        cleanSession();
        next('/');
      }
    },
  },
  {
    path: '/:wallet',
    name: 'User',
    component: UserView,
    async beforeEnter({}, {}, next) {
      if (document.cookie.indexOf('sessionId') > -1) {
        const sessionId = document.cookie.split('sessionId=')[1].split(';')[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next();
      } else {
        cleanSession();
        next();
      }
    },
  },
  {
    path: '/:wallet/connections',
    name: 'Connections',
    component: Connections,
    async beforeEnter({}, {}, next) {
      if (document.cookie.indexOf('sessionId') > -1) {
        const sessionId = document.cookie.split('sessionId=')[1].split(';')[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next();
      } else {
        cleanSession();
        next();
      }
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
