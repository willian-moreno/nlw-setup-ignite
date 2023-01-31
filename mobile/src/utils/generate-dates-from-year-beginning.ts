import moment from 'moment';

export function generateDatesFromYearBeginning() {
  const firstDayOfTheYear = moment().startOf('year');
  const today = new Date();
  const dates = [];
  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}