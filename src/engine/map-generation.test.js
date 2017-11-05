import {
  generateInitialMap,
  generateMapWithBaseCell,
  generateMapWithCristals,
  generateMapWithLandingPoints
} from "./map-generation";

// TODO
describe("Map generation", () => {
  it("should generate an initial map", () => {
    const initMap = generateInitialMap(1,1, "sea");
    expect(initMap).not.toBeNull();
    expect(initMap).toHaveLength(1);
  });
});
