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


  namespace EMA {
    export interface Options extends MA.Options {
      smoothing?: number;
    }
  }
  
  class EMA extends MA {
    constructor({ numbers, len, smoothing }: EMA.Options);
  
    private _alpha;
    private _setEmaValue;
  }


  class WMA extends MA {
    public static getWma(numbers: number[], len: number): number;
  
    private _norm;
    private _setNorm;
    private _setWmaValue;
  }

  class HMA extends MA {
    private _hmaLength;
    private _wmas;
    private _setWmas;
    private _setHmaValue;
  }
}
