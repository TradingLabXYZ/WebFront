
import axios from 'axios';
import { shallowMount, mount } from '@vue/test-utils'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/userModule';
const userStore = getModule(User)
import Profile from '@/components/settings/Profile.vue';
require("fake-indexeddb/auto");

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Profile.vue / saveUserSocial', () => {

  it('sets selectedUserPrivacy on creation', async () => {
    userStore.updateUserDetails({
      Username: 'testUsername',
      Twitter: 'testTwitter',
      Discord: 'testDiscord',
      Github: 'testGithub',
      ProfilePicture: 'testProfilePicture'
    });
    const wrapper = shallowMount(Profile);
    expect(wrapper.vm.$data.username).toBe('testUsername');
    expect(wrapper.vm.$data.twitter).toBe('testTwitter');
    expect(wrapper.vm.$data.discord).toBe('testDiscord');
    expect(wrapper.vm.$data.github).toBe('testGithub');
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
    wrapper.vm.$data.discord = 'thisNewDiscord';
    await (wrapper as any).vm.saveUserSocial();
    expect(userStore.getUserDetails['Twitter']).toBe('thisNewTwitter');
    expect(userStore.getUserDetails['Discord']).toBe('thisNewDiscord');
  })
  it('shows the green button when request returns 200', async () => {
    mockedAxios.post.mockImplementation(() => Promise.resolve({
      status: 200
    }));
    const getElementById = jest.fn();
    global.document.getElementById = getElementById;
    getElementById.mockReturnValue({ style: {display: 'none'}});
    let methods = {
      updateProfileInIndexedDb: jest.fn()
    }
    const wrapper = mount(Profile, {
      methods
    });
    jest.useFakeTimers();
    await (wrapper as any).vm.saveUserSocial()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  })
  it('shows the red button when request does not returns 200', async () => {
    mockedAxios.post.mockImplementation(() => Promise.resolve({
      status: 400
    }));
    const getElementById = jest.fn();
    global.document.getElementById = getElementById;
    getElementById.mockReturnValue({ style: {display: 'none'}});
    let methods = {
      updateProfileInIndexedDb: jest.fn()
    }
    const wrapper = mount(Profile, {
      methods
    });
    jest.useFakeTimers();
    await (wrapper as any).vm.saveUserSocial()
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  })
  
  it('raises alert if image size is too big', async () => {
    const FormDataMock = {
      append: jest.fn(),
      entries: jest.fn()
    };
    const mockedFormEvent = { target: { files : jest.fn() }};
    (global as any).FormData = jest.fn(() => FormDataMock);
    mockedFormEvent.target.files.mockReturnValueOnce([]);
    FormDataMock.entries.mockReturnValueOnce([['file', {size: 50001, name: 'abc'}]]);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(); 
    const wrapper = shallowMount(Profile);
    await (wrapper as any).vm.uploadImage(mockedFormEvent);
    expect(alertMock).toHaveBeenCalledTimes(1)
  })
  it('updates profile picture', async () => {
    const FormDataMock = {
      append: jest.fn(),
      entries: jest.fn()
    };
    const mockedFormEvent = { target: { files : jest.fn() }};
    (global as any).FormData = jest.fn(() => FormDataMock);
    mockedFormEvent.target.files.mockReturnValueOnce([]);
    FormDataMock.entries.mockReturnValueOnce([['file', {size: 49999, name: 'abc'}]]);
    mockedAxios.put.mockImplementation(() => Promise.resolve({
      status: 200,
      data: 'thisIsTheNewProfilePicture'
    }));
    let methods = {
      updatePictureInIndexedDb: jest.fn(),
    }
    const wrapper = shallowMount(Profile, {
      methods
    });
    await (wrapper as any).vm.uploadImage(mockedFormEvent);
    expect(wrapper.vm.$data.profilePicture).toContain('thisIsTheNewProfilePicture');
    expect(userStore.getUserDetails['ProfilePicture']).toBe('thisIsTheNewProfilePicture');
  })
})
