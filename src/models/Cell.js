/* Represents a atomic part of a map */

class Cell {
  constructor(x, y, type) {
    this._x = x;
    this._y = y;
    this._type = type;
    this._hidden = true;
    this._building = null;
  }
}
