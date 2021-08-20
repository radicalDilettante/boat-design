import Boat from "./boat/boat.js";
import * as HULL from "./boat/hull.js";
//import * as DECK from "./boat/deck.js";

export class VShaped extends Boat {
  constructor(length: number) {
    super(
      new HULL.VShaped(), // hull type
      length, // LOA
      10 / 3.5, // LB_ratio
      3.5 / 0.8, // BD_ratio
      6.5, // StdDisplacementVolume
      4.5, // StdMidshipArea
      5.2 // StdWaterPlaneArea
    );
  }
}

export class RoundBottom extends Boat {
  constructor(length: number) {
    super(
      new HULL.RoundBottom(), // hull type
      length, // LOA
      1, // LB_ratio
      1, // BD_ratio
      1, // Cv
      1, // CAm
      1 // CAw
    );
  }
}

export class FlatBottom extends Boat {
  constructor(length: number) {
    super(
      new HULL.FlatBottom(), // hull type
      length, // LOA
      1, // LB_ratio
      1, // BD_ratio
      1, // Cv
      1, // CAm
      1 // CAw
    );
  }
}

const boat = new VShaped(9000);
console.log(boat.measure());
console.log(boat.calculate());
console.log("---------------------");
console.log(boat.changeLength(5000));

console.log(boat.measure());
console.log(boat.calculate());
