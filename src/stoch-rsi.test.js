const Ftx = require('ftx-api-nodejs');
const Binance = require('binance-api-nodejs');

const StochRSI = require('./stoch-rsi');

const ftx = new Ftx();
const binance = new Binance();

const test = async () => {
  // const candlesticks = await ftx.spot.candlesticks('ETH/USD', '1d', { limit: 50000 });
  const candlesticks = await binance.spot.candlesticks('ETHUSDT', '1h', { limit: 1500 });

  const changes = [];

  for (let i = 1; i < candlesticks.length - 1; i += 1) {
    const { c } = candlesticks[i];
    changes.push(c - candlesticks[i - 1].c);
  }
  const stochRsi = new StochRSI({
    numbers: [],
    kLen: 3,
    dLen: 3,
  });

  for (let i = 0; i < changes.length; i += 1) {
    console.log(stochRsi.update(changes[i]), new Date(candlesticks[i + 1].openTime));
  }

  console.log(stochRsi.getStochRsi());
};

test();
