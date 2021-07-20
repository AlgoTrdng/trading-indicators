const getHighLowAvg = (candlesticks, len) => {
  const startingHL = candlesticks[candlesticks.length - len];

  let periodHigh = startingHL.h;
  let periodLow = startingHL.l;

  for (let i = 1; i < candlesticks.length; i += 1) {
    const { h, l } = candlesticks[i];

    periodHigh = Math.max(periodHigh, h);
    periodLow = Math.min(periodLow, l);
  }

  return (periodHigh + periodLow) / 2;
};

class IchimokuCloud {
  constructor({
    candlesticks, conversionLineLen = 9, baseLineLen = 26, leadingSpanBLen = 52, displacement = 26, doubleInputs = false,
  }) {
    this.conversionLineLen = conversionLineLen;
    this.baseLineLen = baseLineLen;
    this.leadingSpanBLen = leadingSpanBLen;
    this.displacement = displacement;

    if (doubleInputs) {
      this.conversionLineLen *= 2;
      this.baseLineLen *= 2;
      this.leadingSpanBLen *= 2;
    }

    this.conversionLine = 0;
    this.baseLine = 0;

    this._leadingSpansA = [];
    this._leadingSpansB = [];

    this.leadingSpanA = 0;
    this.leadingSpanB = 0;

    this._candlesticks = new Proxy({
      value: [],
    },
    {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this.leadingSpanBLen + this.displacement) {
          newValue = value.slice(1);
        }

        target[prop] = newValue;

        this._calculateConversionLine(newValue.slice(-this.conversionLineLen));
        this._calculateBaseLine(newValue.slice(-this.baseLineLen));
        this._calculateLeadingSpanA();
        this._calculateLeadingSpanB(newValue.slice(-this.leadingSpanBLen));

        return true;
      },
    });

    candlesticks.forEach((candlestick) => {
      this.update(candlestick);
    });
  }

  update(candlestick) {
    this._candlesticks.value = [...this._candlesticks.value, candlestick];

    return {
      conversionLine: this.conversionLine,
      baseLine: this.baseLine,
      leadingSpanA: this.leadingSpanA,
      leadingSpanB: this.leadingSpanB,
    };
  }

  getSpans() {
    return {
      conversionLine: this.conversionLine,
      baseLine: this.baseLine,
      leadingSpanA: this.leadingSpanA,
      leadingSpanB: this.leadingSpanB,
    };
  }

  _calculateConversionLine(candlesticks) {
    if (candlesticks.length < this.conversionLineLen) {
      return;
    }

    const cl = getHighLowAvg(candlesticks, this.conversionLineLen);

    this.conversionLine = cl;
  }

  _calculateBaseLine(candlesticks) {
    if (candlesticks.length < this.baseLineLen) {
      return;
    }

    const bl = getHighLowAvg(candlesticks, this.baseLineLen);

    this.baseLine = bl;
  }

  _calculateLeadingSpanA() {
    if (!this.conversionLine || !this.baseLine) {
      return;
    }

    const currentLeadingSpanA = (this.conversionLine + this.baseLine) / 2;

    this._leadingSpansA = [
      ...this._leadingSpansA,
      currentLeadingSpanA,
    ];

    if (this._leadingSpansA.length > this.displacement + 1) {
      this._leadingSpansA = this._leadingSpansA.slice(1);
    }

    this._setLeadingSpanA();
  }

  _setLeadingSpanA() {
    if (this._leadingSpansA.length < this.displacement + 1) {
      return;
    }

    [this.leadingSpanA] = this._leadingSpansA;
  }

  _calculateLeadingSpanB(candlesticks) {
    if (candlesticks.length < this.leadingSpanBLen) {
      return;
    }

    const currentLeadingSpanB = getHighLowAvg(candlesticks, this.leadingSpanBLen);

    this._leadingSpansB = [
      ...this._leadingSpansB,
      currentLeadingSpanB,
    ];

    if (this._leadingSpansB.length > this.displacement + 1) {
      this._leadingSpansB = this._leadingSpansB.slice(1);
    }

    this._setLeadingSpanB();
  }

  _setLeadingSpanB() {
    if (this._leadingSpansB.length < this.displacement + 1) {
      return;
    }

    [this.leadingSpanB] = this._leadingSpansB;
  }
}

module.exports = IchimokuCloud;
