import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router';
import UserTrades from '@/views/UserTrades.vue'
import WS from "jest-websocket-mock";

describe('UserTrades.vue / initialiseTradeWs', () => {

  it('instantiates a websocket and fill the data', async () => {
    process.env.VUE_APP_WS_URL = 'ws://localhost:1234';
    const server = new WS('ws://localhost:1234/get_trades/0xabc/undefined');
    const mockGenerateRandomRequestId = jest.fn();
    mockGenerateRandomRequestId.mockReturnValue('ABC')
    let methods = {
      generateRandomRequestId: mockGenerateRandomRequestId
    }
    const wrapper = shallowMount(UserTrades, {
      methods,
      mocks: {
        $route: {
          params: {
            wallet: '0xabc'
          }
        }
      }
    });
    server.send(JSON.stringify({
      PrivacyStatus: {
        Status: "OK",
        Reason: "RandomReason",
      },
      TotalReturnUsd: 100,
      Roi: 20,
      CountTrades: 3,
      Trades: [
        {
          IsOpen: 'true',
          ciao: 1234
        },
        {
          IsOpen: 'true',
          ciao: 3333
        },
        {
          IsOpen: 'false',
          ciao: 3738
        }
      ]
    }))
    var totalReturn = await (wrapper as any).vm.$data.totalReturn;
    var roi = await (wrapper as any).vm.$data.roi;
    var totalTrades = await (wrapper as any).vm.$data.totalTrades;
    var openedTrades = await (wrapper as any).vm.$data.openedTrades;
    var closedTrades = await (wrapper as any).vm.$data.closedTrades;
    expect(totalReturn).toBe(100);
    expect(roi).toBe(20);
    expect(totalTrades).toBe(3);
    expect(openedTrades.length).toBe(2);
    expect(closedTrades.length).toBe(1);
  })

  it('reinstantiates websocket when url changes', async () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter();
    process.env.VUE_APP_WS_URL = 'ws://localhost:1234';
    const mockGenerateRandomRequestId = jest.fn();
    mockGenerateRandomRequestId.mockReturnValue('ABC')
    let methods = {
      generateRandomRequestId: mockGenerateRandomRequestId
    }
    let wrapper = shallowMount(UserTrades, {
      methods,
      localVue,
      router,
      mocks: {
        $route: {
          params: {
            wallet: '0xabc'
          }
        }
      }
    });
    (wrapper as any).vm.$data.totalReturn = 100;
    await router.push('otherPath');
    expect((wrapper as any).vm.$data.totalReturn).toBe(0);
  })
})
