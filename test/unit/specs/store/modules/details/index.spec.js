import axios from 'axios';
import store, { storeConfig, getters, mutations, actions } from '@/store/modules/details';
import { SAVE_DETAILS, QUERY_CHART, GET_DETAILS } from '@/store/modules/details/types';

jest.mock('axios', () => ({
  get: jest.fn(x => Promise.resolve(x)),
}));

describe('store/modules/details', () => {
  it('store should be default exported', () => {
    expect(store).toBeTruthy();
  });
  it('should have a default state of empty list and max length of 10', () => {
    const { infos, max } = storeConfig;
    expect(infos).toMatchObject([]);
    expect(max).toBe(10);
  });
  describe('getters', () => {
    it('detailList should start empty', () => {
      expect(getters.detailList({ infos: [] })).toMatchObject([]);
    });
    it('detailist should be [{symbol: "O", quote: 10.00}]', () => {
      const infos = [{ symbol: 'O', quote: 10.00 }];
      expect(getters.detailList({ infos })).toMatchObject(infos);
    });
    it('currentDetails returns null', () => {
      expect(getters.currentDetails({ infos: [] })).toBeFalsy();
    });
    it('currentDetails returns [{symbol: "O" }]', () => {
      const answer = { symbol: 'O' };
      const infos = [answer, { symbol: 'O' }, { symbol: 'N' }];
      expect(getters.currentDetails({ infos })).toMatchObject(answer);
    });
    it('recentList returns an empty list', () => {
      expect(getters.recentList({ infos: [] })).toMatchObject([]);
    });
    it('recentList returns [O,A,B]', () => {
      const symbols = ['O', 'A', 'B'];
      const infos = symbols.map(symbol => ({ symbol }));
      expect(getters.recentList({ infos })).toMatchObject(symbols);
    });
  });

  describe('mutations', () => {
    it('adds a new record to the infos array', () => {
      const payload = { symbol: 'O', quote: 50.00 };
      const state = { infos: [] };
      mutations[SAVE_DETAILS](state, { payload });
      expect(state).toMatchObject({ infos: [payload] });
    });
    it('adds a new record to the infos array and makes it the first', () => {
      const payload = { symbol: 'O', quote: 50.00 };
      const infos = [{ symbol: 'R', quote: 23.00 }];
      const state = { infos: [...infos] };
      mutations[SAVE_DETAILS](state, { payload });
      expect(state).toMatchObject({ infos: [payload, ...infos] });
    });
    it('updates a record in the infos array and makes it the first', () => {
      const payload = { symbol: 'O', quote: 50.00, dividend: 1.25 };
      const other = { symbol: 'R', quote: 23.00 };
      const state = { infos: [
        other,
        { symbol: 'O', quote: 40.00 },
      ] };
      mutations[SAVE_DETAILS](state, { payload });
      // check that it is first and equivalent
      expect(state).toMatchObject({ infos: [payload, other] });
    });
    it('updates a record in the infos array with partial info and makes it the first', () => {
      const payload = { symbol: 'O', quote: 50.00 };
      const other = { symbol: 'R', quote: 23.00 };
      const orig = { symbol: 'O', quote: 40.00, dividend: 1.25 };
      const state = { infos: [other, orig] };
      mutations[SAVE_DETAILS](state, { payload });
      // check that it is first and equivalent
      expect(state).toMatchObject({ infos: [
        { symbol: 'O', quote: 50.00, dividend: 1.25 },
        other,
      ] });
    });
  });

  describe('actions', () => {
    it('calls GET_DETAILS', () => {
      const commit = jest.fn();
      const dispatch = jest.fn();
      const symbol = 'O';
      return actions[GET_DETAILS]({ dispatch, commit }, symbol )
        .then(() => {
          expect(commit.mock.calls.length).toBe(1);
          expect(commit.mock.calls[0][0]).toMatchObject(
            { type: SAVE_DETAILS, payload: { symbol } },
          );
        });
    });
  });
});
