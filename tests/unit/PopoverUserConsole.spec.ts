import { shallowMount } from '@vue/test-utils'
import PopoverUserConsole from '@/components/header/popover/PopoverUserConsole.vue'
import Vuex from 'vuex'
import metamaskStore from '@/store/metamaskModule.ts'

describe('PopoverUserConsole.vue', () => {
  const store = new Vuex.Store(metamaskStore);
  store.state.balance = 999;
  store.state.chainId = 111;
  store.state.wallet = 'ABC';
  const wrapper = shallowMount(PopoverUserConsole, {})
  test('test balance', () => {
    expect((wrapper.vm as any).userBalance).toBeGreaterThanOrEqual(999);
  });
  test('test chainId', () => {
    expect((wrapper.vm as any).userChainId).toBeGreaterThanOrEqual(111);
  });
  test('test wallet', () => {
    expect((wrapper.vm as any).userWallet).toBe('ABC');
  });

  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  test('copy to clipboard', () => {
    jest.spyOn(navigator.clipboard, "writeText");
    beforeAll(() => {
      (wrapper.vm as any).copyWalletToClipboard();
    }
    expect(navigator.clipboard.writeText).toBe("CIAO");
  })
})
