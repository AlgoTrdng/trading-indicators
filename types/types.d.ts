export = TradingIndicators;

declare namespace TradingIndicators {
  export namespace MA {
    export interface Options {
      numbers: number[];
      len: number;
    }
  }
  
  export class MA {
    constructor({ numbers, len }: MA.Options);
    private _movingAverage;
    private _len;
    private _numbers;
  
    public update(number: number): number;
    public getMovingAverage(): number;
    private _setMaValue;
  }


  export namespace EMA {
    export interface Options extends MA.Options {
      smoothing?: number;
    }
  }
  
  export class EMA extends MA {
    constructor({ numbers, len, smoothing }: EMA.Options);
  
    private _alpha;
    private _setEmaValue;
  }


  export class WMA extends MA {
    public static getWma(numbers: number[], len: number): number;
  
    private _norm;
    private _setNorm;
    private _setWmaValue;
  }

  export class HMA extends MA {
    private _hmaLength;
    private _wmas;
    private _setWmas;
    private _setHmaValue;
  }

  export class RSI {
    constructor({ numbers, len }: MA.Options);

    private _len;
    private _rsi;
    private _prevAvgUp;
    private _prevAvgDown;
    private _numbers;

    update(number: number): number;
    getRsi(): number;

    private _setRsi;
  }

  export namespace StochRSI {
    export interface Options {
      numbers: number[];
      kLen: number;
      dLen: number;
    }

    export type StochRSIAverages = [number | null, number | null];
  }

  export class StochRSI {
    constructor({ numbers, kLen, dLen }: StochRSI.Options);

    private _len;
    private _kLen;
    private _dLen;
    private _ks;
    private _d;
    private _stochRsis;
    private _rsi;
    private _rsis;
    private _numbers

    update(number: number): StochRSI.StochRSIAverages;
    getStochRsi(): StochRSI.StochRSIAverages;

    private _setRsi
    private _setStochRsi
    private _setStochMas;
  }
}
