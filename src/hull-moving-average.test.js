const { expect } = require('chai');

const HMA = require('./hull-moving-average');

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

describe('Hull moving average', () => {
  it('should return 0 if not enough values are provided', () => {
    const hma = new HMA({
      numbers: values.slice(0, -1),
      len: 19,
    });

    expect(hma.getMovingAverage()).to.equal(0);
  });

  it('should return hull moving average if only needed amount of values is passed as argument', () => {
    const hma = new HMA({
      numbers: values,
      len: 16,
    });

    expect(hma.getMovingAverage()).to.equal(19.333333333333336);
  });

  it('should return hull moving average if only needed amount of values is passed through update method', () => {
    const hma = new HMA({
      numbers: [],
      len: 16,
    });

    values.forEach((value) => {
      hma.update(value);
    });

    expect(hma.getMovingAverage()).to.equal(19.333333333333336);
  });

  it('should return hull moving average if more than enough values are passed as argument', () => {
    const hma = new HMA({
      numbers: values,
      len: 10,
    });

    expect(hma.getMovingAverage()).to.equal(19.66666666666667);
  });

  it('should return hull moving average if more than enough values are passed through update function', () => {
    const hma = new HMA({
      numbers: [],
      len: 10,
    });

    values.forEach((value) => {
      hma.update(value);
    });

    expect(hma.getMovingAverage()).to.equal(19.66666666666667);
  });
});
