import uuidV4 from "uuid/v4";
import { generateMap } from "../engine/map";

/* Game statuses */
const CREATED = "CREATED";
const WAITING_FOR_SECOND_PLAYER = "WAITING_FOR_SECOND_PLAYER";
const STARTED = "STARTED";
const FINISHED = "FINISHED";

class Game {
  constructor() {
    this.id = uuidV4();
    this.gameMap = generateMap(20, 20);
    this.players = {
      playerOne: null,
      playerTwo: null
    };
    this.status = CREATED;
  }

  setGameMap(gameMap) {
    this.gameMap = gameMap;
  }

  setPlayerOne(p1) {}

  setPlayerTwo(p2) {}
}

export class GameBuilder {
  constructor() {
    this.game = new Game();
  }

  withGameMap(gameMap) {
    this.game.setGameMap(gameMap);
    return this;
  }

  withPlayerOne(p1) {
    this.game.setPlayerOne(p1);
    return this;
  }

  build() {
    return this.game;
  }
}

export default Game;
