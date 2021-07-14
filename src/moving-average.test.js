const { expect } = require('chai');

const MA = require('./moving-average');

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('Moving average', () => {
  it('should return 0 if not enough values passed', () => {
    const ma = new MA({
      numbers: values,
      len: 20,
    });

    expect(ma.getMovingAverage()).to.equal(0);
  });

  it('should return average if all values are passed', () => {
    const ma = new MA({
      numbers: values,
      len: 10,
    });

    expect(ma.getMovingAverage()).to.equal(5.5);
  });

  it('should return average if some values are passed as arg and some are passed through update method', () => {
    const ma = new MA({
      numbers: values.slice(0, 5),
      len: 10,
    });

    values.slice(5).forEach((value) => {
      ma.update(value);
    });

    expect(ma.getMovingAverage()).to.equal(5.5);
  });

  it('should return average if all values are passed through update method', () => {
    const ma = new MA({
      numbers: [],
      len: 10,
    });

    values.forEach((value) => {
      ma.update(value);
    });

    expect(ma.getMovingAverage()).to.equal(5.5);
  });

  describe('getSma method', () => {
    it('should return 0 if not enough values are provided', () => {
      const avg = MA.getSma(values, 11);

      expect(avg).to.equal(0);
    });

    it('should return avg', () => {
      const avg = MA.getSma(values, 10);

      expect(avg).to.equal(5.5);
    });
  });
});
