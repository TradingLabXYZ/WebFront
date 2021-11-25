import { shallowMount } from '@vue/test-utils'
import Settings from '@/components/header/btns/Settings.vue'

describe('Settings.vue', () => {
  it('invoques router push when button is clicked', () => {
    const $router = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Settings, {
      mocks: {
        $router
      }
    });
    wrapper.find('button').trigger('click');
    expect($router.push).toHaveBeenCalled();
  })
  // TODO
  // it('catches error if user is already in Settings route', () => {
})
