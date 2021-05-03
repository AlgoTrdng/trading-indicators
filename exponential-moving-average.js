const ma = require('./moving-average');

/**
 * Calculates exponential moving average from provided values
 *
 * @param {{ prices?: number[], day?: number, prevEma?: number, smoothing?: number }} param0
 * @returns {number} exponential moving average
 */
const ema = ({
  prices, days, prevEma, smoothing = 2,
}) => {
  const _length = days || (prices.length - 1);

  const alpha = smoothing / (1 + _length);
  const prevValue = prevEma || ma(prices.slice(0, prices.length - 1));

  return prices[prices.length - 1] * alpha + prevValue * (1 - alpha);
};

module.exports = ema;
