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

// CRUD

export const getPost = async () => {
  return await axios.get(
    "https://outgoing-heartbreaking-baron.glitch.me/posts"
  );
  // const getPostData = await axios.get("http://192.168.200.115:3001/posts");

  /**
   * json 서버를 열 때 본인의 ip주소를 맞추어야한다
   * json 서버를 열 때 아래와 같이 입력한다
   * yarn json-server --watch db.json --port 3001 --host 192.168.200.115(192~부터는 자신의 ip주소임)
   * api.js에서 자신의 ip주소로 바꾸세요
   */
};

export const createPost = async (item) => {
  return await axios.post(
    "https://outgoing-heartbreaking-baron.glitch.me/posts",
    item
  );
};
export const updatePost = async (item) => {
  return await axios.patch(
    `https://outgoing-heartbreaking-baron.glitch.me/posts/${item.id}`,
    item
  );
};
export const removePost = async (item) => {
  return await axios.delete(
    `https://outgoing-heartbreaking-baron.glitch.me/posts/${item.id}`
  );
};
