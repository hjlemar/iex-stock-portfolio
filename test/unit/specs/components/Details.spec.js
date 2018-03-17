import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Details from '@/components/Details';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('Details.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        date: '2018-02-01',
      },
      getters: {
        date: jest.fn(),
        data: jest.fn(),
      },
    });
  });

  it('should render component and match snapshot', () => {
    const wrapper = mount(Details, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('date should change to 2018-02-02', () => {
    const wrapper = mount(Details, {
      store,
      localVue,
      computed: {
        date: () => '2018-02-02',
      },
    });

    expect(wrapper.html()).toBe('<div><div><p>No data found</p></div></div>');
  });
});
