const { expect } = require('chai');

const WMA = require('./weighted-moving-average');

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('Weighted moving average', () => {
  it('should return 0 if not enough values passed', () => {
    const wma = new WMA({
      numbers: values.slice(0, -1),
      len: 10,
    });

    expect(wma.getMovingAverage()).to.equal(0);
  });

  it('should return weighted average if same amount of values are passed as length', () => {
    const wma = new WMA({
      numbers: values,
      len: 10,
    });

    expect(wma.getMovingAverage()).to.equal(7);
  });

  it('should return weighted average if same amount of values are passed as length through update method', () => {
    const wma = new WMA({
      numbers: [],
      len: 10,
    });

    values.forEach((val) => {
      wma.update(val);
    });

    expect(wma.getMovingAverage()).to.equal(7);
  });

  it('should return weighted moving average if more initial values are passed than length', () => {
    const wma = new WMA({
      numbers: values,
      len: 5,
    });

    expect(wma.getMovingAverage()).to.equal(8.666666666666666);
  });

  it('should return weighted moving average if values are passed through update method', () => {
    const wma = new WMA({
      numbers: [],
      len: 5,
    });

    values.forEach((val) => {
      wma.update(val);
    });

    expect(wma.getMovingAverage()).to.equal(8.666666666666666);
  });

  describe('getWma method', () => {
    it('should return 0 if not enough values are provided', () => {
      const avg = WMA.getWma(values, 11);

      expect(avg).to.equal(0);
    });

    it('should return avg', () => {
      const avg = WMA.getWma(values, 10);

      expect(avg).to.equal(7);
    });
  });
});
