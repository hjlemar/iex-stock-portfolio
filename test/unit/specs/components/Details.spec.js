import { shallow, createLocalVue } from '@vue/test-utils';
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
      getters: {
        currentDetails: jest.fn(),
      },
    });
  });

  it('should render component and match snapshot', () => {
    const wrapper = shallow(Details, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
