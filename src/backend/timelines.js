const daysOfTheWeek = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday"
  };

function getFirstSessionDate(startDate, firstSessionDay) {
  var start_date, offset, idx, firstSessionDate;

  idx = startDate.getDay();
  offset = 0;

  while (firstSessionDay != daysOfTheWeek[idx]) {
    offset += 1;
    if (idx === 6) {
      idx = 0;
    } else {
      idx += 1;
    }
  }

  var firstSessionDate = new Date(startDate.getTime() +
    (offset * 24 * 3600 * 1000));
  return firstSessionDate;
}

function getProgrammeDates(totalWeeks, firstSessionDate) {
  var weekNumber = 1;
  var dates = new Array(totalWeeks);
  var currDate;
  dates[0] = firstSessionDate;
  while (weekNumber <= totalWeeks + 1) {
    currDate = new Date(firstSessionDate.getTime() +
    (weekNumber * 7 * 24 * 3600 * 1000));
    dates[weekNumber] = currDate;
    weekNumber += 1;
  }
  return dates;
}

exports.daysOfTheWeek = daysOfTheWeek;
exports.getFirstSessionDate = getFirstSessionDate;
exports.getProgrammeDates = getProgrammeDates;
