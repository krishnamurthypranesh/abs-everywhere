import * as fs from "fs";
import * as util from "util";

const writeFile = util.promisify(fs.writeFile);

import { daysOfTheWeek } from "./timelines.js";

export function generateProgrammeData(exerciseData, totalWeeks, programmeDates, setsForWeek) {
  let data = new Array((totalWeeks * exerciseData.days.length) + 1);
  const COLUMNS = ["Sl No", "Week Number", "Date", "Day",
    "Exercise", "Instrument", "Mass", "Sets", "Reps", "Exercise Type",
    "Training Method", "Work Capacity", "Comments"];

  data[0] = COLUMNS;
  var weekNumber = 1;
  var slNo = 1;
  var reps, exerciseType, trainingMethod, exercise, instrument, mass,
    workCapacity, sets, date, day;

  exercise = exerciseData.name;
  instrument = exerciseData.instrument;
  mass = exerciseData.mass;
  reps = exerciseData.reps;
  exerciseType = exerciseData.exercise_type;
  trainingMethod = exerciseData.training_method;

  while (weekNumber <= totalWeeks + 1) {
    sets = Math.floor(setsForWeek[weekNumber]);
    for (var i=0; i < exerciseData.days.length; i++) {
      // get date
      date = programmeDates[exerciseData.days[i]][weekNumber - 1];
      // get day
      day = daysOfTheWeek[date.getDay()];
      // calcuate wc
      workCapacity = sets * reps * mass;

      var row = [slNo, weekNumber, date.toISOString(), day, exercise, instrument, mass,
      sets, reps, exerciseType, trainingMethod, workCapacity, ""]

      data[slNo] = row;
      slNo += 1;
    }
    weekNumber += 1;
  }
  return data;
}

function formatCSVData(programmeData) {
  let dataString = "";
  var temp = "";
  for (var i=0; i < programmeData.length; i++) {
    temp = "";
    for (var j=0; j < programmeData[i].length; j++) {
      temp += programmeData[i][j] + ",";
    }
    temp += "\n";
    dataString += temp;
  }
  return dataString;
}

export async function programmeToCSV(programmeData) {
  try {
    var csvData = formatCSVData(programmeData);
    await writeFile("targets/programmeData.csv", csvData);
  } catch (err) {
    console.log(err);
  }
}
