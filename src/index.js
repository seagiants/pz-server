import express from "express";
import expressWS from "express-ws";
import cors from "cors";
import { GameBuilder } from "./models/Game";
import util from "util";

/* ---------- CONSTANTS */
const port = 9000;

/* ---------- CONFIG */
const app = express();
app.use(cors()); // by default allowing everything =)
expressWS(app);

/* ---------- DATA */
const gameStore = []; // TODO extract to a proper class / module
const getGameById = id => gameStore.filter(game => game.id === id).pop();

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
  let newGame = builder.withPlayerOne(playerName).build();
  gameStore.push(newGame);
  res.json(newGame);
});

// ----- List of created games
app.get("/games-list", (req, res) => {
  let gamesId = gameStore.map(game => ({
    id: game.id,
    url: `http://localhost:${port}/game/${game.id}`,
    join: `http://localhost:${port}/join/${game.id}`
  }));
  res.json(gamesId);
});

// ----- Game info
app.get("/game/:id", (req, res) => {
  console.log("[GET] Getting game by id");
  const requestedID = req.params.id;
  const requestedGame = getGameById(requestedID);
  res.json(requestedGame);
});

// ----- Join an existing game
app.get("/join/:id", (req, res) => {
  const game = getGameById(req.params.id);
  const action = { type: "SWITCH_TO_GAME_SCREEN" };
  game.getPlayerOneSocket().send(JSON.stringify(action));
  // TODO set player two id and create a web socket
  res.json({ msg: "to be implemented" });
});

// ----- WebSocket endpoint
app.ws("/ws-test/:id", (ws, req) => {
  let id = req.params.id;
  console.log(`In ws channel with id ${id}`);
  // Storing the ws in the corresponding game
  const game = gameStore.filter(game => game.id === id).pop();
  game.setPlayerOneSocket(ws); // FIXME BECUZ
  ws.on("open", msg => {
    console.log(`[${Date.now()}] Message received: ${msg}`);
    ws.send("ACK from server");
  });
  ws.on("message", message => {
    console.log("[WS] Incoming message", message);
  });
});

// ----- SPECIALS
// List games in store, for debug only
app.get("/store", (req, res) => {
  // FIXME we do that becuz of Circular structure bug
  const sanitized = util.inspect(gameStore);
  res.json(sanitized);
});

app.get("/sendws/:id", (req, res) => {
  let requestedID = req.params.id;
  let requestedGame = gameStore.filter(game => game.id === requestedID).pop();
  const socket = requestedGame.getPlayerOneSocket();
  socket.send("Message sent from the server to the first player!!!");
});

app.listen(port, () => {
  console.log(`PZ server started on http://localhost:${port}`);
});
