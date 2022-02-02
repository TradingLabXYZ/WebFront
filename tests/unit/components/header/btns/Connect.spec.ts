import axios from 'axios';
import { shallowMount } from '@vue/test-utils'
import Connect from '@/components/header/btns/Connect.vue'
import { get } from 'idb-keyval';
import { getModule } from 'vuex-module-decorators'
import User from '@/store/userModule';
const userStore = getModule(User)
import walletStore from '@/store/walletModule'
require("fake-indexeddb/auto");
import { when } from 'jest-when'

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

global.ethereum = {
  on: jest.fn(),
  request: jest.fn()
}

describe('Connect.vue / generateSession', () => {

  let testSessionId = 'ABCD123';

  beforeAll(async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({
      status: 200,
      data: {
        SessionId: testSessionId
      }
    }));
    let methods = {
      defineMetamaskStoreVariables: jest.fn(),
      instantiateMetamaskWatchers: jest.fn()
    }
    const wrapper = shallowMount(Connect, {
      methods
    });
    await (wrapper as any).vm.generateSession('fakeUserId');
  })

  it('creates a cookie', async () => {
    expect(document.cookie).toContain(testSessionId);
  })
  it('saves data into userStore', async () => {
    expect(userStore.getUserDetails['SessionId']).toContain(testSessionId);
  })
  it('saves data into indexedDb', async () => {
    let sessionId = await get('ABCD123').then((val) => {return val});
    expect(JSON.stringify(sessionId)).toContain(testSessionId);
  })

  afterAll(() => {
    jest.resetModules();
  })
})

describe('Connect.vue / cleanSession', () => {
  walletStore.state.wallet = 'TEST';
  walletStore.state.chainId = 456;
  walletStore.state.balance = 123;
  walletStore.state.isConnected = true;

  beforeAll(async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({
      status: 200,
      data: {
        SessionId: 'ABC123'
      }
    }));
    let methods = {
      defineMetamaskStoreVariables: jest.fn(),
      instantiateMetamaskWatchers: jest.fn()
    }
    const wrapper = shallowMount(Connect, {
      methods
    });
    await (wrapper as any).vm.generateSession('fakeUserId');
    await (wrapper as any).vm.cleanSession();
  })

  it('resets indexedDb', async () => {
    let sessionId = await get('ABCD123').then((val) => {return val});
    expect(JSON.stringify(sessionId)).toBe(undefined);
  })
  it('resets cookie', async () => {
    let cookie = document.cookie;
    expect(cookie).toBe('');
  })
  it('resets userStore', async () => {
    let userStoreData = userStore.getUserDetails;
    expect(userStoreData).toEqual({});
  })
  it('resets walletStore', async () => {
    expect(walletStore.state.isConnected).toBe(false);
    expect(walletStore.state.balance).toBe(0);
    expect(walletStore.state.chainId).toBe(0);
    expect(walletStore.state.wallet).toBe('');
  })

  afterAll(() => {
    jest.resetModules();
  })
})

