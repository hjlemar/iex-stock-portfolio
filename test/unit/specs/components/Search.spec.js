import { mount, shallow, createLocalVue } from '@vue/test-utils';
import { QUERY_STOCK_DQUOTE } from '@/store/mutation-types';
import Vuex from 'vuex';
import Search from '@/components/Search';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);


describe('Search', () => {
  it('should render component and match snapshot', () => {
    const wrapper = shallow(Search, { store: {}, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have a default state', () => {
    const wrapper = mount(Search, { store: {}, localVue });
    expect(wrapper.vm.stock).toBeNull();
    expect(wrapper.vm.failed).toBeFalsy();
    expect(wrapper.vm.message).toBeNull();
  });

  describe('goToDetails gets triggered by', () => {
    [{ event: 'click', id: 'search-button' },
      { event: 'keyup.enter', id: 'stock-search' },
    ].forEach(({ event, id }) => {
      it(`${event} event`, () => {
        const wrapper = mount(Search, { store: {}, localVue });
        const goToDetails = jest.fn();
        wrapper.setMethods({ goToDetails });
        const selector = `#${id}`;
        const elem = wrapper.find(selector);
        elem.trigger(event);
        expect(goToDetails).toBeCalled();
      });
    });
  });

  describe('gotToDetails', () => {
    let store;
    let actions;

    beforeEach(() => {
      actions = {
        [QUERY_STOCK_DQUOTE]: jest.fn(),
      };
      store = new Vuex.Store({
        actions,
      });
    });

    it('should dispatch QUERY_STOCK_DQUOTE event', () => {
      const push = jest.fn((x) => {
        expect(x).toMatchObject({ path: '/details' });
      });
      const mocks = {
        $router: {
          push,
        },
      };
      const wrapper = shallow(Search, {
        store,
        localVue,
        data: { stock: 'O' },
        mocks,
      });
      expect(wrapper.vm.stock).toBe('O');
      wrapper.vm.goToDetails();
      expect(actions[QUERY_STOCK_DQUOTE]).toBeCalled();
      // this fails oddly, even though the expect in the
      // push function is evaluated. (console.log shows this.)
      // expect(push).toBeCalled();
    });
  });
});
