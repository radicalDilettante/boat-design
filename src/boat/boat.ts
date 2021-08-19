import { Scene } from "../render/scene.js";
//import Render from "./render/index";
type measurements = {
  length: number;
  beam: number;
  draught: number;
  displacement: number;
};
type coefficients = { Cb: number; Cp: number; Cm: number; Cw: number };
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
  private volume = this._length * this.Cv; // Displacement Area
  private displacement = this.volume * 9.8 * 1.025;
  private Am = this._length * this.CAm; // Midship Area
  private Aw = this._length * this.CAw; // Water Plane Area

  constructor(
    private length: number,
    private LB_ratio: number,
    private BD_ratio: number,
    private Cv: number,
    private CAm: number,
    private CAw: number
  ) {
    new Scene();
  }

  measure(): measurements {
    return {
      length: this._length,
      beam: this.beam,
      draught: this.draught,
      displacement: this.displacement,
    };
  }
  calculate(): coefficients {
    return {
      Cb: this.volume / (this._length * this.beam * this.draught), // Block Coefficient
      Cp: this.volume / (this.Am * this._length), // Prismatic Coefficient
      Cm: this.Am / (this.beam * this.draught), // Midship Section Coefficient
      Cw: this.Aw / (this.beam * this._length), // Water Plane Area Coefficient
    };
  }
}
