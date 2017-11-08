import express from "express";
import expressWS from "express-ws";
import cors from "cors";
import { GameBuilder } from "./models/Game";
import GameStore from "./models/GameStore";
import Map from "./models/Map";
import util from "util";
import EventManager from "./events/EventManager";

/* ---------- CONSTANTS */
const port = 9000;

/* ---------- CONFIG */
const app = express();
app.use(cors()); // by default allowing everything =)
expressWS(app);

/* ---------- DATA */
const gameStore = new GameStore();

/* ---------- ROUTES */
// Home
app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

// ----- Game creation endpoint
app.get("/newgame", (req, res) => {
  let playerName = req.query.playerName;
  console.log(`[GET] Game creation request by ${playerName}`);
  let builder = new GameBuilder();
  let newGame = builder
    .withPlayerOne(playerName)
    .withGameMap(new Map(20, 20))
    .build();
  gameStore.push(newGame);
  res.json(newGame);
});

// ----- List of created games
app.get("/games-list", (req, res) => {
  let gamesId = gameStore.getStore().map(game => ({
    id: game.id,
    url: `http://localhost:${port}/game/${game.id}`,
    join: `http://localhost:${port}/join/${game.id}`,
    wstest: `http://localhost:${port}/sendws/${game.id}`
  }));
  res.json(gamesId);
});

// ----- Game info
app.get("/game/:id", (req, res) => {
  console.log("[GET] Getting game by id");
  const requestedID = req.params.id;
  const requestedGame = gameStore.getGameById(requestedID);
  res.json(requestedGame);
});

// ----- Join an existing game
app.get("/join/:id", (req, res) => {
  const game = gameStore.getGameById(req.params.id);
  const action = { type: "SWITCH_TO_GAME_SCREEN" };
  game.getPlayerOneSocket().send(JSON.stringify(action));
  game.setPlayerTwo("PLAYER TWO"); // FIXME get it from a query param
  res.json({
    id: game.getId(),
    gameMap: game.getGameMap(),
    turn: game.getTurn()
  });
});

// ----- WebSocket endpoint
app.ws("/channel/:id/:playerNum", (ws, req) => {
  const id = req.params.id;
  const playerNum = req.params.playerNum;
  const game = gameStore.getGameById(id);

  if (playerNum === "one") {
    game.setPlayerOneSocket(ws);
  }

  if (playerNum === "two") {
    game.setPlayerTwoSocket(ws);
  }

  ws.on("message", message => {
    console.log("[WS] Incoming message ", message);
    console.log("[WS] Game is ", game.getId());
    console.log("[WS] Sending player is ", playerNum);
    const event = JSON.parse(message);
    // FIXME where to instatiate the event manager ?
    const eventManager = new EventManager(game);
    const returnedEvent = eventManager.handleEvent(event);
    if (playerNum === "two") {
      game.getPlayerOneSocket().send(JSON.stringify(returnedEvent));
    }
    if (playerNum === "one") {
      game.getPlayerTwoSocket().send(JSON.stringify(returnedEvent));
    }
  });
});

// ----- SPECIALS
// List games in store, for debug only
app.get("/map-generation", (req, res) => {
  const genMap = new Map(10, 10);
  res.json(genMap);
});

app.get("/sendws/:id", (req, res) => {
  const requestedID = req.params.id;
  const requestedGame = gameStore.getGameById(requestedID);
  const socket = requestedGame.getPlayerOneSocket();
  socket.send(JSON.stringify({ type: "TEST_WS_SEND" }));
  const socket2 = requestedGame.getPlayerTwoSocket();
  socket2.send(JSON.stringify({ type: "TEST_WS_SEND" }));
  res.json({ msg: "Test messages sent" });
});

app.listen(port, () => {
  console.log(`PZ server started on http://localhost:${port}`);
});
