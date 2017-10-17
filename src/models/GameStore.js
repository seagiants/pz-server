/*
 Where games are store
*/

class GameStore {
  constructor() {
    this._store = [];
  }

  push(game) {
    this._store.push(game);
  }

  getStore() {
    return this._store;
  }

  getGameById(id) {
    return this._store.filter(game => game.id === id).pop();
  }
}

export default GameStore;
