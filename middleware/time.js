// Check if firstDate was before or after secondDate
const dateInPast = function (firstDate, secondDate) {
  if (firstDate <= secondDate) {
    return true;
  }

  return false;
};

// Get difference between firstDate and secondDate in ms
const getDateDifferenceInMs = function (firstDate, secondDate) {
  let differenceInMs = firstDate.getTime() - secondDate.getTime();

  return differenceInMs;
};

module.exports = {
  dateInPast,
  getDateDifferenceInMs,
};
