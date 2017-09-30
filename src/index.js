import express from "express";
import expressWS from "express-ws";
import cors from "cors";
import { GameBuilder } from "./models/Game";

/* ---------- CONSTANTS */
const port = 9000;

/* ---------- CONFIG */
const app = express();
app.use(cors()); // by default allowing everything =)
expressWS(app);

/* ---------- DATA */
const gameStore = [];

/* ---------- ROUTES */
// Home
app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

// Game creation endpoint
app.get("/newgame", (req, res) => {
  console.log("[GET] Game creation request");
  let builder = new GameBuilder();
  let newGame = builder.build();
  gameStore.push(newGame);
  res.json(newGame);
});

// List games in store, for debug only
app.get("/store", (req, res) => {
  res.json(gameStore);
});

app.get("/games-list", (req, res) => {
  let gamesId = gameStore.map(game => ({ id: game.id }));
  res.json(gamesId);
});

app.get("/game/:id", (req, res) => {
  console.log("[GET] Getting game by id");
  let requestedID = req.params.id;
  let requestedGame = gameStore.filter(game => game.id === requestedID).pop();
  res.json(requestedGame);
});

// WebSocket endpoint
app.ws("/ws-test/:id", (ws, req) => {
  let id = req.params.id;
  // FIXME identify one connection, not a user
  let clientId = ws.upgradeReq.headers["sec-websocket-key"];
  console.log(
    `In ws channel with id ${id}`,
    `connected user id is ${clientId}`
  );
  ws.on("message", msg => {
    console.log(`[${Date.now()}] Message received: ${msg}`);
    ws.send("server received message: " + msg);
  });
});

app.listen(port, () => {
  console.log(`PZ server started on http://localhost:${port}`);
});
