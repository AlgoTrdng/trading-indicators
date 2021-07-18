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
    };

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

  export namespace TR {
    export type Candlestick = {
      o?: number;
      h: number;
      l: number;
      c: number;
    };
  }

  export class TR {
    constructor(candlesticks: TR.Candlestick[]);

    private _candlesticks;
    private _changes;
    private _initChanges;

    update(candlestick: TR.Candlestick): number;
    getLast(): number
    getAllChanges(): number[]
  
    static getChanges(candlesticks: TR.Candlestick[]): number[];
    static getChange(candlesticks: TR.Candlestick[]): number[];
  }

  export namespace ATR {
    export type Options = {
      candlesticks: TR.Candlestick[];
      len: number;
    };
  }

  export class ATR {
    constructor({ candlesticks, len }: ATR.Options);
  
    private _len;
    private _atr;
    private _changes;
    private _prevCandlestick;

    private _setAtr;
  
    update(candlestick: TR.Candlestick): number;
    getAtr(): number;
  }

  export namespace IchimokuCloud {
    export type Candlestick = {
      h: number;
      l: number;
    };

    export type Options = {
      candlesticks: Candlestick[];
      conversionLineLen?: number;
      baseLineLen?: number;
      leadingSpanBLen?: number;
      displacement?: number;
      doubleInputs?: boolean;
    };

    export type Spans = {
      conversionLine: number;
      baseLine: number;
      leadingSpanA: number;
      leadingSpanB: number;
    };
  }

  export class IchimokuCloud {
    constructor({ candlesticks, conversionLineLen, baseLineLen, leadingSpanBLen, displacement, doubleInputs }: IchimokuCloud.Options);

    conversionLineLen: number;
    baseLineLen: number;
    leadingSpanBLen: number;
    displacement: number;

    conversionLine: number;
    baseLine: number;
    leadingSpanA: number;
    leadingSpanB: number;

    update(candlestick: IchimokuCloud.Candlestick): IchimokuCloud.Spans;
    getSpans(): IchimokuCloud.Spans;
  }
}
