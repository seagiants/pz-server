class Game {
  constructor(id) {
    this.id = id;
  }

  static withId(id) {
    return new Game(id)
  }
}

export default Game;
