import { mount, shallowMount } from '@vue/test-utils'
import metamaskStore from '@/store/metamaskModule.ts'
import Connect from '@/components/header/btns/Connect.vue'
import Connected from '@/components/header/btns/Connected.vue'
import PopoverUserConsole from '@/components/header/popover/PopoverUserConsole.vue'
import Settings from '@/components/header/btns/Settings.vue'
import CopyToClipboard from '@/components/svg/CopyToClipboard.vue'

describe('PopoverUserConsole.vue', () => {
  metamaskStore.state.chainId = 111;
  metamaskStore.state.balance = 999;
  metamaskStore.state.wallet = 'ABC12XXXX21CBA';
  metamaskStore.state.isConnected = true;
  const wrapper = shallowMount(PopoverUserConsole, {});
  it('returns the correct userBalance', () => {
    expect((wrapper.vm as any).userBalance).toBeGreaterThanOrEqual(999);
  });
  it('returns the correct chainId', () => {
    expect((wrapper.vm as any).userChainId).toBeGreaterThanOrEqual(111);
  });
  it('returns the correct wallet', () => {
    expect((wrapper.vm as any).userWallet).toBe('ABC12XXXX21CBA');
  });
  it('shows the Setting child component', () => {
    expect(wrapper.findComponent(Settings).exists()).toBe(true)
  });
  it('shows the CopyToClipboard child component', () => {
    expect(wrapper.findComponent(CopyToClipboard).exists()).toBe(true)
  });
  it('displaies as text only a section of the wallet', () => {
    const span = wrapper.find('#walletText').text()
    expect(span).toBe('Wallet: ABC12...21CBA');
  });

  it('delete metamaskStore data when disconnected', async () => {
    global.ethereum = {
      on: jest.fn()
    }
    const connectWrapper = mount(Connect, {})
    connectWrapper.findComponent(
      Connected
    ).findComponent(
      PopoverUserConsole
    ).find('#disconnectButton').trigger('click');
    expect((wrapper.vm as any).userChainId).toBe(0);
  })

  // TODO: find a way to test copyWalletToClipboard
  it('copies the wallet to clipboard', () => {});

  afterAll(() => {
    jest.resetModules();
  })
})