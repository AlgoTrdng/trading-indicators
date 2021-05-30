const MA = require('./moving-average');

class WMA extends MA {
  constructor({ numbers, len }) {
    super({ len });

    this._norm = 0;
    this._setNorm();

    this._numbers = new Proxy({
      value: numbers,
    }, {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this._len) {
          newValue = value.slice(value.length - this._len, value.len);
        }

        target[prop] = newValue;
        this._setWmaValue(newValue);
        return true;
      },
    });
  }

  _setNorm() {
    for (let i = 0; i < this._len; i += 1) {
      this._norm += this._len - i;
    }
  }

  _setWmaValue(numbers) {
    if (numbers.length < this._len) {
      return;
    }

    let wmaValues = 0;

    for (let i = 0; i < this._len; i += 1) {
      const weight = this._len - i;
      wmaValues += this._numbers.value[this._len - i - 1] * weight;
    }

    this._movingAverage = wmaValues / this._norm;
  }

  static getWma(numbers, len) {
    if (numbers.length < len) {
      return 0;
    }

    let norm = 0;
    let vmaValues = 0;

    for (let i = 0; i < len; i += 1) {
      const weight = len - i;
      norm += weight;
      vmaValues += numbers[len - i - 1] * weight;
    }

    return vmaValues / norm;
  }
}

module.exports = WMA;
