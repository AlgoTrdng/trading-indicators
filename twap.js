/**
 * @function twap
 * @describe Returns twap from values provided
 *
 * @param {{ o: number, h: number, l: number, c: number }[]} ohlc Array of open, high, low, close values with length of desired time period
 *
 * @return {number} twap
 */
const twap = (ohlc) => {
  // eslint-disable-next-line object-curly-newline
  const ohlc4Values = ohlc.map(({ o, h, l, c }) => (o + h + l + c) / 4);

  return ohlc4Values.reduce((acc, ohlc4) => acc + ohlc4, 0) / ohlc4Values.length;
};

module.exports = twap;
