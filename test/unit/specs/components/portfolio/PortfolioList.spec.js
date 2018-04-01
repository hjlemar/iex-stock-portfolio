import { shallow, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import PortfolioList from '@/components/portfolio/PortfolioList';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('PortfolioList.vue', () => {
  let store;
  beforeEach(() => {
    store = {};
  });

  it('it matches its snapshot with no portfolios', () => {
    const wrapper = shallow(PortfolioList, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('it matches its snapshot with two Portfolios', () => {
    const wrapper = shallow(PortfolioList, {
      store,
      localVue,
      propsData: {
        portfolios: ['A', 'B'],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
