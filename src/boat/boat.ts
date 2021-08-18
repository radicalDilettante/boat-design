import { Scene } from "../render/scene";
//import Render from "./render/index";
type measurements = {
  length: number;
  beam: number;
  draught: number;
};
type coefficients = { CB: number; CP: number };
interface ParentBoat {
  measure(): measurements;
  calculate(): coefficients;
}
export default class Boat implements ParentBoat {
  private get _length(): number {
    return this.length;
  }

  private beam = this._length / this.LB_ratio;
  private draught = this.beam / this.BD_ratio;
  //private volume = this._length * 123;
  constructor(
    private length: number,
    private LB_ratio: number,
    private BD_ratio: number
  ) {
    new Scene();
  }

  measure(): measurements {
    return {
      length: this.length,
      beam: this.beam,
      draught: this.draught,
    };
  }
  calculate(): coefficients {
    return { CB: this.length * 5, CP: this.measure().beam * 2 };
  }
}
