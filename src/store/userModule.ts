import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '../store'

@Module({ dynamic: true, store, name: 'userModule'  })
export default class User extends VuexModule {
  userDetails: object = {};
  @Mutation
  public setUserDetails(newUserDetails: object): void {
    this.userDetails = newUserDetails;
  };
  @Action
  public updateUserDetails(newUserDetails: object) {
    console.log(newUserDetails);
    this.context.commit('setUserDetails', newUserDetails);
  };
  get getUserDetails(): object {
    return this.userDetails;
  };
}
