import { daysOfTheWeek } from "./timelines.js";

export function generateCSV(exerciseData, totalWeeks, firstDates, programmeDates, setsForWeek) {
  // ultimately, this function should generate the csv for the entire thing
  // for now [read as: Until I figure out how to generate the csv], I'll return
  // an array of arrays containing all the required data
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

      var row = [slNo, weekNumber, date, day, exercise, instrument, mass,
      sets, reps, exerciseType, trainingMethod, workCapacity, ""]

      data[slNo] = row;
      slNo += 1;
    }
    weekNumber += 1;
  }
  return data;
}
