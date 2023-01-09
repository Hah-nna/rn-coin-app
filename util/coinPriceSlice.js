const coinPriceSlice = (price) => {
  return Math.trunc(price).toLocaleString();
};

export default coinPriceSlice;
