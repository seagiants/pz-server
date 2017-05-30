import { generateMap, generateType, randType } from "./map";

describe("Map generator", () => {
  it("generates map with good dimensions", () => {
    let map = generateMap(2, 2);
    expect(map.length).toBe(2);
  });
});

describe("Cell generator", () => {
  it("generates a cell from a base type", () => {
    let baseType = { aKey: "foo", anotherKey: "bar" };
    expect(generateType(baseType, 3, 3)).toMatchObject({
      ...baseType,
      x: 3,
      y: 3
    });
  });
  it("generate a random cell with coordinates", () => {
    let randomType = randType(3, 3);
    expect(randomType).toHaveProperty("x", 3);
    expect(randomType).toHaveProperty("y", 3);
  });
});
