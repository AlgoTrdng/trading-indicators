/**
 * Returns moving average from values provided
 *
 * @param {number[]} ohlc Array of numbers values with length of desired time period
 *
 * @return {number} moving average
 */
const movingAverage = (ohlc) => (
  ohlc.reduce((acc, _ohlc) => acc + _ohlc, 0) / ohlc.length
);

module.exports = movingAverage;
