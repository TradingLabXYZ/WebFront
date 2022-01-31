import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
Vue.use(VueRouter)

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

import { ethers } from "ethers";
import WalletConnectProvider from '@walletconnect/ethereum-provider'

declare let window: any;

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
  console.log("PRINTINT COOKIE FROM ROUTER", document.cookie.indexOf("sessionId"));
  if(document.cookie.indexOf("sessionId") > -1) {
    let account = await loadAccount();
    console.log("PRINTINT ACCOUNT FROM ROUTER", account);
    if (account) {
      return true
    } else {
      cleanSession();
      return false
    }
  } else {
    return false
  }
}

async function loadAccount() {
  if (typeof window.ethereum !== 'undefined') {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    var metamaskAddress = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});
    if (metamaskAddress) {
      return metamaskAddress;
    }
  }
  const provider = new WalletConnectProvider({
    rpc: {1287: "https://rpc.api.moonbase.moonbeam.network"},
    qrcode: true});
  var isConnectedToWalletConnect = provider.connected;
  if (isConnectedToWalletConnect) {
    const web3Provider = new ethers.providers.Web3Provider(provider);
    var walletConnectAddress = await web3Provider.listAccounts().then(function(addresses) {return addresses[0]});
    if (walletConnectAddress) {
      return walletConnectAddress;
    }
  }
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
