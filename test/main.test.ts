import { VShaped } from "../src/main";

describe("Launcher test suite", () => {
  const vShaped = new VShaped(10);
  test("measure test", () => {
    expect(vShaped.measure()).toEqual({
      length: 10,
      beam: 3.5,
      draught: 0.5,
    });
  });
  test("volume properties test", () => {
    expect(vShaped.volumeProperties()).toEqual({
      displacedVolume: 4.4,
      displacement: 4.51,
      blockCoefficient: 0.25,
      prismaticCoefficient: 0.63,
      wettedSurfaceArea: 22.4,
    });
  });
  test("water plane properties test", () => {
    expect(vShaped.waterPlaneProperties()).toEqual({
      lengthOfWaterline: 9,
      waterPlaneArea: 20.2,
      waterPlaneCoefficient: 0.58,
    });
  });
  test("midship properties test", () => {
    expect(vShaped.midshipProperties()).toEqual({
      midshipSectionArea: 0.7,
      midshipCoefficient: 0.4,
    });
  });
});
