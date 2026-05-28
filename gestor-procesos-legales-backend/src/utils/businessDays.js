const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const addBusinessDays = (startDate, businessDays) => {
  const date = new Date(startDate);
  let addedDays = 0;

  while (addedDays < businessDays) {
    date.setDate(date.getDate() + 1);

    if (!isWeekend(date)) {
      addedDays++;
    }
  }

  return date;
};

module.exports = {
  addBusinessDays
};