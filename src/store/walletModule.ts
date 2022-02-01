declare let window: any;
import Web3Modal from "web3modal";
import store from '../store'
import { ethers } from "ethers";
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import WalletConnectProvider from '@walletconnect/ethereum-provider'

const vueAppChainId = process.env.VUE_APP_MOONBEAM_CHAINID || '';
const vueAppRpcUrl =process.env.VUE_APP_MOONBEAM_RPC_URL;
const rpcOptions = {}
rpcOptions[vueAppChainId] = vueAppRpcUrl;

var providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: rpcOptions
  }
}

async function getProvider(provider: object) {
  return new ethers.providers.Web3Provider(provider)
}

async function listAccounts(provider: any) {
  return await provider.listAccounts().then(
    function(addresses: string[]) {
      return addresses[0]
    }
  );
}

async function listChainId(provider: any) {
  return await provider.getNetwork().then(
    function(network: any) {
      return network.chainId;
    }
  );
}

@Module({ dynamic: true, store, name: 'walletModule' })
export default class Wallet extends VuexModule {
  isConnected = false;
  providerObject: any = null;
  providerName: string = "";
  wallet: string = "";
  chainId: number = 0;
  balance: number = 0;
  @Mutation
  public setProviderObject(newProviderobject: any): void {
    this.providerObject = newProviderobject;
  };
  @Mutation
  public setProviderName(newProviderName: string): void {
    this.providerName = newProviderName;
  };
  @Mutation
  public setIsConnected(newIsConnected: boolean): void {
    this.isConnected = newIsConnected;
  };
  @Mutation
  public setWallet(newWallet: string): void {
    this.wallet = newWallet;
  };
  @Mutation
  public setBalance(newBalance: number): void {
    this.balance = newBalance;
  };
  @Mutation
  public setChainId(newChainId: number): void {
    this.chainId = newChainId;
  };
  @Action
  public updateProviderObject(newProviderObject: any) {
    this.context.commit('setProviderObject', newProviderObject);
  };
  @Action
  public updateProviderName(newProviderName: string) {
    this.context.commit('setProviderName', newProviderName);
  };
  @Action
  public updateIsConnected(newIsConnected: boolean) {
    this.context.commit('setIsConnected', newIsConnected);
  };
  @Action
  public updateWallet(newWallet: string) {
    this.context.commit('setWallet', newWallet);
  };
  @Action
  public updateChainId(newChainId: number) {
    this.context.commit('setChainId', newChainId);
  };
  @Action
  public updateBalance(newBalance: number) {
    this.context.commit('setBalance', newBalance);
  };
  get getProviderObject(): any { 
    return this.providerObject;
  };
  get getProviderName(): string { 
    return this.providerName;
  };
  get getIsConnected(): boolean { 
    return this.isConnected;
  };
  get getWallet(): string { 
    return this.wallet;
  };
  get getChainId(): number { 
    return this.chainId;
  };
  get getBalance(): number { 
    return this.balance;
  }
  @Action
  public async connect() {
    const web3Modal = new Web3Modal({providerOptions})
    await web3Modal.connect();
    await this.initializeWallet();
  }
  @Action
  public async initializeWallet() {
    // IS CONNECTED TO METAMASK?
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = await getProvider(window.ethereum);
      var metamaskAddress = await listAccounts(web3Provider);
      if (metamaskAddress) {
        var chainId = await listChainId(web3Provider);
        this.updateProviderObject(window.ethereum);
        this.updateProviderName('metamask');
        this.updateIsConnected(true);
        this.updateWallet(metamaskAddress);
        this.updateChainId(chainId);
      }
    }
    // IS CONNECTED TO WALLETCONNECT?
    if (this.getWallet == '') {
      var walletConnectProvider = new WalletConnectProvider({
        rpc: rpcOptions,
        qrcode: true
      });
      if (walletConnectProvider.connected) {
        await walletConnectProvider.enable();
        const web3Provider = await getProvider(walletConnectProvider);
        var chainId = await listChainId(web3Provider);
        var address = await listAccounts(web3Provider);
        this.updateProviderObject(walletConnectProvider);
        this.updateProviderName('walletconnect');
        this.updateIsConnected(true);
        this.updateWallet(address);
        this.updateChainId(chainId);
      }
    }
  }
}
