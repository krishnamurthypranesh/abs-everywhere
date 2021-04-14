// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const volumeCycles = require("./volumeCycles.js");

const app = express();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const port = 8000;

const corsOptions = {
  origin: "http://localhost:8080",
}
app.use(cors(corsOptions));

app.post("/programme/generate/", jsonParser, (req, res) => {
  let setsForWeek, toalWeeks, cycleDates, programme;

  exercise = req.body;
  exercise.mass.value = parseInt(exercise.mass.value);
  exercise.reps = parseInt(exercise.reps);
  exercise.baseline_sets = parseInt(exercise.baseline_sets);
  exercise.target_sets = parseInt(exercise.target_sets);
  exercise.progression = parseFloat(exercise.progression);

  [setsForWeek, totalWeeks] = volumeCycles.getSetsForWeek(exercise);

  cycleDates = volumeCycles.getVolumeCycle(exercise, setsForWeek);
  programme = volumeCycles.generateProgrammeData(exercise, totalWeeks,
    cycleDates, setsForWeek);
  res.send(JSON.stringify(programme));
})

app.post("/test/", jsonParser, (req, res) => {
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  res.send(JSON.stringify(req.body));
})

app.get("/", (req, res) => {
  res.send("Hello world");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
