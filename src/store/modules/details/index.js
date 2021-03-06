import axios from 'axios';
import { GET_DETAILS, SAVE_DETAILS, QUERY_CHART } from './types';
import IEX from '@/lib/iex';


export const storeConfig = {
  infos: [],
  max: process.env.MAX_DETAILS || 10,
};

export const mutations = {
  [SAVE_DETAILS](state, { payload }) {
    const symbol = payload.symbol.toUpperCase();
    const stock = state.infos.find(item => item.symbol === symbol) || {};
    const temp = state.infos.filter(item => item.symbol !== symbol);
    state.infos = [{ ...stock, ...payload, symbol }, ...temp];
  },
};

export const getters = {
  detailList({ infos }) {
    return infos;
  },
  currentDetails({ infos }) {
    const [current = null] = infos;
    return current;
  },
  recentList({ infos }) {
    return infos.map(item => item.symbol);
  },
};

export const actions = {
  [GET_DETAILS]({ dispatch, commit }, symbol) {
    return IEX.getBatch(symbol)
      .then(({ data }) => {
        commit({ type: SAVE_DETAILS, payload: { symbol, ...data} });
      });
  },
};

export default {
  state: storeConfig,
  mutations,
  getters,
  actions,
};

