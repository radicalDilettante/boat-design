import * as Calculate from "./calculate";
import { Scene } from "../render/scene";
import * as HULL from "./hull";

//import Render from "./render/index";
type HullMaterial = "frp" | "timber";
type DeckType = "cabin" | "centerConsole";
type HullClass = HULL.VShaped | HULL.RoundBottom | HULL.FlatBottom;

interface IBoat {
  changeLength(length: number): void;
  measure(): Calculate.Measure;
  volumeProperties(): Calculate.VolumeProperties;
  waterPlaneProperties(): Calculate.WaterPlaneProperties;
  midshipProperties(): Calculate.MidshipProperties;

  addHull(material: string): void;
  addDeck(type: string): void;
  removeDeck(): void;
}

export default class Boat implements IBoat {
  private currentDeck = false;
  private calculate;

  constructor(
    private hull: HullClass, // hull type
    private length: number, // Length of Overall (m)
    private lengthBeamRatio: number, // Length / Beam ratio
    private beamDraughtRatio: number, // Beam / Draught ratio
    private waterLineRatio: number, // Water Line Ratio
    private stdDisplacementVolume: number, // Displacement Volume for 10m hull (m^3)
    private stdMidshipSectionArea: number, // Midship Area for 10m hull (m^2)
    private stdWaterPlaneArea: number, // Water Plane Area for 10m (m^2)
    private stdWettedSurfaceArea: number // Wetted Surface Area for 10m hull (m^2)
  ) {
    this.calculate = new Calculate.Calculate(
      this.length,
      this.lengthBeamRatio,
      this.beamDraughtRatio,
      this.waterLineRatio,
      this.stdDisplacementVolume,
      this.stdMidshipSectionArea,
      this.stdWaterPlaneArea,
      this.stdWettedSurfaceArea
    );
    new Scene();
  }

  // Calculate
  changeLength(length: number): void {
    this.calculate.changeLength(length);
  }
  measure(): Calculate.Measure {
    return this.calculate.measure();
  }
  volumeProperties(): Calculate.VolumeProperties {
    return this.calculate.volumeProperties();
  }
  waterPlaneProperties(): Calculate.WaterPlaneProperties {
    return this.calculate.waterPlaneProperties();
  }
  midshipProperties(): Calculate.MidshipProperties {
    return this.calculate.midshipProperties();
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
