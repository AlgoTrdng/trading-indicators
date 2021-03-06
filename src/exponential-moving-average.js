const MA = require('./moving-average');

class EMA extends MA {
  constructor({ numbers, len, smoothing = 2 }) {
    super({ len });

    this._alpha = smoothing / (1 + len);

    this._numbers = new Proxy({
      value: [],
    }, {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this._len && this._movingAverage) {
          newValue = [value[value.length - 1]];
        }

        this._setEmaValue(newValue);

        target[prop] = newValue;
        return true;
      },
    });

    if (numbers.length > len) {
      numbers.forEach((value) => {
        this.update(value);
      });
    } else {
      this._numbers.value = numbers;
    }
  }

  _setEmaValue(numbers) {
    if (!this._movingAverage) {
      this._setMaValue(numbers);
      return;
    }

    this._movingAverage = numbers[numbers.length - 1] * this._alpha + this._movingAverage * (1 - this._alpha);
  }

  static wildersEma(change, len, prevAvgChange) {
    return ((len - 1) * prevAvgChange + change) / len;
  }
}

module.exports = EMA;
