import Boat from "./boat/boat.js";
import * as HULL from "./boat/hull.js";

interface ChildBoat {
  addHull(material: string): void;
  removeHull(): void;
}

class MonoHull extends Boat implements ChildBoat {
  private currentHull = false;
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
    this.hull = new HULL.Trailer();
  }
  addHull(material: "frp" | "timber"): void {
    if (this.currentHull) {
      console.log("already hull");
      this.removeHull();
    }
    this.hull.add(material);
    this.currentHull = true;
  }
  removeHull(): void {
    this.currentHull = false;
    console.log("remove hull");
  }
}

const boat = new MonoHull(9000);
console.log(boat.measure());
