const MA = require('./moving-average');

class WMA extends MA {
  constructor({ numbers, len }) {
    super({ len });

    this._numbers = new Proxy({
      value: [],
    }, {
      set: (target, prop, value) => {
        let newValue = value;

        if (value.length > this._len) {
          newValue = value.slice(value.length - this._len, value.length);
        }

        target[prop] = newValue;

        return true;
      },
    });

    this._numbers.value = numbers;
  }
}

module.exports = WMA;
