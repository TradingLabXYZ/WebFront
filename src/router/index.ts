import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

declare let window: any;

import { get, clear } from 'idb-keyval';

import User from '@/store/userModule';
import Metamask from '@/store/metamaskModule';
import { getModule } from 'vuex-module-decorators'
const userStore = getModule(User)
const metamaskStore = getModule(Metamask)

import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import UserView from '../views/User.vue'
import Settings from '../views/Settings.vue'
import Connections from '../views/Connections.vue'

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    async beforeEnter ({}, {}, next) {
      if (await isAllowedToGoNext()) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        let sessionData = userStore.getUserDetails;
        next('/' + sessionData['Wallet']);
      } else {
        next()
      }
    }
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
    async beforeEnter ({}, {}, next) {
      if (await isAllowedToGoNext()) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next()
      } else {
        next();
      }
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    async beforeEnter ({}, {}, next) {
      if (await isAllowedToGoNext()) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next()
      } else {
        next('/');
      }
    }
  },
  {
    path: '/:wallet',
    name: 'User',
    component: UserView,
    async beforeEnter ({}, {}, next) {
      if (await isAllowedToGoNext()) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next();
      } else {
        next();
      }
    }
  },
  {
    path: '/:wallet/connections',
    name: 'Connections',
    component: Connections,
    async beforeEnter ({}, {}, next) {
      if (await isAllowedToGoNext()) {
        var sessionId = document.cookie.split("sessionId=")[1].split(";")[0];
        await get(sessionId).then((val) => userStore.updateUserDetails(val));
        next();
      } else {
        next();
      }
    }
  }
]

async function isAllowedToGoNext() {
  if(document.cookie.indexOf("sessionId") > -1) {
    let accounts = await loadAccounts();
    if (accounts.length > 0) {
      return true
    } else {
      cleanSession();
      return false
    }
  } else {
    return false
  }
}

async function loadAccounts() {
  let accounts = await window.ethereum.request({ method: 'eth_accounts' });
  return accounts;
}

function cleanSession() {
  // Reset indexeddb
  clear()
  // Reset cookie
  const date = new Date();
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
  document.cookie = "sessionId=; expires="+date.toUTCString()+"; path=/";
  // Reset user store
  userStore.updateUserDetails({});
  // Reset metamask store
  metamaskStore.updateIsConnected(false);
  metamaskStore.updateBalance(0);
  metamaskStore.updateChainId(0);
  metamaskStore.updateWallet('');
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
