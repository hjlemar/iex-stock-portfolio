import axios from 'axios';

const URL_ROOT = 'https://api.iextrading.com/1.0';
const STOCK_URL = `${URL_ROOT}/stock`;

export default {

  getDelayedQuote(stock){
    return axios.get(`${STOCK_URL}/${stock}/delayed-quote`);
  },
  getChart(stock){
    return axios.get(`${STOCK_URL}/${stock}/chart`)
  },
};