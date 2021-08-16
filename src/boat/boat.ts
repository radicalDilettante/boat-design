import { Scene } from "../render/scene";
//import Render from "./render/index";
type measurements = {
  LOA: number;
  beam: number;
  draught: number;
  LB_ratio: number;
  BD_ratio: number;
};
type coefficients = { CB: number; CP: number };
interface ParentBoat {
  //set LOA(num: number);
  //set LB_ratio(ratio: number);
  //set BD_ratio(ratio: number);

  measure(): measurements;
  calculate(): coefficients;
}
export default class Boat implements ParentBoat {
  private get _LOA(): number {
    return this.LOA;
  }
  private get _LB_ratio(): number {
    return this.LB_ratio;
  }
  private get _BD_ratio(): number {
    return this.BD_ratio;
  }

  private beam = this._LOA / this._LB_ratio;
  private draught = this.beam / this._BD_ratio;
  //private volume = this._LOA * 123;
  constructor(
    private LOA: number,
    private LB_ratio: number,
    private BD_ratio: number
  ) {
    if (this.LB_ratio < 2 || this.LB_ratio > 6) {
      throw new Error("LB_ratio range is from 2 to 6");
    }
    if (this.BD_ratio < 1 || this.BD_ratio > 2) {
      throw new Error("BD_ratio range is from 1 to 2");
    }
    new Scene();
  }

  measure(): measurements {
    return {
      LOA: this.LOA,
      beam: this.beam,
      draught: this.draught,
      LB_ratio: this._LB_ratio,
      BD_ratio: this._BD_ratio,
    };
  }
  calculate(): coefficients {
    return { CB: this.LOA * 5, CP: this.measure().beam * 2 };
  }
}
