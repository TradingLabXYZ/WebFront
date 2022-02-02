import { mount, shallowMount } from '@vue/test-utils'
import walletStore from '@/store/walletModule'
import Connect from '@/components/header/btns/Connect.vue'
import PopoverUserConsole from '@/components/header/popover/PopoverUserConsole.vue'
import Settings from '@/components/header/btns/Settings.vue'
import CopyToClipboard from '@/components/svg/CopyToClipboard.vue'
require("fake-indexeddb/auto");

describe('PopoverUserConsole.vue', () => {
  walletStore.state.chainId = 111;
  walletStore.state.balance = 999;
  walletStore.state.wallet = 'ABC12XXXX21CBA';
  walletStore.state.isConnected = true;
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
  it('displays as text only a section of the wallet', () => {
    const span = wrapper.find('#walletText').text()
    expect(span).toMatch(/ABC12...21CBA/i)
  });

  it('delete metamaskStore data when disconnected', async () => {
    global.ethereum = {
      on: jest.fn()
    }
    const connectWrapper = mount(Connect, {})
    await connectWrapper.find("#disconnectButton").trigger("click");

    expect((wrapper.vm as any).userChainId).toBe(0);
  })

  // TODO: find a way to test copyWalletToClipboard
  it('copies the wallet to clipboard', () => {});

  afterAll(() => {
    jest.resetModules();
  })
})
