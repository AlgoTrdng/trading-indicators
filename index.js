const MA = require('./src/moving-average');
const EMA = require('./src/exponential-moving-average');
const WMA = require('./src/weighted-moving-average');
const HMA = require('./src/hull-moving-average');
const RSI = require('./src/rsi');
const StochRSI = require('./src/stoch-rsi');
const TR = require('./src/true-range');
const ATR = require('./src/average-true-range');
const IchimokuCloud = require('./src/ichimoku-cloud');

module.exports = {
  MA,
  EMA,
  WMA,
  HMA,
  RSI,
  StochRSI,
  TR,
  ATR,
  IchimokuCloud,
};
