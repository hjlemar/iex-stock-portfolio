import moment from 'moment';
import axios from 'axios';
import { storeConfig } from '@/store';
import { CHANGE_DATE, QUERY_CHART, STOCK_DATA_FOUND, QUERY_STOCK_DQUOTE, ADD_STOCK_RECENT_HISTORY, SET_CHART_DATA } from '@/store/mutation-types';

jest.mock('axios', () => ({
  get: jest.fn(x => Promise.resolve(x)),
}));

describe('store/index.js', () => {
  const today = moment(new Date()).format('YYYY-MM-DD');

  it('should have a default state of', () => {
    const { date, data, stocks, chart } = storeConfig.state;
    expect(date).toBe(today);
    expect(data).toBeNull();
    expect(stocks).toMatchObject([]);
    expect(chart).toMatchObject([]);
  });

  describe('getters', () => {
    it('date should return today', () => {
      expect(storeConfig.getters.date({ date: today })).toBe(today);
    });
    it('data should return null', () => {
      expect(storeConfig.getters.data({ data: null })).toBeNull();
    });
    it('data should return {a:1, b:2}', () => {
      const data = { a: 1, b: 2 };
      expect(storeConfig.getters.data({ data })).toMatchObject(data);
    });
    it('stocks should return ["O"]', () => {
      const stocks = ['O'];
      expect(storeConfig.getters.stocks({ stocks })).toMatchObject(stocks);
    });
    it('chart should return [{a:1,b:2},{c:1,d:2}]', () => {
      const chart = [{ a: 1, b: 2 },{ c: 1, d: 2 }];
      expect(storeConfig.getters.chart({ chart })).toMatchObject(chart);
    });
  });

  describe('mutations', () => {
    it(`${CHANGE_DATE} should return ${today}`, () => {
      const state = {};
      storeConfig.mutations[CHANGE_DATE](state, { date: today });
      expect(state.date).toBe(today);
    });
    it(`${STOCK_DATA_FOUND} to return an object`, () => {
      const state = {};
      const data = { symbol: 'O', quote: 'O' };
      storeConfig.mutations[STOCK_DATA_FOUND](state, { payload: { data } });
      expect(state.data).toBe(data);
    });
    it(`${ADD_STOCK_RECENT_HISTORY} to return ['O','K']`, () => {
      const state = { stocks: [] };
      const stock = 'O';
      const type = ADD_STOCK_RECENT_HISTORY;
      const addStock = storeConfig.mutations[ADD_STOCK_RECENT_HISTORY];
      addStock(state, { type, payload: stock });
      expect(state.stocks).toMatchObject(['O']);
      addStock(state, { type, payload: 'K' });
      expect(state.stocks).toMatchObject(['K', 'O']);
      addStock(state, { type, payload: stock });
      expect(state.stocks).toMatchObject(['O', 'K']);
    });
    it(`${SET_CHART_DATA} to return [{ a: 1, b: 2 },{ c: 1, d: 2 }]`, () => {
      const payload = [{ a: 1, b: 2 }, { c: 1, d: 2 }];
      const state = {};
      const type = SET_CHART_DATA;
      const setChartData = storeConfig.mutations[type];
      setChartData(state, { type, payload });
      expect(state.chart).toMatchObject(payload);
    });
  });

  describe('actions', () => {
    it('calls QUERY_STOCK_DQUOTE', () => {
      const query = storeConfig.actions[QUERY_STOCK_DQUOTE];
      const commit = jest.fn();
      const dispatch = jest.fn();
      return query({ dispatch, commit }, 'O')
        .then(() => {
          expect(commit.mock.calls.length).toBe(2);
          expect(commit.mock.calls[0][0]).toMatchObject(
            { type: ADD_STOCK_RECENT_HISTORY, payload: 'O' },
          );
          expect(commit.mock.calls[1][0].type).toBe(STOCK_DATA_FOUND);
          // hmm.. payload is the url in this case :| 
        })
        .then(() => {
          expect(dispatch).toBeCalled();
          expect(dispatch.mock.calls[0][0]).toBe(QUERY_CHART);
          // this is only a string... no stock
        });
    });
    it('calls QUERY_CHART', () => {
      const query = storeConfig.actions[QUERY_CHART];
      const commit = jest.fn();
      const parameters = { type: SET_CHART_DATA, payload: undefined };
      return query({ commit }, 'O')
        .then(() => expect(commit).toBeCalled())
        .then(() => expect(commit.mock.calls[0][0]).toMatchObject(parameters));
    });
  });
});
