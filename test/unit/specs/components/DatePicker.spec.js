import { shallow, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import DatePicker from '@/components/DatePicker';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('DatePicker.vue', () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      date: jest.fn(),
    };
    store = new Vuex.Store({
      state: {
        date: '2018-02-01',
      },
      getters,
    });
  });

  it('should render component and match snapshot', () => {
    const wrapper = shallow(DatePicker, { store, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
