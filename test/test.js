/* eslint-disable no-console */
const Binance = require('binance-api-nodejs');

const MA = require('../src/moving-average');
const EMA = require('../src/exponential-moving-average');
const WMA = require('../src/weighted-moving-average');
const HMA = require('../src/hull-moving-average');
const RSI = require('../src/rsi');

const test = async () => {
  const binance = new Binance();

  try {
    // const candlesticksTotal = await exchange.spot.candlesticks('BTCUSDT', '1m', {
    //   startTime: 1623673920000 - 1000 * 60 * 60,
    //   endTime: new Date('2021-06-14T13:31:00.000Z').getTime(),
    // });
    const candlesticks = await binance.spot.candlesticks('BTCUSDT', '1h', { limit: 100 });

    const _length = 14;

    const startIndex = _length;
    const startCandles = candlesticks.slice(0, startIndex).map(({ o, c }) => ({ o, c }));

    // const ma = new MA({
    //   numbers: startCandles,
    //   len: _length,
    // });
    // // TODO: Fix ema
    // const ema = new EMA({
    //   numbers: startCandles,
    //   len: _length,
    // });
    // const wma = new WMA({
    //   numbers: startCandles,
    //   len: _length,
    // });
    // const hma = new HMA({
    //   numbers: startCandles,
    //   len: _length,
    // });

    const rsi = new RSI({
      numbers: startCandles,
      len: _length,
    });

    for (let i = startIndex; i < candlesticks.slice(0, -1).length; i += 1) {
      const { o, c, openTime } = candlesticks[i];

      // ma.update(c);
      // ema.update(c);
      // wma.update(c);
      // hma.update(c);

      rsi.update({ o, c });

      console.log({
        rsi: rsi.getRsi(),
        time: new Date(openTime),
        c,
      });
    }

    // console.log('MA:', ma.getMovingAverage());
    // console.log('EMA:', ema.getMovingAverage());
    // console.log('WMA:', wma.getMovingAverage());
    // console.log('HMA:', hma.getMovingAverage());
  } catch (error) {
    console.error(error);
  }
};

test();
