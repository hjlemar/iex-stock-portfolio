import App from '@/App';
import Vuex from 'vuex';
import { shallow, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';


const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('App.vue', () => {
  let store;

  beforeEach(() => {
    const getters = {
      stocks: jest.fn(),
    };
    store = new Vuex.Store({
      state: { },
      getters,
    });
  });

  it('should render component and match snapshot', () => {
    const wrapper = shallow(App, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
