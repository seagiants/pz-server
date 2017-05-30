import uuidV4 from "uuid/v4";

/* Game statuses */
const CREATED = "CREATED";
const WAITING_FOR_SECOND_PLAYER = "WAITING_FOR_SECOND_PLAYER";
const STARTED = "STARTED";
const FINISHED = "FINISHED";

class Game {
  constructor(id) {
    this.id = uuidV4();
    this.gameMap = [];
    this.players = {
      playerOne: null,
      playerTwo: null
    };
    this.status = CREATED;
  }

  setGameMap(gm) {
    this.gameMap = gm;
  }

  setPlayerOne(p1) {}

  setPlayerTwo(p2) {}
}

export const gameBuilder = () => new Game(123456789);

export default Game;
