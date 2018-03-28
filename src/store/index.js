import Vue from 'vue';
import Vuex from 'vuex';
import Details from './modules/details';
import Portfolios from './modules/portfolio';

Vue.use(Vuex);

const modules = {
  details: Details,
  portfolios: Portfolios,
};

export const storeConfig = {
  modules,
  state: {
  },
  mutations: {
  },
  getters: {
  },
};

export default new Vuex.Store(storeConfig);
