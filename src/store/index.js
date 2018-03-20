import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import Details from './modules/details';
import { CHANGE_DATE } from './mutation-types';

Vue.use(Vuex);

const modules = {
  details: Details,
};

export const storeConfig = {
  modules,
  state: {
    date: moment(new Date()).format('YYYY-MM-DD'),
  },
  mutations: {
    [CHANGE_DATE](state, payload) {
      state.date = payload.date;
    },
  },
  getters: {
    date(state) {
      return state.date;
    },
  },
};

export default new Vuex.Store(storeConfig);
