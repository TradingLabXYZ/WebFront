import axios from 'axios';
import { shallowMount } from '@vue/test-utils'
import Connect from '@/components/header/btns/Connect.vue'
import { get } from 'idb-keyval';
import User from '@/store/userModule';
import { getModule } from 'vuex-module-decorators'
const userStore = getModule(User)

require("fake-indexeddb/auto");

jest.mock('axios');
const resp = {
  status: 200,
  data: {
    SessionId: 'ABCD123'
  }
};
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockImplementation(() => Promise.resolve(resp));

global.ethereum = {
  on: jest.fn(),
  request: jest.fn()
}

describe('Connect.vue / generateSession', () => {

  let methods = {
    defineMetamaskStoreVariables: jest.fn(),
    instantiateMetamaskWatchers: jest.fn()
  }
  const wrapper = shallowMount(Connect, {
    methods
  });

  it('creates a cookie', async () => {
    await (wrapper as any).vm.generateSession('fakeUserId')
    expect(document.cookie).toContain('ABCD123');
  })
  it('saves data into userStore', async () => {
    await (wrapper as any).vm.generateSession('fakeUserId')
    expect(userStore.getUserDetails['SessionId']).toContain('ABCD123');
  })
  it('saves data into indexedDb', async () => {
    await (wrapper as any).vm.generateSession('fakeUserId')
    let sessionId = await get('ABCD123').then((val) => {return val});
    expect(JSON.stringify(sessionId)).toContain('ABCD123');
  })

  afterAll(() => {
    jest.resetModules();
  })
})
