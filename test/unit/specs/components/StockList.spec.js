import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import StockList from '@/components/StockList';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('StockList', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({ });
  });

  it('should render component and match snapshot', () => {
    const wrapper = mount(StockList, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
