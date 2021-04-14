/**
 * @function movingAverage
 * @describe Returns moving average from values provided
 *
 * @param {{ o: number, h: number, l: number, c: number }[]} ohlc Array of open, high, low, close values with length of desired time period
 * @param {'o' | 'h' | 'l' | 'c'} price Price data => o - Open, h - High, l - Low, c - Close
 *
 * @return {number} moving average
 */
const movingAverage = (ohlc, price) => (
  ohlc.reduce((acc, _ohlc) => acc + _ohlc[price], 0) / ohlc.length
);

module.exports = movingAverage;
