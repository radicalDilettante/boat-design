import { Scene } from "../render/scene";
import * as HULL from "./hull";

const decimal = (num: number) => {
  return Math.round(num * 100) / 100;
};

//import Render from "./render/index";
type HullMaterial = "frp" | "timber";
type DeckType = "cabin" | "centerConsole";
type HullClass = HULL.VShaped | HULL.RoundBottom | HULL.FlatBottom;

type Measure = {
  length: number; // m
  beam: number; // m
  draught: number; // m
};
type VolumeProperties = {
  displacedVolume: number; // m^3
  displacement: number; // t
  blockCoefficient: number;
  prismaticCoefficient: number;
  wettedSurfaceArea: number; // m^2
};
type WaterPlaneProperties = {
  lengthOfWaterline: number; // m
  waterPlaneArea: number; // m^2
  waterPlaneCoefficient: number;
};
type MidshipProperties = {
  midshipSectionArea: number; // m^2
  midshipCoefficient: number;
};

interface IBoat {
  changeLength(length: number): void;

  measure(): Measure;
  volumeProperties(): VolumeProperties;
  waterPlaneProperties(): WaterPlaneProperties;
  midshipProperties(): MidshipProperties;

  addHull(material: string): void;
  addDeck(type: string): void;
  removeDeck(): void;
}

export default class Boat implements IBoat {
  private currentDeck = false;

  //measure
  private get _length(): number {
    return this.length;
  } // _length: internal value of LOA to calculate other values
  private get beam(): number {
    return this._length / this.lengthBeamRatio;
  }
  private get draught(): number {
    return this.beam / this.beamDraughtRatio;
  }

  //volumeProperties
  private get displacedVolume(): number {
    return Math.pow(this._length / 10, 3) * this.stdDisplacementVolume;
  }
  private get displacement(): number {
    return this.displacedVolume * 1.025;
  }
  private get wettedSurfaceArea(): number {
    return Math.pow(this._length / 10, 2) * this.stdWettedSurfaceArea;
  }

  //waterPlaneProperties
  private get lengthOfWaterLine(): number {
    return this._length * this.waterLineRatio;
  }
  private get waterPlaneArea(): number {
    return Math.pow(this._length / 10, 2) * this.stdWaterPlaneArea;
  }

  //midshipProperties
  private get midshipSectionArea(): number {
    return Math.pow(this._length / 10, 2) * this.stdMidshipSectionArea;
  }

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
    new Scene();
  }

  changeLength(length: number): void {
    this.length = length;
  }

  measure(): Measure {
    return {
      length: decimal(this._length),
      beam: decimal(this.beam),
      draught: decimal(this.draught),
    };
  }

  volumeProperties(): VolumeProperties {
    return {
      displacedVolume: decimal(this.displacedVolume),
      displacement: decimal(this.displacement),
      blockCoefficient: decimal(
        this.displacedVolume / (this._length * this.beam * this.draught)
      ),
      prismaticCoefficient: decimal(
        this.displacedVolume / (this.midshipSectionArea * this._length)
      ),
      wettedSurfaceArea: decimal(this.wettedSurfaceArea),
    };
  }

  waterPlaneProperties(): WaterPlaneProperties {
    return {
      lengthOfWaterline: decimal(this.lengthOfWaterLine),
      waterPlaneArea: decimal(this.waterPlaneArea),
      waterPlaneCoefficient: decimal(
        this.waterPlaneArea / (this.beam * this._length)
      ),
    };
  }

  midshipProperties(): MidshipProperties {
    return {
      midshipSectionArea: decimal(this.midshipSectionArea),
      midshipCoefficient: decimal(
        this.midshipSectionArea / (this.beam * this.draught)
      ),
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
