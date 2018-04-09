import store, { storeConfig, getters, mutations, actions } from '@/store/modules/portfolio';
import { UPDATE_STOCK, DELETE_STOCK } from '@/store/modules/portfolio/types';

describe('store/modules/portfolio', () => {
  it('store should be a default export', () => {
    expect(store).not.toBe(null);
  });
  it('storeConfig should have two porfolios', () => {
    const { portfolios } = storeConfig;
    expect(portfolios).not.toBe(null);
    expect(Object.keys(portfolios).length).toBe(2);
  });
  describe('getters', () => {
    let state;
    beforeEach(() => {
      state = {
        portfolios: {
          a: { stocks: { symbol: 'A', shares: 450 } },
          b: { stocks: { symbol: 'B', shares: 450 } },
        },
      };
    });
    it('getPortfolios should return two portfolios', () => {
      const portfolios = getters.getPortfolios(state);
      expect(portfolios).not.toBeNull();
      expect(portfolios.length).toBe(2);
      expect(portfolios).toEqual(expect.arrayContaining(['b', 'a']));
    });
    it('getPortfolioStocks should return a function', () => {
      const func = getters.getPortfolioStocks(state);
      expect(func).toBeInstanceOf(Function);
    });
    it('getPorfolioStocks should return a default when unknown portfolio', () => {
      const func = getters.getPortfolioStocks(state);
      const stocks = func('UNKNOWN PORFOLIO');
      expect(stocks).toMatchObject([]);
    });
    it('getPorfolioStocks should return a', () => {
      const func = getters.getPortfolioStocks(state);
      const a = func('a');
      expect(a).toMatchObject(state.portfolios.a.stocks);
    });
  });
  describe('mutations', () => {
    let state;
    beforeEach(() => {
      state = {
        portfolios: {
          newPortfolio: {
            stocks: [],
          },
        },
      };
    });
    it('UPDATE_STOCK should add { symbol: XYZ, shares: 1000} to empty portfolio', () => {
      const stock = { symbol: 'XYZ', shares: 1000 };
      mutations[UPDATE_STOCK](state, { portfolio: 'newPortfolio', stock });
      expect(state.portfolios.newPortfolio.stocks.length).toBe(1);
      expect(state.portfolios.newPortfolio.stocks[0]).toMatchObject(stock);
    });
    it('UPDATE_STOCK should update XYZ shares to 120 from 1000', () => {
      const stock = { symbol: 'XYZ', shares: 1000 };
      state.portfolios.newPortfolio.stocks.push({ ...stock });
      expect(state.portfolios.newPortfolio.stocks[0]).toMatchObject(stock);
      stock.shares = 120;
      mutations[UPDATE_STOCK](state, { portfolio: 'newPortfolio', stock });
      expect(state.portfolios.newPortfolio.stocks.length).toBe(1);
      expect(state.portfolios.newPortfolio.stocks[0]).toMatchObject(stock);
    });
    it('UPDATE_STOCK should throw an error for unknown portfolio', () => {
      expect(() => {
        mutations[UPDATE_STOCK](state, { portfolio: 'UNKNOWN_PORTFOLIO' });
      }).toThrow();
    });
    it('DELETE_STOCK should throw an error for unknown portfolio', () => {
      expect(() => {
        mutations[DELETE_STOCK](state, { portfolio: 'UNKNOWN_PORTFOLIO' });
      }).toThrow();
    });
    it('DELETE_STOCK should delete a stock from the porfolio', () => {
      const stocks = [
        { symbol: 'XYZ', shares: 1000 },
        { symbol: 'ABC', shares: 1000 },
      ];
      state.portfolios.newPortfolio.stocks = [...stocks];
      mutations[DELETE_STOCK](state, { portfolio: 'newPortfolio', symbol: 'XYZ' });
      expect(state.portfolios.newPortfolio.stocks.length).toBe(1);
      expect(state.portfolios.newPortfolio.stocks[0]).toMatchObject(stocks[1]);
    });
    it('DELETE_STOCK should not delete an unknown stock from the porfolio', () => {
      const stocks = [
        { symbol: 'XYZ', shares: 1000 },
        { symbol: 'ABC', shares: 1000 },
      ];
      state.portfolios.newPortfolio.stocks = [...stocks];
      mutations[DELETE_STOCK](state, { portfolio: 'newPortfolio', symbol: 'LMN' });
      expect(state.portfolios.newPortfolio.stocks.length).toBe(2);
    });
  });
});
