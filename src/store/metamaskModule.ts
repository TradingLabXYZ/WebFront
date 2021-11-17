import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '../store'

@Module({ dynamic: true, store, name: 'metamaskModule'  })
export default class Metamask extends VuexModule {
  isConnected = false;
  wallet: string = "";
  chainId: number = 0;
  balance: number = 0;
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
}
