const Binance = require('binance-api-nodejs');

const RSI = require('./rsi');

const binance = new Binance();

const test = async () => {
  const candlesticks = await binance.spot.candlesticks('BTCUSDT', '1d', { limit: 5000 });

  const changes = [];

  for (let i = 1; i < candlesticks.length - 1; i += 1) {
    const { c } = candlesticks[i];
    changes.push(c - candlesticks[i - 1].c);
  }

  const len = 14;
  const initChanges = changes.slice(0, len);

  const rsi = new RSI({
    numbers: initChanges,
    len,
  });

  for (let i = len; i < changes.length; i += 1) {
    // rsi.update(changes[i]);
    console.log(rsi.update(changes[i]), new Date(candlesticks[i + 1].openTime));
  }

  // console.log(rsi.getRsi());
};

test();
