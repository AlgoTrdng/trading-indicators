// /* eslint-disable no-console */
const Binance = require('binance-api-nodejs');
// const Ftx = require('ftx-api-nodejs');

// const TR = require('../src/true-range');
const ATR = require('../src/average-true-range');
// const RSI = require('../src/rsi');
const IchimokuCloud = require('../src/ichimoku-cloud');

const test = async () => {
  const binance = new Binance();

  try {
    // const candlesticksTotal = await exchange.spot.candlesticks('BTCUSDT', '1m', {
    //   startTime: 1623673920000 - 1000 * 60 * 60,
    //   endTime: new Date('2021-06-14T13:31:00.000Z').getTime(),
    // });
    const candlesticks = await binance.spot.candlesticks('BTCUSDT', '1w', { limit: 50000 });

    const _length = 60;

    const startIndex = _length;
    const startCandles = candlesticks.slice(0, startIndex);

    // const wma = new WMA({
    //   numbers: startCandles,
    //   len: _length,
    // });
    // const hma = new HMA({
    //   numbers: startCandles,
    //   len: _length,
    // });

    const atr = new ATR({
      candlesticks: startCandles,
      len: startIndex,
    });

    // const ichimokuCloud = new IchimokuCloud({
    //   candlesticks: [],
    //   doubleInputs: true,
    // });

    for (let i = startIndex; i < candlesticks.length; i += 1) {
      const {
        o, h, l, c, openTime,
      } = candlesticks[i];

      // wma.update(c);
      // hma.update(c);
      console.log(atr.update({
        o, h, l, c,
      }), new Date(openTime));
      // atr.update({ o, h, l, c });
      // console.log(), new Date(openTime));
      // console.log(ichimokuCloud.update({
      //   h, l,
      // }),
      // new Date(openTime));

    // console.log('MA:', ma.getMovingAverage());
    // console.log('EMA:', ema.getMovingAverage());
    // console.log('WMA:', wma.getMovingAverage());
    // console.log('HMA:', hma.getMovingAverage());
    }

    // console.log(atr.getAtr());
  } catch (error) {
    console.error(error);
  }
};

test();
