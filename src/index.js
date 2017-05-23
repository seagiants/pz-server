import express from "express";
import expressWS from "express-ws";

const app = express();
// WebSocket capability
expressWS(app);

app.get("/", (req, res) => {
  res.json({msg:"hello"});
});

app.get("/newgame", (req, res) => {
  res.json({
    gameId: 123456,
    gameData: {
      thing: "Full of game data"
    }
  });
});

app.ws("/ws-test", (ws, req) => {
  ws.on("message", (msg) => {
    console.log(`[${Date.now()}] Message received: ${msg}`)
  });
});

app.listen(9000, () => {
  console.log("PZ server started");
});
