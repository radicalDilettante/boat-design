import Boat from "./boat/boat";
import * as Deck from "./boat/hull";

interface ChildBoat {
  addHull(material: string): void;
  removeHull(): void;
}

export class TrailerBoat extends Boat implements ChildBoat {
  private currentHull = false;
  addHull(material: "frp" | "timber"): void {
    if (this.currentHull) {
      console.log("already hull");
      this.removeHull();
    }
    new Deck.Trailer(material);
    this.currentHull = true;
  }
  removeHull(): void {
    this.currentHull = false;
    console.log("remove hull");
  }
}
