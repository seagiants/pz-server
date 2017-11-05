import uuidV4 from "uuid/v4";
import CircularJSON from "circular-json";

/* Game statuses */
export const statuses = {
  WAITING_FOR_SECOND_PLAYER : "WAITING_FOR_SECOND_PLAYER",
  STARTED : "STARTED",
  FINISHED : "FINISHED"
};

class Game {
  constructor() {
    this.id = uuidV4();
    this.gameMap = null;
    this.players = {
      playerOne: null,
      playerTwo: null
    };
    this.sockets = {
      playerOneSocket: null,
      playerTwoSocket: null
    }
    this.status = statuses.WAITING_FOR_SECOND_PLAYER;
    this.turn = "playerOne";
  }

  getId() {
    return this.id;
  }

  setGameMap(gameMap) {
    this.gameMap = gameMap;
  }

  getGameMap() {
    return this.gameMap;
  }

  setPlayerOne(p1) {
    this.players.playerOne = p1;
  }

  setPlayerTwo(p2) {
    this.players.playerTwo = p2;
  }

  setPlayerOneSocket(so) {
    this.sockets.playerOneSocket = so;
  }

  setPlayerTwoSocket(so) {
    this.sockets.playerTwoSocket = so;
  }

  getPlayerOneSocket() {
    return this.sockets.playerOneSocket;
  }

  getPlayerTwoSocket() {
    return this.sockets.playerTwoSocket;
  }

  getStatus() {
    return this.status;
  }

  getTurn() {
    return this.turn;
  }
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
