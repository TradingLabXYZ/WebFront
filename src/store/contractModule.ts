declare let window: any;
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '../store'
import { ethers } from "ethers";
import ContractSubscription from "@/functions/subscriptionContract";
import ContractStore from "@/functions/storeContract";

@Module({ dynamic: true, store, name: 'contractModule'  })
export default class Contract extends VuexModule {
  contractSubscription = {} as ethers.Contract;
  contractSubscriptionSigned = {} as ethers.Contract;
  contractStore = {} as ethers.Contract;
  contractStoreSigned = {} as ethers.Contract;
  @Mutation
  public setContractSubscription(newContract: ethers.Contract): void {
    this.contractSubscription = newContract;
  };
  @Mutation
  public setContractSubscriptionSigned(newContract: ethers.Contract): void {
    this.contractSubscriptionSigned = newContract;
  };
  @Mutation
  public setContractStore(newContract: ethers.Contract): void {
    this.contractStore = newContract;
  };
  @Mutation
  public setContractStoreSigned(newContract: ethers.Contract): void {
    this.contractStoreSigned = newContract;
  };
  @Action
  async updateContractSubscription() {
    let contractSubscription = ContractSubscription();
    this.context.commit(
      'setContractSubscription',
      contractSubscription
    )
  };
  @Action
  async signContractSubscription() {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner()
    this.context.commit(
      'setContractSubscriptionSigned',
      this.contractSubscription.connect(signer)
    )
  };
  @Action
  async updateContractStore() {
    let contractStore = ContractStore();
    this.context.commit(
      'setContractStore',
      contractStore
    )
  };
  @Action
  async signContractStore() {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    let signer = provider.getSigner()
    this.context.commit(
      'setContractStoreSigned',
      this.contractStore.connect(signer)
    )
  };
  get getContractSubscription(): ethers.Contract { 
    return this.contractSubscription;
  };
  get getContractSubscriptionSigned(): ethers.Contract { 
    return this.contractSubscriptionSigned;
  };
  get getContractStore(): ethers.Contract { 
    return this.contractStore;
  };
  get getContractStoreSigned(): ethers.Contract { 
    return this.contractStoreSigned;
  };
}
