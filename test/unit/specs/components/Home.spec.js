import { shallow, createLocalVue } from '@vue/test-utils';
import Home from '@/components/Home';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('Home', () => {
  it('should render component and match snapshot', () => {
    const wrapper = shallow(Home, { store: {}, localVue });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
