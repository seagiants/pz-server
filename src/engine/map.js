import random from "lodash.random";

const baseTypes = [
  { name: "river", color: "blue" },
  { name: "mountain", color: "grey" },
  { name: "grass", color: "green" }
];

export function generateType(baseType, x, y) {
  return { ...baseType, x: x, y: y, hidden: false, content: null };
}

export function randType(i, j) {
  let base = baseTypes[random(baseTypes.length - 1)];
  let gen = generateType(base, i, j);
  return gen;
}

/* Generate an x by y matrix, each cell being of a particular type */
export const generateMap = (x, y) => {
  let map = [];
  for (let i = 0; i < x; i++) {
    map.push([]);
    for (let j = 0; j < y; j++) {
      map[i].push(randType(i, j));
    }
  }
  return map;
};
