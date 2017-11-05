/* Holds the logic of a map generation */
import random from "lodash.random";
import zip from "lodash.zip";
import max from "lodash.max";
import values from "lodash.values";
import keys from "lodash.keys";

// Type colors
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

export const generateInitialMap = (x, y, baseType) => {
  let initMap = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      initMap.push({
        x: i,
        y: j,
        cellType: baseType,
        hidden: true, // change to false to debug
        color: colors[baseType]
      });
    }
  }
  return initMap;
};

export const generateMapWithBaseCell = (initMap, x, y, baseType) => {
  const mapWithBaseCells = initMap.map(currentCell => {
    if (onBorder(currentCell, x, y)) {
      return { ...currentCell, cellType: baseType };
    } else {
      // get previous cell in the row
      const previousCell = initMap
        .filter(c => c.x === currentCell.x - 1 && c.y === currentCell.y)
        .pop();
      const weights = weightsFromType(previousCell.cellType);
      const computedType = randomTypeFromWeights(weights);
      return {
        ...currentCell,
        cellType: computedType,
        color: colors[computedType]
      };
    }
  });
  return mapWithBaseCells;
};

export const generateMapWithCristals = (mapWithBaseCells, x, y) => {
  const cristalsNumber = 4;
  let cristalsOnMap = 0;
  //Initialization on mapWithCells to support 0 crystalMap at start
  let mapWithCristals = mapWithBaseCells;
  while (cristalsOnMap < cristalsNumber) {
    // get random cell
    const randX = random(0, x - 1);
    const randY = random(0, y - 1);
    mapWithCristals = mapWithBaseCells.map(cell => {
      if (cell.x === randX && cell.y === randY && cell.cellType !== "cristal") {
        cell.cellType = "cristal";
        cell.color = "gold";
        cristalsOnMap++;
        return cell;
      } else {
        return cell;
      }
    });
  }
  return mapWithCristals;
};

export const generateMapWithLandingPoints = (mapWithCristals, x, y) => {
  let mapWithLandingPoints = [];
  let isLP1Created = false;
  let isLP2Created = false;
  while (!isLP1Created || !isLP2Created) {
    const randX = random(0, x - 1);
    const randY = random(0, y - 1);
    if (!isLP1Created) {
      mapWithLandingPoints = mapWithCristals.map(cell => {
        if (cell.x === randX && cell.y === randY) {
          cell.cellType = "landingPoint1";
          cell.color = "crimson";
          cell.hidden = false;
          isLP1Created = true;
          return cell;
        } else {
          return cell;
        }
      });
    } else {
      mapWithLandingPoints = mapWithCristals.map(cell => {
        if (cell.x === randX && cell.y === randY) {
          cell.cellType = "landingPoint2";
          cell.color = "crimson";
          cell.hidden = false;
          isLP2Created = true;
          return cell;
        } else {
          return cell;
        }
      });
    }
  }
  return mapWithLandingPoints;
};
