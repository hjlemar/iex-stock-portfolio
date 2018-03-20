import { mount, shallow, createLocalVue } from '@vue/test-utils';
import { GET_DETAILS } from '@/store/modules/details/types';
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
    it('should dispatch GET_DETAILS event', () => {
      const actions = {
        [GET_DETAILS]: jest.fn(),
      };
      const store = new Vuex.Store({
        actions,
      });
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
      return wrapper.vm.goToDetails()
        .then(() => {
          expect(actions[GET_DETAILS]).toBeCalled();
          expect(push).toBeCalled();
        });
    });
    it('should throw an error when dispatching GET_DETAILS', () => {
      const actions = {
        [GET_DETAILS]: jest.fn(() => Promise.reject({ response: { data: 'FAILED' } })),
      };
      const store = new Vuex.Store({
        actions,
      });
      const wrapper = shallow(Search, {
        store,
        localVue,
        data: { stock: 'O', failed: false, message: null },
      });
      expect(wrapper.vm.stock).toBe('O');
      return wrapper.vm.goToDetails()
        .then(() => {
          expect(actions[GET_DETAILS]).toBeCalled();
          expect(wrapper.vm.failed).toBeTruthy();
          expect(wrapper.vm.message).toBe('FAILED');
        });
    });
  });
});
