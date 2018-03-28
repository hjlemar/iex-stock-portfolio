import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import StockTabs from '@/components/StockTabs';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('StockTabs', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({ });
  });

  it('should render component and match snapshot', () => {
    const wrapper = mount(StockTabs, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
