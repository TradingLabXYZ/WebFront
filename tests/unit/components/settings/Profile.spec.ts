
import axios from 'axios';
import { shallowMount, mount } from '@vue/test-utils'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/userModule';
const userStore = getModule(User)
import { get, set } from 'idb-keyval';
require("fake-indexeddb/auto");
import Profile from '@/components/settings/Profile.vue';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Profile.vue / saveUserSocial', () => {

  it('sets selectedUserPrivacy on creation', async () => {
    userStore.updateUserDetails({
      Twitter: 'testTwitter',
      Website: 'testWebsite',
      ProfilePicture: 'testProfilePicture'
    });
    const wrapper = shallowMount(Profile);
    expect(wrapper.vm.$data.twitter).toBe('testTwitter');
    expect(wrapper.vm.$data.website).toBe('testWebsite');
    expect(wrapper.vm.$data.profilePicture).toBe('testProfilePicture');
  })
  it('updates user social after post request', async () => {
    mockedAxios.post.mockImplementation(() => Promise.resolve({
      status: 200
    }));
    let methods = {
      updateProfileInIndexedDb: jest.fn(),
      showNotification: jest.fn()
    }
    const wrapper = shallowMount(Profile, {
      methods
    });
    wrapper.vm.$data.twitter = 'thisNewTwitter';
    wrapper.vm.$data.website = 'thisNewWebsite';
    await (wrapper as any).vm.saveUserSocial();
    expect(userStore.getUserDetails['Twitter']).toBe('thisNewTwitter');
    expect(userStore.getUserDetails['Website']).toBe('thisNewWebsite');
  })
})
