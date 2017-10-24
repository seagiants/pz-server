import random from "lodash.random";
import zip from "lodash.zip";
import max from "lodash.max";
import values from "lodash.values";
import keys from "lodash.keys";

const colors = {
  sea: "royalblue",
  land: "yellowgreen",
  mountain: "grey",
  cristal: "gold",
  landingPoint: "crimson"
};

const weightsFromType = type => {
  // dispatch 10
  switch (type) {
    case "sea":
      return { sea: 2, land: 7, mountain: 1 };
    case "land":
      return { sea: 2, land: 5, mountain: 4 };
    case "mountain":
      return { sea: 1, land: 3, mountain: 6 };
  }
};

const randomTypeFromWeights = weights => {
  // multiply random values with weights, get the index of the max
  // use that index to get the corresponding types in the weights object
  const rands = [random(0, 10), random(0, 10), random(0, 10)];
  const w = values(weights);
  const scores = zip(rands, w).map(pair => pair.reduce((x, y) => x * y));
  const best = max(scores);
  const index = scores.indexOf(best);
  return keys(weights)[index];
};

const onBorder = (cell, mapWidth, mapHeight) => {
  if (
    cell.x === 0 ||
    cell.x === mapWidth - 1 ||
    cell.y === 0 ||
    cell.y === mapHeight - 1
  ) {
    return true;
  } else {
    return false;
  }
};

class Map {
  // FIXME isolate that in the engine package
  static generate(x, y, baseType) {
    // init
    let map = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        map.push({
          x: i,
          y: j,
          cellType: baseType,
          hidden: false,
          color: colors[baseType]
        });
      }
    }
    // generate base cell
    const mapWithCells = map.map(currentCell => {
      if (onBorder(currentCell, x, y)) {
        return { ...currentCell, cellType: baseType };
      } else {
        // get previous cell in the row
        const previousCell = map
          .filter(c => c.x === currentCell.x - 1 && c.y === currentCell.y)
          .pop();
        const weights = weightsFromType(previousCell.cellType);
        const computedType = randomTypeFromWeights(weights);
        return {
          ...currentCell,
          cellType: computedType,
          hidden: false, // TODO true is non debug mode
          color: colors[computedType]
        };
      }
    });

    const cristalsNumber = 4;
    let cristalsOnMap = 0;
    let mapWithCristals = [];
    while (cristalsOnMap < cristalsNumber) {
      console.log("cristals generation");
      // get random cell
      const randX = random(0, x - 1);
      const randY = random(0, y - 1);
      console.log(`at ${randX} - ${randY}`)
      // FIXME check if the cell is not already a cristal
      mapWithCristals = mapWithCells.map(cell => {
        if(cell.x === randX && cell.y === randY) {
          cell.cellType = "cristal";
          cell.color = "gold";
          cristalsOnMap++;
          return cell;
        } else {
          return cell;
        }
      });
    }

    const finalMap = mapWithCristals;

    return finalMap;
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
