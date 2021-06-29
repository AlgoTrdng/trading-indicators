const RSI = require('./rsi');
const MA = require('./moving-average');

class StochRSI {
  constructor({ numbers, kLen, dLen }) {
    this._len = 14;
    this._kLen = kLen;
    this._dLen = dLen;

    this._ks = [];
    this._d = null;

    this._stochRsis = [];

    this._rsi = new RSI({
      numbers: [],
      len: this._len,
    });
    this._rsis = [];

    this._numbers = new Proxy({
      value: [],
    }, {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this._len) {
          newValue = value.slice(value.length - this._len, value.length);
        }

        this._setStochRsi(newValue);

        target[prop] = newValue;
        return true;
      },
    });

    this._numbers.value = numbers;
  }

  update(number) {
    this._numbers.value = [...this._numbers.value, number];

    return this.getStochRsi();
  }

  getStochRsi() {
    return [this._ks[this._ks.length - 1] === undefined ? null : this._ks[this._ks.length - 1], this._d];
  }

  _setRsi(numbers) {
    if (!this._rsis.length) {
      numbers.forEach((number) => {
        this._rsi.update(number);
      });
    } else {
      this._rsi.update(numbers[numbers.length - 1]);
    }

    if (this._rsis.length === this._len) {
      this._rsis = this._rsis.slice(1);
    }

    this._rsis.push(this._rsi.getRsi());
  }

  _setStochRsi(numbers) {
    if (numbers.length < this._len) {
      return;
    }

    this._setRsi(numbers);

    if (this._rsis.length < this._kLen) {
      return;
    }

    const maxRsi = Math.max(...this._rsis);
    const minRsi = Math.min(...this._rsis);
    const stochRsi = 100 * ((this._rsi.getRsi() - minRsi) / (maxRsi - minRsi));
    this._stochRsis.push(stochRsi);

    if (this._stochRsis.length === Math.max(this._kLen, this._dLen)) {
      this._setStochMas();

      this._stochRsis = this._stochRsis.slice(1);
    }
  }

  _setStochMas() {
    this._ks.push(MA.getSma(this._stochRsis, this._kLen));

    if (this._ks.length === this._dLen) {
      this._d = MA.getSma(this._ks, this._dLen);

      this._ks = this._ks.slice(1);
    }
  }
}

module.exports = StochRSI;
