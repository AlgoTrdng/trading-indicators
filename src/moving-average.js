class MA {
  constructor({ numbers, len }) {
    this._movingAverage = 0;

    this._len = len;
    this._numbers = new Proxy({
      value: numbers,
    }, {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this._len) {
          newValue = value.slice(value.length - this._len, value.length);
        }

        target[prop] = newValue;
        this._setMaValue(newValue);
        return true;
      },
    });
  }

  update(number) {
    this._numbers.value = [...this._numbers.value, number];

    return this._movingAverage;
  }

  getMovingAverage() {
    return this._movingAverage;
  }

  _setMaValue(numbers) {
    if (numbers.length < this._len) {
      return;
    }

    this._movingAverage = numbers.reduce((ma, number) => ma + number, 0) / this._len;
  }
}

module.exports = MA;
