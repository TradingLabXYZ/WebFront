import axios from "axios";
import { set, clear } from 'idb-keyval';
import { getModule } from 'vuex-module-decorators'
import User from '@/store/userModule';
const userStore = getModule(User)
import Wallet from '@/store/walletModule';
const walletStore = getModule(Wallet)

export async function generateSession() {
  let api_url = process.env.VUE_APP_HTTP_URL + '/login/' + walletStore.getWallet;
  const response = await axios.get(api_url);
  if (response.status != 200) {
    return
  }
  let sessionId: string = response.data['SessionId'];
  // Set cookie
  let d = new Date();
  d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = "sessionId=" + sessionId + ";" + expires + "; path=/";
  // Save user's info in store
  userStore.updateUserDetails(response.data);
  // Save user's data in indexeddb
  set(response.data['SessionId'], response.data);
}

export function cleanSession() {
  // Reset indexeddb
  clear()
  // Reset cookie
  const date = new Date();
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
  document.cookie = "sessionId=; expires="+date.toUTCString()+"; path=/";
  // Reset user store
  userStore.updateUserDetails({});
  // Reset wallet store
  walletStore.updateIsConnected(false);
  walletStore.updateBalance(0);
  walletStore.updateChainId(0);
  walletStore.updateWallet('');
  // Clean local sotrage
  localStorage.clear();
}