describe('Connect.vue / loginMetamask', () => {

  const alertMock = jest.spyOn(window, 'alert').mockImplementation(); 
  Object.defineProperty(window, 'location', {
    value: { reload: jest.fn() }
  })
  process.env.VUE_APP_MOONBEAM_CHAINID = '9999';

  it('alerts user when Metamask is not installed', async () => {
    const wrapper = shallowMount(Connect, {
      methods: {
        defineMetamaskStoreVariables: jest.fn(),
        instantiateMetamaskWatchers: jest.fn()
      }
    });
    global.ethereum = undefined;
    await (wrapper as any).vm.loginMetamask();
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
  // TODO
  /* it('alerts user when chainId is not correct', async () => {
    const wrapper = shallowMount(Connect, {
      methods: {
        defineMetamaskStoreVariables: jest.fn(),
        instantiateMetamaskWatchers: jest.fn()
      }
    });
    let fakeFunc = jest.fn();
    when(fakeFunc).calledWith(
      { method: 'eth_chainId' }
    ).mockReturnValue('0x501')
    global.ethereum = {
      on: jest.fn(),
      request: fakeFunc
    }
    await (wrapper as any).vm.loginMetamask();
    expect(alertMock).toHaveBeenCalledTimes(1)
  }) */
  it('alerts user has 0 accounts connected', async () => {
    const wrapper = shallowMount(Connect, {
      methods: {
        defineMetamaskStoreVariables: jest.fn(),
        instantiateMetamaskWatchers: jest.fn()
      }
    });
    let fakeFunc = jest.fn();
    when(fakeFunc).calledWith(
      { method: 'eth_chainId' }
    ).mockReturnValue('270F')
    when(fakeFunc).calledWith(
      { method: 'eth_requestAccounts' }
    ).mockReturnValue(1)
    when(fakeFunc).calledWith(
      { method: 'eth_accounts' }
    ).mockReturnValue([])
    global.ethereum = {
      on: jest.fn(),
      request: fakeFunc
    }
    await (wrapper as any).vm.loginMetamask();
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
  it('reloads the page when route params is equals to the account', async () => {
    const wrapper = shallowMount(Connect, {
      methods: {
        defineMetamaskStoreVariables: jest.fn(),
        instantiateMetamaskWatchers: jest.fn(),
        generateSession: jest.fn(),
      },
      mocks: {
        $route: {
          params: {
            wallet: 'testwallet'
          }
        }
      }
    })
    let fakeFunc = jest.fn();
    when(fakeFunc).calledWith(
      { method: 'eth_chainId' }
    ).mockReturnValue('270F')
    when(fakeFunc).calledWith(
      { method: 'eth_requestAccounts' }
    ).mockReturnValue(1)
    when(fakeFunc).calledWith(
      { method: 'eth_accounts' }
    ).mockReturnValue(['testwallet'])
    global.ethereum = {
      on: jest.fn(),
      request: fakeFunc
    }
    await (wrapper as any).vm.loginMetamask();
    expect(window.location.reload).toHaveBeenCalled();
  })
  it('invoques route push', async () => {
    const $router = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Connect, {
      methods: {
        defineMetamaskStoreVariables: jest.fn(),
        instantiateMetamaskWatchers: jest.fn(),
        generateSession: jest.fn(),
      },
      mocks: {
        $router,
        $route: {
          params: {
            wallet: 'testwallet'
          }
        },
      }
    })
    let fakeFunc = jest.fn();
    when(fakeFunc).calledWith(
      { method: 'eth_chainId' }
    ).mockReturnValue('270F')
    when(fakeFunc).calledWith(
      { method: 'eth_requestAccounts' }
    ).mockReturnValue(1)
    when(fakeFunc).calledWith(
      { method: 'eth_accounts' }
    ).mockReturnValue(['testwalletdifferent'])
    global.ethereum = {
      on: jest.fn(),
      request: fakeFunc
    }
    await (wrapper as any).vm.loginMetamask();
    expect($router.push).toHaveBeenCalled();
  })

  afterEach(() => {
    jest.resetModules();
  })

})

describe('Connect.vue / defineMetamaskStoreVariables', () => {

  process.env.VUE_APP_MOONBEAM_CHAINID = '9999';

  it('returns undefined when cookie is not settled', async () => {
    const wrapper = shallowMount(Connect)
    var x = await (wrapper as any).vm.defineMetamaskStoreVariables();
    expect(x).toBeUndefined();
  })
  it('returns undefined when no accounts are connected', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'sessionId=thisIsATest',
    });
    let fakeFunc = jest.fn();
    when(fakeFunc).calledWith(
      { method: 'eth_accounts' }
    ).mockReturnValue([])
    global.ethereum = {
      on: jest.fn(),
      request: fakeFunc
    }
    const wrapper = shallowMount(Connect)
    var x = await (wrapper as any).vm.defineMetamaskStoreVariables();
    expect(x).toBeUndefined();
  })
  it('returns undefined when wrong chainId', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'sessionId=thisIsATest',
    });
    let fakeFunc = jest.fn();
    when(fakeFunc).calledWith(
      { method: 'eth_accounts' }
    ).mockReturnValue(['testAccount'])
    when(fakeFunc).calledWith(
      { method: 'eth_chainId' }
    ).mockReturnValue('1234')
    global.ethereum = {
      on: jest.fn(),
      request: fakeFunc
    }
    const wrapper = shallowMount(Connect)
    var x = await (wrapper as any).vm.defineMetamaskStoreVariables();
    expect(x).toBeUndefined();
  })

  afterEach(() => {
    jest.resetModules();
  })
})
