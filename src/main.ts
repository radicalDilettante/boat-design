import Boat from "./boat/boat.js";
import * as HULL from "./boat/hull.js";

/*interface ChildBoat {
  addHull(material: string): void;
  removeHull(): void;
}*/

class MonoHull extends Boat {
  protected currentHull = false;

  removeHull(): void {
    if (this.currentHull) {
      this.removeHull();
    }
  }
}

export class VShaped extends MonoHull /*implements ChildBoat*/ {
  private hull;

  constructor(length: number) {
    super(
      length,
      1, // LB_ratio: Length / Beam ratio
      1, // BD_ratio: Beam / Draught ratio
      1, // Cv : Volume Coefficient (Volume = length * Cv)
      1, // CAm : Midship Area Coefficient (Midship Area = length * CAm)
      1 // CAw: Water Plane Area Coefficient (Water Plane Area = length * CAw)
    );
    this.hull = new HULL.VShaped();
  }

  addHull(material: "frp" | "timber"): void {
    this.removeHull;
    this.hull.add(material);
    super.currentHull = true;
  }
}

export class RoundBottom extends MonoHull /*implements ChildBoat*/ {
  private hull;

  constructor(length: number) {
    super(
      length,
      1, // LB_ratio: Length / Beam ratio
      1, // BD_ratio: Beam / Draught ratio
      1, // Cv : Volume Coefficient (Volume = length * Cv)
      1, // CAm : Midship Area Coefficient (Midship Area = length * CAm)
      1 // CAw: Water Plane Area Coefficient (Water Plane Area = length * CAw)
    );
    this.hull = new HULL.VShaped();
  }

  addHull(material: "frp" | "timber"): void {
    this.removeHull;
    this.hull.add(material);
    super.currentHull = true;
  }
}

export class FlatBottom extends MonoHull /*implements ChildBoat*/ {
  private hull;

  constructor(length: number) {
    super(
      length,
      1, // LB_ratio: Length / Beam ratio
      1, // BD_ratio: Beam / Draught ratio
      1, // Cv : Volume Coefficient (Volume = length * Cv)
      1, // CAm : Midship Area Coefficient (Midship Area = length * CAm)
      1 // CAw: Water Plane Area Coefficient (Water Plane Area = length * CAw)
    );
    this.hull = new HULL.VShaped();
  }

  addHull(material: "frp" | "timber"): void {
    this.removeHull;
    this.hull.add(material);
    super.currentHull = true;
  }
}

export class RIB extends Boat {}

const boat = new VShaped(9000);
console.log(boat.measure());
