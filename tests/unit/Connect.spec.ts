import axios from 'axios';
import { shallowMount } from '@vue/test-utils'
import Connect from '@/components/header/btns/Connect.vue'
import { get } from 'idb-keyval';
import { getModule } from 'vuex-module-decorators'
import User from '@/store/userModule';
const userStore = getModule(User)
import metamaskStore from '@/store/metamaskModule.ts'
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
  metamaskStore.state.wallet = 'TEST';
  metamaskStore.state.chainId = 456;
  metamaskStore.state.balance = 123;
  metamaskStore.state.isConnected = true;

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
    console.log(cookie);
    expect(cookie).toBe('');
  })
  it('resets userStore', async () => {
    let userStoreData = userStore.getUserDetails;
    expect(userStoreData).toEqual({});
  })
  it('resets metamaskStore', async () => {
    expect(metamaskStore.state.isConnected).toBe(false);
    expect(metamaskStore.state.balance).toBe(0);
    expect(metamaskStore.state.chainId).toBe(0);
    expect(metamaskStore.state.wallet).toBe('');
  })

  afterAll(() => {
    jest.resetModules();
  })
})

describe('Connect.vue / loginMetamask', () => {

  const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
  process.env.VUE_APP_MOONBEAM_CHAINID = '9999';

  let methods = {
    defineMetamaskStoreVariables: jest.fn(),
    instantiateMetamaskWatchers: jest.fn()
  }

  it('alerts user when Metamask is not installed', async () => {
    const wrapper = shallowMount(Connect, {
      methods
    });
    global.ethereum = undefined;
    await (wrapper as any).vm.loginMetamask();
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
  it('alerts user when chainId is not correct', async () => {
    const wrapper = shallowMount(Connect, {
      methods,
    });
    let fakeFunc = jest.fn();
    when(fakeFunc).calledWith({ method: 'eth_chainId' }).mockReturnValue('0x501')
    global.ethereum = {
      on: jest.fn(),
      request: fakeFunc
    }
    await (wrapper as any).vm.loginMetamask();
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
  it('alerts user has 0 accounts connected', async () => {
    const wrapper = shallowMount(Connect, {
      methods,
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

  afterEach(() => {
    jest.resetModules();
  })

})
