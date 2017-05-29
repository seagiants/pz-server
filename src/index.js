import express from "express";
import expressWS from "express-ws";
import Game from "./Game";

/* CONSTANTS */
const port = 9000;

const app = express();
// WebSocket capability
expressWS(app);

/* DATA */


/* ROUTES */
app.get("/", (req, res) => {
  res.json({msg:"hello"});
});

app.get("/newgame", (req, res) => {
  let newGame = Game.withId(123456);
  res.json(JSON.stringify(newGame));
});

app.ws("/ws-test/:id", (ws, req) => {
  let id = req.params.id;
  console.log(`In ws channel with id ${id}`)
  ws.on("message", (msg) => {
    console.log(`[${Date.now()}] Message received: ${msg}`);
    ws.send("server received message: " + msg);
  });
});

app.listen(port, () => {
  console.log(`PZ server started on http://localhost:${port}`);
});
