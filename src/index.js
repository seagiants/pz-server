import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({msg:"hello"});
});

app.listen(9000, () => {
  console.log("PZ server started");
});
