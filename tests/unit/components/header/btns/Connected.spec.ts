import { mount } from '@vue/test-utils'
import metamaskStore from '@/store/metamaskModule.ts'
import Connected from '@/components/header/btns/Connected.vue'
import PopoverUserConsole from '@/components/header/popover/PopoverUserConsole.vue'

describe('Connected.vue', () => {
  it('does not show userMenu when created', () => {
    const wrapper = mount(Connected, {});
    expect(wrapper.findComponent(PopoverUserConsole).isVisible()).toBeFalsy()
  })
  it('shows user menu when showUserMenu is true', () => {
    const wrapper = mount(Connected, {
      data: function() {
        return {
          showUserMenu: true
        }
      }
    });
    expect(wrapper.findComponent(PopoverUserConsole).isVisible()).toBeTruthy()
  })
  it('shows user menu when toggleMenu is clicked', async () => {
    const wrapper = mount(Connected, {});
    await wrapper.find('#buttonWallet').trigger('click');
    expect(wrapper.findComponent(PopoverUserConsole).isVisible()).toBeTruthy()
  })
  it('returns the correct wallet', () => {
    const wrapper = mount(Connected, {});
    metamaskStore.state.wallet = 'ABC12XXXX21CBA';
    expect((wrapper.vm as any).userWallet).toBe('ABC12XXXX21CBA');
  });

  afterAll(() => {
    jest.resetModules();
  })
})
