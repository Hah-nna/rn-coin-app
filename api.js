import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1/";

// export const BASE_ADDRESS = () => {
//   return `http://192.168.200.115:3001/posts`;
// };

export const getTopCoins = () => axios.get(`${BASE_URL}tickers?quotes=KRW`);

export const getCoinList = () =>
  axios.get(`${BASE_URL}tickers?quotes=KRW`, { timeout: 30000 });

export const getCoinById = ({ queryKey }) => {
  const [_, coinId] = queryKey;
  return axios.get(`${BASE_URL}tickers/${coinId}?quotes=KRW`);
};
export const searchCoin = () => {
  return axios.get(`${BASE_URL}tickers?quotes=KRW`);
};
