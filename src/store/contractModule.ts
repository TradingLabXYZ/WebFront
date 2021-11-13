import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '../store'
import getContract from "@/functions/getContract"

@Module({ dynamic: true, store, name: 'contractModule'  })
export default class Contract extends VuexModule {
  contractInstance: object = {};
  @Mutation
  public setContractInstance(newContractInstance: object): void {
    this.contractInstance = newContractInstance;
  };
  @Action
  async updateContractInstance() {
    var contractInstance = await getContract.then(instance => {
      return instance;
    }).catch(e => console.log(e))
    this.context.commit('setContractInstance', contractInstance);
  };
  get getContractInstance(): object {
    return this.contractInstance;
  };
}
