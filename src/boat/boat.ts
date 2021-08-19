import { Scene } from "../render/scene.js";
import * as HULL from "../boat/hull.js";

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
  measure(): measurements;
  calculate(): coefficients;
  addHull(material: string): void;
  addDeck(type: string): void;
  removeDeck(): void;
}

export default class Boat implements IBoat {
  protected currentDeck = false;

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
    private hull: HullClass,
    private length: number, // LOA: Length of Overall
    private LB_ratio: number, // LB_ratio: Length / Beam ratio
    private BD_ratio: number, // BD_ratio: Beam / Draught ratio
    private Cv: number, // Cv : Volume Coefficient (Volume = length * Cv)
    private CAm: number, // CAm : Midship Area Coefficient (Midship Area = length * CAm)
    private CAw: number // CAw: Water Plane Area Coefficient (Water Plane Area = length * CAw)
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
