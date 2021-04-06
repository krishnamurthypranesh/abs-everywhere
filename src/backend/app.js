// imports
const express = require("express");
const bodyParser = require("body-parser");
const volumeCycles = require("./data.js");

const app = express();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const port = 8000;

app.post("/programme/generate/", jsonParser, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  res.send("Hello, world.");
})

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello world");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
