import Boat from "./boat/boat";
import * as HULL from "./boat/hull";

interface ChildBoat {
  addHull(material: string): void;
  removeHull(): void;
}

export class TrailerBoat extends Boat implements ChildBoat {
  private currentHull = false;
  private hull;
  constructor(LOA: number, LB_ratio = 4, BD_ratio = 1.5) {
    super(LOA, LB_ratio, BD_ratio);
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

const boat = new TrailerBoat(9000, 3);
console.log(boat.measure());
