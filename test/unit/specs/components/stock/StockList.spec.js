import { shallow, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import StockList from '@/components/stock/StockList';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('StockList', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({ });
  });

  it('should render component and match snapshot2', () => {
    const wrapper = shallow(StockList, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
