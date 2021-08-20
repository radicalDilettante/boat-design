import { Scene } from "../render/scene.js";
import * as HULL from "./hull.js";

//import Render from "./render/index";
type measurements = {
  length: number;
  beam: number;
  draught: number;
  displacement: number;
};
type coefficients = { Cb: number; Cp: number; Cm: number; Cw: number };
type HullMaterial = "frp" | "timber";
type DeckType = "cabin" | "centerConsole";
type HullClass = HULL.VShaped | HULL.RoundBottom | HULL.FlatBottom;

interface IBoat {
  changeLength(length: number): void;
  measure(): measurements;
  calculate(): coefficients;
  addHull(material: string): void;
  addDeck(type: string): void;
  removeDeck(): void;
}

export default class Boat implements IBoat {
  private currentDeck = false;

  private get _length(): number {
    return this.length;
  } // _length: internal value of LOA to calculate other values
  private get beam(): number {
    return this._length / this.LB_ratio;
  }
  private get draught(): number {
    return this.beam / this.BD_ratio;
  }
  private get volume(): number {
    return ((this._length / 10) ^ 3) * this.StdDisplacementVolume;
  } // Displacement Area
  private get displacement(): number {
    return this.volume * 9.8 * 1.025;
  }
  private get Am(): number {
    return ((this._length / 10) ^ 2) * this.StdMidshipArea;
  } // Midship Area
  private get Aw(): number {
    return ((this._length / 10) ^ 2) * this.StdWaterPlaneArea;
  } // Water Plane Area

  constructor(
    private hull: HullClass,
    private length: number, // LOA: Length of Overall m
    private LB_ratio: number, // LB_ratio: Length / Beam ratio
    private BD_ratio: number, // BD_ratio: Beam / Draught ratio
    private StdDisplacementVolume: number, // StdDisplacementVolume: 10m hull displacement volume m^3
    private StdMidshipArea: number, // StdMidshipArea : 10m hull Midship Area m^2
    private StdWaterPlaneArea: number // StdWaterPlaneArea: Water Plane Area Coefficient (Water Plane Area = length * StdWaterPlaneArea) m^3
  ) {
    new Scene();
  }

  changeLength(length: number): void {
    this.length = length;
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

  addHull(material: HullMaterial): void {
    this.hull = new HULL.VShaped();
    this.hull.add(material);
  }

  addDeck(type: DeckType): void {
    this.removeDeck;
    switch (type) {
      case "cabin":
        console.log("cabin");
        break;
    }
    this.currentDeck = true;
  }

  removeDeck(): void {
    if (this.currentDeck) {
      this.removeDeck();
    }
  }
}
