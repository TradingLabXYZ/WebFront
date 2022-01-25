import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router';
import User from '@/views/User.vue'
import WS from "jest-websocket-mock";

describe('User.vue / initialiseTradeWs', () => {

  it('instantiates a websocket and fill the data', async () => {
    process.env.VUE_APP_WS_URL = 'ws://localhost:1234';
    const server = new WS('ws://localhost:1234/get_trades/0xabc/ABC');
    const mockGenerateRandomRequestId = jest.fn();
    mockGenerateRandomRequestId.mockReturnValue('ABC')
    let methods = {
      generateRandomId: mockGenerateRandomRequestId
    }
    const wrapper = shallowMount(User, {
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
      IsFollower: false,
      IsSubscriber: false,
      UserDetails: {
        Username: "TEST"
      },
      PrivacyStatus: {
        Status: "OK",
        Reason: "RandomReason",
      },
      TotalReturnUsd: 100,
      Roi: 20,
      CountTrades: 3,
      Trades: [
        {
          IsOpen: 'true'
        },
        {
          IsOpen: 'true'
        },
        {
          IsOpen: 'false'
        }
      ]
    }))
    var totalReturn = await (wrapper as any).vm.$data.totalReturn;
    var roi = await (wrapper as any).vm.$data.roi;
    var totalTrades = await (wrapper as any).vm.$data.totalTrades;
    expect(totalReturn).toBe(100);
    expect(roi).toBe(20);
    expect(totalTrades).toBe(3);
  })

  it('reinstantiates websocket when url changes', async () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter();
    process.env.VUE_APP_WS_URL = 'ws://localhost:1234';
    const mockGenerateRandomRequestId = jest.fn();
    mockGenerateRandomRequestId.mockReturnValue('ABC')
    let methods = {
      generateRandomId: mockGenerateRandomRequestId
    }
    let wrapper = shallowMount(User, {
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
