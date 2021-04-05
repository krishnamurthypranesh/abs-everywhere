const fs = require("fs");

const dataMunger = require("./data.js");
const timelines = require("./timelines.js");

console.log(dataMunger);

let data = JSON.parse(fs.readFileSync("sample.json"));
let exerciseProgrammes = new Array(data.Exercises.length);

for (var index=0; index < data.Exercises.length; index++) {
  let exercise = data.Exercises[index];

  let work_capacity = new Object();
  work_capacity["baseline"] = exercise.baseline.set * exercise.reps * exercise.mass;
  work_capacity["target"] = exercise.target.set * exercise.reps * exercise.mass;

  if (exercise.bilateral === false) {
    work_capacity.baseline *= 2;
    work_capacity.target *= 2;
  }

  var current_wc, setsForWeek, current_week, totalWeeks;
  setsForWeek = new Object();
  current_week = 1;
  totalWeeks = 0;

  setsForWeek[current_week] = exercise["baseline"]["set"];
  current_wc = work_capacity.baseline;

  while (current_wc < work_capacity.target) {
    current_week += 1;
    totalWeeks += 1;
    setsForWeek[current_week] = (setsForWeek[current_week - 1] + (exercise["days"].length * exercise.progression.value));
    current_wc = setsForWeek[current_week] * exercise.reps * exercise.mass;
  }

  var startDate = new Date(Date.parse(exercise.start_date));
  var firstDates = new Object()

  for (var i=0; i < exercise.days.length; i++) {
    firstDates[exercise.days[i]] = timelines.getFirstSessionDate(startDate, exercise.days[i]);
  }

  var programmeDates = new Object();

  for (var i=0; i < exercise.days.length; i++) {
    programmeDates[exercise.days[i]] = timelines.getProgrammeDates(totalWeeks,
    firstDates[exercise.days[i]]);
  }

  var exerciseProgrammeData = dataMunger.generateProgrammeData(exercise, totalWeeks,
    programmeDates, setsForWeek)
  exerciseProgrammes[index] = exerciseProgrammeData;
}

console.log(exerciseProgrammes);
