import axios from 'axios';
import { shallowMount, mount } from '@vue/test-utils'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/userModule';
const userStore = getModule(User)
import { get, set } from 'idb-keyval';
require("fake-indexeddb/auto");
import Privacy from '@/components/settings/Privacy.vue';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Privacy.vue / saveUserPrivacy', () => {


  it('sets selectedUserPrivacy on creation', async () => {
    userStore.updateUserDetails({Privacy: 'all'});
    const wrapper = shallowMount(Privacy);
    expect(wrapper.vm.$data.selectedUserPrivacy).toBe('all');
  })
  it('updates privacy in IndexedDb', async () => {
    let sessionData = {
      SessionId: 'abc',
      Privacy: 'all'
    }
    userStore.updateUserDetails(sessionData);
    await set('abc', sessionData);
    const wrapper = shallowMount(Privacy);
    wrapper.setData({selectedUserPrivacy: 'private'});
    await (wrapper as any).vm.updatePrivacyInIndexedDb();
    let newSessionData = await get('abc').then((sessionData) => {
      return sessionData;
    })
    expect(newSessionData['Privacy']).toBe('private');
  })
  it('shows the green button when request returns 200', async () => {
    mockedAxios.post.mockImplementation(() => Promise.resolve({
      status: 200,
      data: {
        Privacy: 'private'
      }
    }));
    const getElementById = jest.fn();
    global.document.getElementById = getElementById;
    getElementById.mockReturnValue({ style: {display: 'none'}});
    const wrapper = mount(Privacy);
    jest.useFakeTimers();
    await (wrapper as any).vm.saveUserPrivacy();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  })
  it('shows the red button when request returns 200', async () => {
    mockedAxios.post.mockImplementation(() => Promise.resolve({
      status: 400,
      data: {
        Privacy: 'private'
      }
    }));
    const getElementById = jest.fn();
    global.document.getElementById = getElementById;
    getElementById.mockReturnValue({ style: {display: 'none'}});
    const wrapper = mount(Privacy);
    jest.useFakeTimers();
    await (wrapper as any).vm.saveUserPrivacy();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  })
  it('changes message when a new option is selected', async () => {
    const wrapper = shallowMount(Privacy);
    let initialText = wrapper.find('#displayedMessage').text(); 
    const options = wrapper.find('select').findAll('option');
    await options.at(2).setSelected();
    let finalText = wrapper.find('#displayedMessage').text(); 
    expect(initialText).not.toBe(finalText);
  })
})
