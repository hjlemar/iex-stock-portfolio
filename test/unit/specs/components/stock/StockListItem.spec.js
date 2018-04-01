import { shallow, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import StockListItem from '@/components/stock/StockListItem';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('StockListItem', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({ });
  });

  it('should render component and match snapshot', () => {
    const wrapper = shallow(StockListItem, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should render component and match snapshot with stock O', () => {
    const wrapper = shallow(StockListItem, {
      store,
      localVue,
      propsData: {
        stock: 'O',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
