import uuidV4 from "uuid/v4";
import CircularJSON from "circular-json";
import { generateMap } from "../engine/map";

/* Game statuses */
export const statuses = {
  WAITING_FOR_SECOND_PLAYER : "WAITING_FOR_SECOND_PLAYER",
  STARTED : "STARTED",
  FINISHED : "FINISHED"
};

class Game {
  constructor() {
    this.id = uuidV4();
    this.gameMap = generateMap(20, 20);
    this.players = {
      playerOne: null,
      playerTwo: null
    };
    this.sockets = {
      playerOneSocket: null,
      playerTwoSocket: null
    }
    this.status = statuses.WAITING_FOR_SECOND_PLAYER;
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
    //this.sockets.playerOneSocket = CircularJSON.stringify(so);
    this.sockets.playerOneSocket = so;
  }

  getPlayerOneSocket() {
    //return CircularJSON.parse(this.sockets.playerOneSocket);
    return this.sockets.playerOneSocket;
  }

  getStatus() {
    return this.status;
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
