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
    // const candlesticksTotal = await exchange.spot.candlesticks('BTCUSDT', '1m', {
    //   startTime: 1623673920000 - 1000 * 60 * 60,
    //   endTime: new Date('2021-06-14T13:31:00.000Z').getTime(),
    // });
    const candlesticks = await exchange.spot.candlesticks('BTCUSDT', '1m', { limit: 60 });

    const _length = 50;

    const startIndex = _length + 7;
    const startCandles = candlesticks.slice(0, startIndex).map(({ c }) => c);

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

    for (let i = startIndex; i < candlesticks.slice(0, -1).length; i += 1) {
      const { c, openTime } = candlesticks[i];

      ma.update(c);
      ema.update(c);
      wma.update(c);
      hma.update(c);

      // console.log({
      //   hma: hma.getMovingAverage(),
      //   price: c,
      //   time: new Date(openTime),
      // });
    }

    console.log('MA:', ma.getMovingAverage());
    console.log('EMA:', ema.getMovingAverage());
    console.log('WMA:', wma.getMovingAverage());
    console.log('HMA:', hma.getMovingAverage());
  } catch (error) {
    console.error(error);
  }
};

test('bnb');
