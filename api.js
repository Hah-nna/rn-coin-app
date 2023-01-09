import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1/";

export const getTopCoins = () => axios.get(`${BASE_URL}tickers?quotes=KRW`);

export const getCoinList = () =>
  axios.get(`${BASE_URL}tickers?quotes=KRW&page=${10}`);

export const getCoinById = ({ queryKey }) => {
  const [_, coinId] = queryKey;
  return axios.get(`${BASE_URL}tickers/${coinId}?quotes=KRW`);
};
