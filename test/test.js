const ema = require('../exponential-moving-average');

const prices = [
  36.435,
  36.233,
  35.61,
  36.038,
  36.857,
  36.642,
  35.614,
  36.467,
  36.419,
  37.463,
  37.792,
  38.15,
  38.343,
  38.1,
  38.594,
  38.293,
  38.767,
  39.138,
  40.994,
  41.257,
  39.475,
  39.377,
];

const test = () => {
  console.log(ema({
    prices,
    prevEma: 38.116,
    days: 21,
  }));
};

test();
