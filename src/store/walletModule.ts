declare let window: any;
import Web3Modal from "web3modal";
import store from '../store'
import { ethers } from "ethers";
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import WalletConnectProvider from '@walletconnect/ethereum-provider'

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

async function listBalance(provider: any) {
  return await provider.getSigner().getBalance().then(
    function(balance: any) {
      return parseFloat(ethers.utils.formatEther(balance))
    }
  )
}

@Module({ dynamic: true, store, name: 'walletModule'  })
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
  public async initializeWallet() {
    // IS CONNECTED TO METAMASK?
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = await getProvider(window.ethereum);
      var metamaskAddress = await listAccounts(web3Provider);
      if (metamaskAddress) {
        var chainId = await listChainId(web3Provider);
        var balance = await listBalance(web3Provider);
        this.updateProviderObject(window.ethereum);
        this.updateProviderName('metamask');
        this.updateIsConnected(true);
        this.updateWallet(metamaskAddress);
        this.updateChainId(chainId);
        this.updateBalance(balance);
      }
    }
    // IS CONNECTED TO WALLETCONNECT?
    if (this.getWallet == '') {
      const vueAppChainId = process.env.VUE_APP_MOONBEAM_CHAINID || '';
      const vueAppRpcUrl = process.env.VUE_APP_MOONBEAM_RPC_URL;
      const rpcOptions = {}
      rpcOptions[vueAppChainId] = vueAppRpcUrl;
      var walletConnectProvider = new WalletConnectProvider({
        rpc: rpcOptions,
        qrcode: true
      });
      if (walletConnectProvider.connected) {
        await walletConnectProvider.enable();
        const web3Provider = await getProvider(walletConnectProvider);
        var chainId = await listChainId(web3Provider);
        var address = await listAccounts(web3Provider);
        var balance = await listBalance(web3Provider);
        this.updateProviderObject(walletConnectProvider);
        this.updateProviderName('walletconnect');
        this.updateIsConnected(true);
        this.updateChainId(chainId);
        this.updateWallet(address);
        this.updateBalance(balance);
      }
    }
  }
  @Action
  public async connect() {
    const vueAppChainId = process.env.VUE_APP_MOONBEAM_CHAINID || '';
    const vueAppRpcUrl =process.env.VUE_APP_MOONBEAM_RPC_URL;
    const rpcOptions = {}
    rpcOptions[vueAppChainId] = vueAppRpcUrl;
    var providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: rpcOptions
        }
      }
    }
    const web3Modal = new Web3Modal({providerOptions})
    await web3Modal.connect();
    await this.initializeWallet();
  }
  @Action
  public async switchNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: process.env.VUE_APP_MOONBEAM_CHAINHEX }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          const params = [{
            chainId: '0x507',
            chainName: 'Moonbase Alpha',
            nativeCurrency: {
              name: 'DEV',
              symbol: 'DEV',
              decimals: 18
            },
            rpcUrls: ['https://rpc.testnet.moonbeam.network'],
            blockExplorerUrls: ['https://moonbase-blockscout.testnet.moonbeam.network/']
          }]
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params
          });
        } catch (addError) {
          alert(`Onyl Moonbase ${process.env.VUE_APP_MOONBEAM_CHAINNAME} supported!`);
          return;
        }
      } else {
        alert(`Onyl Moonbase ${process.env.VUE_APP_MOONBEAM_CHAINNAME} supported!`);
        return;
      }
    }
  }
  @Action
  async verifyConnection() {
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = await getProvider(window.ethereum);
      var metamaskAddress = await listAccounts(web3Provider);
      if (metamaskAddress) {
        return true;
      }
    }
    const vueAppChainId = process.env.VUE_APP_MOONBEAM_CHAINID || '';
    const vueAppRpcUrl = process.env.VUE_APP_MOONBEAM_RPC_URL;
    const rpcOptions = {}
    rpcOptions[vueAppChainId] = vueAppRpcUrl;
    var walletConnectProvider = new WalletConnectProvider({
      rpc: rpcOptions,
      qrcode: true
    });
    if (walletConnectProvider.connected) {
      return true;
    }
    return false;
  }
}
