import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue'

describe('Footer.vue', () => {
  test('text is visible', () => {
    const wrapper = shallowMount(Footer, {})
    let div_text = wrapper.find('div').text();
    expect(div_text.indexOf('tradinglab.xyz')).toBeGreaterThan(-1);
  });
  test('object visible', () => {
    const wrapper = shallowMount(Footer, {})
    expect(wrapper.isVisible());
  });
  afterAll(() => {
    jest.resetModules();
  })
})
