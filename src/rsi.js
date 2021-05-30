// const ema = require('./ema');

// const rsi = (candles, len = 14) => {
//   const [ups, downs] = candles.reduce((acc, { o, c }) => {
//     if (c >= o) {
//       acc[0].push(c / o - 1);
//     }

//     if (o >= c) {
//       acc[1].push(1 - c / o);
//     }

//     return acc;
//   }, [[], []]);

//   const avgUp = ema(ups, len, 1 / len);
//   const avgDown = ema(downs, len, 1 / len);

//   // console.log(avgUp, avgDown);

//   // eslint-disable-next-line no-nested-ternary
//   return avgUp === 0 ? 0 : avgDown === 0 ? 100 : 100 - (100 / (1 + avgUp / avgDown));
// };

// module.exports = rsi;
