const MA = require('./moving-average');

const wildersEma = (change, len, prevAvgChange) => ((len - 1) * prevAvgChange + change) / len;

class RSI {
  constructor({ numbers, len }) {
    this._len = len;
    this._rsi = 0;

    this._prevAvgUp = null;
    this._prevAvgDown = null;

    this._numbers = new Proxy({
      value: [],
    }, {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this._len) {
          newValue = value.slice(value.length - this._len, value.length);
        }

        target[prop] = newValue;
        this._setRsi(newValue);
        return true;
      },
    });
    this._numbers.value = numbers;
  }

  update(number) {
    this._numbers.value = [...this._numbers.value, number];

    return this._rsi;
  }

  getRsi() {
    return this._rsi;
  }

  _setRsi(numbers) {
    if (this._prevAvgUp === null && this._prevAvgDown === null) {
      if (numbers.length < this._len) {
        return;
      }

      const changes = numbers.reduce((acc, change) => {
        if (change < 0) {
          acc.down = [...acc.down, Math.abs(change)];
        } else if (change > 0) {
          acc.up = [...acc.up, change];
        }

        return acc;
      }, {
        up: [],
        down: [],
      });

      this._prevAvgUp = MA.getSma(changes.up, this._len);
      this._prevAvgDown = MA.getSma(changes.down, this._len);
      // eslint-disable-next-line no-nested-ternary
      this._rsi = this._prevAvgUp === 0 ? 0 : this._prevAvgDown === 0 ? 100 : 100 - 100 / (1 + this._prevAvgUp / this._prevAvgDown);
      return;
    }

    const lastChange = this._numbers.value[this._numbers.value.length - 1];

    const avgUp = wildersEma(lastChange > 0 ? Math.abs(lastChange) : 0, this._len, this._prevAvgUp);
    const avgDown = wildersEma(lastChange < 0 ? Math.abs(lastChange) : 0, this._len, this._prevAvgDown);

    this._prevAvgUp = avgUp;
    this._prevAvgDown = avgDown;

    // eslint-disable-next-line no-nested-ternary
    this._rsi = avgUp === 0 ? 0 : avgDown === 0 ? 100 : 100 - 100 / (1 + avgUp / avgDown);
  }
}

module.exports.wildersEma = wildersEma;
module.exports = RSI;
