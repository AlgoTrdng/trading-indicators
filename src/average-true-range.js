const TR = require('./true-range');
const MA = require('./moving-average');
const EMA = require('./exponential-moving-average');

class ATR {
  constructor({ candlesticks, len }) {
    this._len = len;
    this._atr = 0;

    this._changes = new Proxy({
      value: [],
    }, {
      set: (target, prop, value) => {
        this._setAtr(value);

        target[prop] = value;
        return true;
      },
    });

    this._prevCandlestick = candlesticks[candlesticks.length - 1];
    const changes = TR.getChanges(candlesticks);

    if (changes.length > len) {
      changes.forEach((change) => {
        this.update(change);
      });
    } else {
      this._changes.value = changes;
    }
  }

  _setAtr(changes) {
    if (changes.length < this._len) {
      return;
    }

    if (!this._atr) {
      this._atr = MA.getSma(changes.slice(0, this._len), this._len);
      return;
    }

    const newAtr = EMA.wildersEma(changes, this._len, this._atr);

    this._atr = newAtr;
  }

  update(candlestick) {
    const change = TR.getChange([this._prevCandlestick, candlestick]);

    if (this._atr) {
      this._changes.value = change;
    } else {
      this._changes.value = [...this._changes.value, change];
    }

    this._prevCandlestick = candlestick;

    return this._atr;
  }

  getAtr() {
    return this._atr;
  }
}

module.exports = ATR;
