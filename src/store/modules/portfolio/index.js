import { UPDATE_STOCK, DELETE_STOCK } from './types';

export const storeConfig = {
  portfolios: {
    'portfolio 1': {
      stocks: [
        { symbol: 'O', shares: 100 },
        { symbol: 'T', shares: 20 },
        { symbol: 'M', shares: 450 },
      ],
    },
    'portfolio 2': {
      stocks: [
        { symbol: 'Z', shares: 100 },
        { symbol: 'R', shares: 20 },
        { symbol: 'A', shares: 450 },
      ],
    },
  },
};

const UnknownPortfolioError = portfolio => ({ message: 'Unknown portfolio', portfolio });

const updatePortfolioStocks = (state, portfolio, symbol, op, data) => {
  const portfolioData = state.portfolios[portfolio];
  if (portfolioData) {
    const temp = portfolioData.stocks.filter(item => item.symbol !== symbol);
    portfolioData.stocks = op(data, temp);
  } else {
    throw UnknownPortfolioError(portfolio);
  }
};

export const mutations = {
  [UPDATE_STOCK](state, { stock, portfolio }) {
    const symbol = stock.symbol.toUpperCase();
    updatePortfolioStocks(state, portfolio, symbol,
      (data, items) => [{ ...data, symbol }, ...items],
      stock);
  },
  [DELETE_STOCK](state, { symbol, portfolio }) {
    updatePortfolioStocks(state, portfolio, symbol,
      (data, items) => items);
  },
};

export const getters = {
  getPortfolios({ portfolios }) {
    return Object.keys(portfolios);
  },
  getPortfolioStocks: state => (portfolio) => {
    const portfolioData = state.portfolios[portfolio] || { stocks: [] };
    return portfolioData.stocks;
  },
};

export const actions = {

};

export default {
  state: storeConfig,
  mutations,
  getters,
  actions,
};
