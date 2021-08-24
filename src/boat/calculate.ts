const decimal = (num: number) => {
  return Math.round(num * 100) / 100;
};

export type Measure = {
  length: number; // m
  beam: number; // m
  draught: number; // m
};
export type VolumeProperties = {
  displacedVolume: number; // m^3
  displacement: number; // t
  blockCoefficient: number;
  prismaticCoefficient: number;
  wettedSurfaceArea: number; // m^2
};
export type WaterPlaneProperties = {
  lengthOfWaterline: number; // m
  waterPlaneArea: number; // m^2
  waterPlaneCoefficient: number;
};
export type MidshipProperties = {
  midshipSectionArea: number; // m^2
  midshipCoefficient: number;
};

export class Calculate {
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
    private length: number, // Length of Overall (m)
    private lengthBeamRatio: number, // Length / Beam ratio
    private beamDraughtRatio: number, // Beam / Draught ratio
    private waterLineRatio: number, // Water Line Ratio
    private stdDisplacementVolume: number, // Displacement Volume for 10m hull (m^3)
    private stdMidshipSectionArea: number, // Midship Area for 10m hull (m^2)
    private stdWaterPlaneArea: number, // Water Plane Area for 10m (m^2)
    private stdWettedSurfaceArea: number // Wetted Surface Area for 10m hull (m^2)
  ) {}

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
}
