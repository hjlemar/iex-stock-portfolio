import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { CHANGE_DATE, STOCK_DATA_FOUND, QUERY_STOCK_DQUOTE,
  ADD_STOCK_RECENT_HISTORY, SET_CHART_DATA, QUERY_CHART } from './mutation-types';

Vue.use(Vuex);

export const storeConfig = {
  state: {
    date: moment(new Date()).format('YYYY-MM-DD'),
    data: null,
    stocks: [],
    chart: [],
  },
  mutations: {
    [CHANGE_DATE](state, payload) {
      state.date = payload.date;
    },
    [STOCK_DATA_FOUND](state, { payload }) {
      state.data = payload.data;
    },
    [ADD_STOCK_RECENT_HISTORY](state, { payload }) {
      const stock = payload.toUpperCase();
      const temp = state.stocks.filter(item => item !== stock);
      state.stocks = [stock, ...temp];
    },
    [SET_CHART_DATA](state, { payload }) {
      state.chart = [...payload];
    },
  },
  getters: {
    date(state) {
      return state.date;
    },
    data(state) {
      return state.data;
    },
    stocks(state) {
      return state.stocks;
    },
    chart(state) {
      return [...state.chart];
    },
  },
  actions: {
    [QUERY_STOCK_DQUOTE]({ dispatch, commit }, stock) {
      return axios.get(`https://api.iextrading.com/1.0/stock/${stock}/delayed-quote`)
        .then((payload) => {
          commit({ type: ADD_STOCK_RECENT_HISTORY, payload: stock });
          commit({ type: STOCK_DATA_FOUND, payload });
          return dispatch(QUERY_CHART, stock);
        });
    },
    [QUERY_CHART]({ commit }, stock) {
      return axios.get(`https://api.iextrading.com/1.0/stock/${stock}/chart`)
        .then(({ data }) => commit({ type: SET_CHART_DATA, payload: data }));
    },
  },
};

export default new Vuex.Store(storeConfig);
