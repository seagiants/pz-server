import express from "express";
import expressWS from "express-ws";
import { GameBuilder } from "./models/Game";

/* CONSTANTS */
const port = 9000;

const app = express();
// WebSocket capability
expressWS(app);

/* DATA */
const gameStore = [];

/* ROUTES */

// Home
app.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

// Game creation endpoint
app.get("/newgame", (req, res) => {
  let builder = new GameBuilder();
  let newGame = builder.build();
  gameStore.push({ [newGame.id]: newGame });
  res.json(newGame);
});

// List games in store, for debug only
app.get("/store", (req, res) => {
  res.json(gameStore);
});

// WebSocket endpoint
app.ws("/ws-test/:id", (ws, req) => {
  let id = req.params.id;
  // FIXME identify one connection, not a user
  let clientId = ws.upgradeReq.headers['sec-websocket-key'];
  console.log(`In ws channel with id ${id}`, `connected user id is ${clientId}`);
  ws.on("message", msg => {
    console.log(`[${Date.now()}] Message received: ${msg}`);
    ws.send("server received message: " + msg);
  });
});

app.listen(port, () => {
  console.log(`PZ server started on http://localhost:${port}`);
});
