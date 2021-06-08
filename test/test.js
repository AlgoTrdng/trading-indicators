/* eslint-disable no-console */
const Ftx = require('ftx-api-nodejs');
const Binance = require('binance-api-nodejs');

const MA = require('../src/moving-average');
const EMA = require('../src/exponential-moving-average');
const WMA = require('../src/weighted-moving-average');
const HMA = require('../src/hull-moving-average');

const test = async (_exchange) => {
  const exchange = _exchange === 'bnb' ? new Binance() : new Ftx();

  try {
    const candlesticks = await exchange.spot.candlesticks('RAY/USD', '1d', { limit: 50000 });

    const _length = 20;
    const startCandles = candlesticks.slice(0, _length + 20).map(({ c }) => c);

    // console.log(startCandles);

    const ma = new MA({
      numbers: startCandles,
      len: _length,
    });
    const ema = new EMA({
      numbers: startCandles,
      len: _length,
    });
    const wma = new WMA({
      numbers: startCandles,
      len: _length,
    });
    const hma = new HMA({
      numbers: startCandles,
      len: _length,
    });

    // for (let i = _length; i < candlesticks.slice(0, -1).length; i += 1) {
    //   const { c } = candlesticks[i];

    //   ma.update(c);
    //   ema.update(c);
    //   wma.update(c);
    //   hma.update(c);
    // }

    console.log('MA:', ma.getMovingAverage());
    console.log('EMA:', ema.getMovingAverage());
    console.log('WMA:', wma.getMovingAverage());
    console.log('HMA:', hma.getMovingAverage());
  } catch (error) {
    console.error(error);
  }
};

test('FTX');
