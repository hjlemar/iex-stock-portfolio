import moment from 'moment';
import { storeConfig } from '@/store';
import { CHANGE_DATE } from '@/store/mutation-types';

describe('store/index.js', () => {
  const today = moment(new Date()).format('YYYY-MM-DD');

  it('should have a default state of', () => {
    const { date } = storeConfig.state;
    expect(date).toBe(today);
  });

  describe('getters', () => {
    it('date should return today', () => {
      expect(storeConfig.getters.date({ date: today })).toBe(today);
    });
  });

  describe('mutations', () => {
    it(`${CHANGE_DATE} should return ${today}`, () => {
      const state = {};
      storeConfig.mutations[CHANGE_DATE](state, { date: today });
      expect(state.date).toBe(today);
    });
  });
});
