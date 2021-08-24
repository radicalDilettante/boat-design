import Boat from "./boat/boat";
import * as HULL from "./boat/hull";
//import * as DECK from "./boat/deck";

export class VShaped extends Boat {
  constructor(length: number) {
    super(
      new HULL.VShaped(), // hull type
      length, // LOA
      10 / 3.5, // Length / Beam ratio
      3.5 / 0.5, // Beam / Draught ratio
      0.9, // Water Line Ratio
      4.4, // Displacement Volume for 10m hull
      0.7, // Midship Area for 10m hull
      20.2, // Water Plane Area for 10m hull
      22.4 // Wetted Surface Area for 10m hull
    );
  }
}

/*export class RoundBottom extends Boat {
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
*/
