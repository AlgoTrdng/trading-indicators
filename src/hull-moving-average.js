const MA = require('./moving-average');
const WMA = require('./weighted-moving-average');

class HMA extends MA {
  constructor({ numbers, len }) {
    super({ len });

    this._hmaLength = Math.floor(Math.sqrt(this._len));
    this._wmas = [];

    this._numbers = new Proxy({
      value: numbers,
    }, {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this._len + this._hmaLength) {
          newValue = value.slice(value.length - this._len - this._hmaLength, value.length);
        }

        target[prop] = newValue;
        this._setWmas();
        this._setHmaValue(newValue);
        return true;
      },
    });
  }

  _setWmas() {
    if (!this._wmas.length) {
      // Init WMAS
      for (let i = 0; i < this._hmaLength; i += 1) {
        const numbers = this._numbers.value.slice(0 + i, i + this._len);

        this._wmas = [
          ...this._wmas,
          2 * WMA.getWma(numbers, Math.floor(this._len / 2)) - WMA.getWma(numbers, this._len),
        ];
      }
      return;
    }

    const numbers = this._numbers.value.slice(this._numbers.value.length - this._len, this._numbers.value.length);

    this._wmas = [
      ...this._wmas.slice(1),
      2 * WMA.getWma(numbers.slice(numbers.length - Math.floor(this._len / 2)), Math.floor(this._len / 2)) - WMA.getWma(numbers, this._len),
    ];
  }

  _setHmaValue() {
    if (this._wmas.length < this._hmaLength) {
      return;
    }

    this._movingAverage = WMA.getWma(this._wmas, this._hmaLength);
  }
}

module.exports = HMA;
