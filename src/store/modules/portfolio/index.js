
export const storeConfig = {

};

export const mutations = {

};

export const getters = {
  getPortfolios(state) {
    return ['Portfolio 1', 'Portfolio 2'];
  },
  getPortfolioStocks: state => (portfolio) => {
    const stocks = [
      { symbol: 'O', shares: 100 },
      { symbol: 'T', shares: 20 },
      { symbol: 'M', shares: 450 },
    ];
    return stocks;
  },
};

export const actions = {

};

export default {
  storeConfig,
  mutations,
  getters,
  actions,
};
