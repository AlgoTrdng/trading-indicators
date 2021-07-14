// /* eslint-disable no-console */
const Binance = require('binance-api-nodejs');
const Ftx = require('ftx-api-nodejs');

const WMA = require('../src/weighted-moving-average');
const HMA = require('../src/hull-moving-average');
const RSI = require('../src/rsi');

const test = async () => {
  const binance = new Ftx();

  try {
    // const candlesticksTotal = await exchange.spot.candlesticks('BTCUSDT', '1m', {
    //   startTime: 1623673920000 - 1000 * 60 * 60,
    //   endTime: new Date('2021-06-14T13:31:00.000Z').getTime(),
    // });
    const candlesticks = await binance.spot.candlesticks('COPE/USD', '1d', { limit: 50000 });

    const _length = 50;

    const startIndex = 0;
    const startCandles = candlesticks.slice(0, startIndex).map(({ o, c }) => ({ o, c }));

    // const wma = new WMA({
    //   numbers: startCandles,
    //   len: _length,
    // });
    const hma = new HMA({
      numbers: startCandles,
      len: _length,
    });

    for (let i = startIndex; i < candlesticks.slice(0, -1).length; i += 1) {
      const { o, c, openTime } = candlesticks[i];

      // wma.update(c);
      hma.update(c);
      console.log(hma);

    // console.log('MA:', ma.getMovingAverage());
    // console.log('EMA:', ema.getMovingAverage());
    // console.log('WMA:', wma.getMovingAverage());
    // console.log('HMA:', hma.getMovingAverage());
    }

    console.log(hma.getMovingAverage());
  } catch (error) {
    console.error(error);
  }
};

test();
