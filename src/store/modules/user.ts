import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
@Module({ namespaced: true })
class User extends VuexModule {
  public username: string = '';
  @Mutation
  public setName(newName: string): void {
    this.username = newName
  }
  @Action
  public updateName(newName: string): void {
    this.context.commit('setName', newName)
  }
}
export default User
