const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
let blocks = [
  { top: 421, left: 643, width: "50", height: "50", color: "#000000" },
  {
    top: 261.46779390267875,
    left: 469.07509808887346,
    width: "50",
    height: "50",
    color: "#ff4cc3",
  },
  { top: 442, left: 102, width: "50", height: "50", color: "#c35555" },
  { top: 485, left: 393, width: "50", height: "50", color: "#c35555" },
];

app.get("/", (rec, res) => {
  res.json("Hello");
});

app.get("/paint", (rec, res) => {
  res.json(blocks);
});

app.listen(3000, () => console.log("Server is working"));
