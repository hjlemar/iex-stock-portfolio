/* eslint no-unused-vars: 0 */
// eslint is angry about axios, which is getting mocked
import axios from 'axios';
import IEX from '@/lib/iex';

jest.mock('axios', () => ({
  get: jest.fn(x => Promise.resolve(x)),
}));

describe('iex tests', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });
  it('get batch with O', () => {
    IEX.getBatch('O')
      .then(() => {
        expect(axios.get).toBeCalledWith(
          'https://api.iextrading.com/1.0/stock/O/batch?types=delayed-quote,logo,chart&range=1m&last=10');
      });
  });
  it('get batch with O', () => {
    IEX.getChart('O')
      .then(() => {
        expect(axios.get).toBeCalledWith(
          'https://api.iextrading.com/1.0/stock/O/chart');
      });
  });
  it('get batch with O', () => {
    IEX.getDelayedQuote('O')
      .then(() => {
        expect(axios.get).toBeCalledWith(
          'https://api.iextrading.com/1.0/stock/O/delayed-quote');
      });
  });
});

