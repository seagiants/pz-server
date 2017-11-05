import {
  generateInitialMap,
  generateMapWithBaseCell,
  generateMapWithCristals,
  generateMapWithLandingPoints
} from "../engine/map-generation";

class Map {
  // FIXME isolate that in the engine package
  static generate(x, y, baseType) {
    const initialMap = generateInitialMap(x, y, baseType);
    const mapWithBaseCells = generateMapWithBaseCell(initialMap, x, y, baseType);
    const mapWithCristals = generateMapWithCristals(mapWithBaseCells, x, y);
    const mapWithLandingPoints = generateMapWithLandingPoints(mapWithCristals, x, y);
    return mapWithLandingPoints;
  }

  constructor(x, y, baseType = "sea") {
    this._mapWidth = x;
    this._mapHeight = y;
    this._map = Map.generate(x, y, (baseType = baseType));
  }

  getRawMap() {
    return this._map;
  }
}

export default Map;
