const coinPriceSlice = (price) => {
  return Math.trunc(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default coinPriceSlice;
