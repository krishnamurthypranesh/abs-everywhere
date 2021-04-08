const fs = require("fs");
const util = require("util");

const writeFile = util.promisify(fs.writeFile);

const timelines = require("./timelines.js");

function calculateWorkCapacity(sets, reps, mass) {
  return sets * reps * mass;
}

function getSetsForWeek(exercise) {
  var currentWC, currentWeek, totalWeeks, setsForWeek, targetWC;

  setsForWeek = new Object();
  currentWeek = 1;
  totalWeeks = 0;

  currentWC = calculateWorkCapacity(exercise.baseline_sets,
  exercise.reps, exercise.mass.value);
  targetWC = calculateWorkCapacity(exercise.target_sets,
  exercise.reps, exercise.mass.value);


  setsForWeek[currentWeek] = exercise.baseline_sets;

  while (currentWC < targetWC) {
    currentWeek += 1;
    totalWeeks += 1;
    setsForWeek[currentWeek] = (setsForWeek[currentWeek - 1] +
    (exercise.days.length * exercise.progression));
    currentWC = setsForWeek[currentWeek] * exercise.reps * exercise.mass.value;
  }
  return [setsForWeek, totalWeeks];
}

function getVolumeCycle(exercise, setsForWeek) {
  let firstDates = new Object();
  let startDate, programmeDates;

  startDate = new Date(Date.parse(exercise.start_date));

  for (var i=0; i < exercise.days.length; i++) {
    firstDates[exercise.days[i]] = timelines.getFirstSessionDate(startDate,
      exercise.days[i]);
  }

  programmeDates = new Object();
  for (var i=0; i < exercise.days.length; i++) {
    programmeDates[exercise.days[i]] = timelines.getProgrammeDates(
      Object.keys(setsForWeek).length, firstDates[exercise.days[i]]);
  }

  return programmeDates;
}

function generateProgrammeData(exerciseData, totalWeeks, programmeDates, setsForWeek) {
  let data = new Array((totalWeeks * exerciseData.days.length) + 1);
  const COLUMNS = ["Sl No", "Week Number", "Date", "Day",
    "Exercise", "Instrument", "Mass", "Sets", "Reps", "Exercise Type",
    "Training Method", "Work Capacity", "Comments"];

  data[0] = COLUMNS;
  var weekNumber = 1;
  var slNo = 1;
  var reps, exerciseType, trainingMethod, exercise, instrument, mass,
    workCapacity, sets, date, day;

  exercise = exerciseData.exercise_name;
  instrument = exerciseData.equipment;
  mass = exerciseData.mass;
  reps = exerciseData.reps;
  exerciseType = exerciseData.exercise_type;
  trainingMethod = exerciseData.training_method;

  while (weekNumber <= totalWeeks + 1) {
    sets = Math.floor(setsForWeek[weekNumber]);
    for (var i=0; i < exerciseData.days.length; i++) {
      // get date
      date = programmeDates[exerciseData.days[i]][weekNumber];
      // get day
      day = timelines.daysOfTheWeek[date.getDay()];
      // calcuate wc
      workCapacity = sets * reps * mass.value;

      var row = [slNo, weekNumber, date.toISOString(), day, exercise, instrument,
        mass.value + " " + mass.unit,
      sets, reps, exerciseType, trainingMethod, workCapacity, ""]

      data[slNo] = row;
      slNo += 1;
    }
    weekNumber += 1;
  }
  return data;
}

function formatCSVDataString(programmeData) {
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

async function writeProgrammeToCSV(programmeData) {
  try {
    var csvData = formatCSVDataString(programmeData);
    await writeFile("targets/programmeData.csv", csvData);
  } catch (err) {
    console.log(err);
  }
}

exports.getSetsForWeek = getSetsForWeek;
exports.getVolumeCycle = getVolumeCycle;
exports.generateProgrammeData = generateProgrammeData;
exports.writeProgrammeToCSV = writeProgrammeToCSV;
