const { expect } = require('chai');

const EMA = require('./exponential-moving-average');

const values = [1, 5, 2, 8, 10, 9, 11, 15, 49, 3];

describe('Exponential moving average', () => {
  it('should return 0 if not enough values passed', () => {
    const ema = new EMA({
      numbers: values.slice(0, -1),
      len: 10,
    });

    expect(ema.getMovingAverage()).to.equal(0);
  });

  it('should return simple average if same amount of values are passed as length', () => {
    const ema = new EMA({
      numbers: values,
      len: 10,
    });

    expect(ema.getMovingAverage()).to.equal(11.3);
  });

  it('should return simple average if same amount of values are passed as length through update method', () => {
    const ema = new EMA({
      numbers: [],
      len: 10,
    });

    values.forEach((value) => {
      ema.update(value);
    });

    expect(ema.getMovingAverage()).to.equal(11.3);
  });

  it('should return exponential moving average if all values are passed as argument', () => {
    const ema = new EMA({
      numbers: values,
      len: 5,
    });

    expect(ema.getMovingAverage()).to.equal(16.474897119341563);
  });

  it('should return exponential moving average if values are passed through update method', () => {
    const ema = new EMA({
      numbers: [],
      len: 5,
    });

    values.forEach((value) => {
      ema.update(value);
    });

    expect(ema.getMovingAverage()).to.equal(16.474897119341563);
  });

  it('should return exponential moving average if some values are passed as arguments and some through update method', () => {
    const ema = new EMA({
      numbers: values.slice(0, 5),
      len: 5,
    });

    values.slice(5).forEach((value) => {
      ema.update(value);
    });

    expect(ema.getMovingAverage()).to.equal(16.474897119341563);
  });

  it('should return exponential moving average if less than length values are passed as argument and other are passed through update method', () => {
    const ema = new EMA({
      numbers: values.slice(0, 3),
      len: 5,
    });

    values.slice(3).forEach((value) => {
      ema.update(value);
    });

    expect(ema.getMovingAverage()).to.equal(16.474897119341563);
  });
});
