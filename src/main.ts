import { Scene } from "./scene";
//import Render from "./render/index";
type measurements = { LOA: number; beam: number; draft: number };
type coefficients = { CB: number; CP: number };
interface IBoat {
  set LOA(num: number);
  set CB_ratio(ratio: number);
  set BD_ratio(ratio: number);

  measure(): measurements;
  calculate(): coefficients;
}
export class Boat implements IBoat {
  get LOA(): number {
    return this._LOA;
  }
  set LOA(num: number) {
    this._LOA = num;
  }

  get CB_ratio(): number {
    return this._CB_ratio;
  }
  set CB_ratio(ratio: number) {
    this._CB_ratio = ratio;
  }

  get BD_ratio(): number {
    return this._BD_ratio;
  }
  set BD_ratio(ratio: number) {
    this._BD_ratio = ratio;
  }

  constructor(
    private _LOA: number,
    private _CB_ratio: number = 0.1,
    private _BD_ratio: number = 0.2
  ) {
    new Scene();
  }

  measure(): measurements {
    return {
      LOA: this.LOA,
      beam: this.LOA * this.CB_ratio,
      draft: this.LOA * this.BD_ratio,
    };
  }
  calculate(): coefficients {
    return { CB: this.LOA * 5, CP: this.measure().beam * 2 };
  }
}

const boat = new Boat(1);

console.log(boat);
console.log(boat.calculate());
boat.LOA = 2;
console.log(boat);
console.log(boat.calculate());

//console.log(boat.BD_ratio);
