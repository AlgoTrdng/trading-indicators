const getChange = (candlesticks, i) => {
  const { h, l } = candlesticks[i];

  if (!candlesticks[i - 1]) {
    return h - l;
  }

  const { c: prevClose } = candlesticks[i - 1];

  // console.log(candlesticks);

  const change = Math.max(h - l, Math.abs(h - prevClose), Math.abs(l - prevClose));
  return change;
};

class TR {
  constructor(candlesticks) {
    this._candlesticks = candlesticks;

    this._changes = this._initChanges();
  }

  _initChanges() {
    if (!this._candlesticks.length) {
      return [];
    }

    const changes = [];

    for (let i = 0; i < this._candlesticks.length; i += 1) {
      const change = getChange(this._candlesticks, i);
      changes.push(change);
    }

    this._candlesticks = this._candlesticks[this._candlesticks.length - 1];

    return changes;
  }

  update(candlestick) {
    const change = getChange([this._candlesticks, candlestick], 1);

    this._changes = [...this._changes.value, change];

    this._candlesticks = candlestick;

    return change;
  }

  getLast() {
    return this._changes[this._changes.length - 1];
  }

  getAllChanges() {
    return this._changes;
  }

  static getChanges(candlesticks) {
    const changes = [];

    for (let i = 0; i < candlesticks.length; i += 1) {
      const change = getChange(candlesticks, i);
      changes.push(change);
    }

    return changes;
  }

  static getChange(candlesticks) {
    const change = getChange(candlesticks, candlesticks.length - 1);
    return change;
  }
}

module.exports = TR;
