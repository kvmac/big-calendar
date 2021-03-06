import { addDays } from 'date-fns';

export const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

export class KwikCalendar {
  constructor(year) {

    this._year = year;
  }

  get daysInYear() {
    return this.calcDaysInYear();
  }
  get monthsInYear() {
    return this.calcMonthsInYear();
  }

  get todayOfTheWeek() {
    return this.getTodayOfTheWeek();
  }

  getTodayOfTheWeek = () => {
    return weekdays[new Date().getDay()];
  }


  // returns true or false depending on whether or not it is a leap year
  isLeap = (year) => new Date(year, 1, 29).getDate() === 29;

  yearLength = this.isLeap(this._year) ? 364 : 365;

  months = [
    { name: 'January', length: 31},
    { name: 'February', length: this.isLeap(this._year) ? 29 : 28 },
    { name: 'March', length: 31 },
    { name: 'April', length: 30 },
    { name: 'May', length: 31 },
    { name: 'June', length: 30 },
    { name: 'July', length: 31 },
    { name: 'August', length: 31 },
    { name: 'September', length: 30 },
    { name: 'October', length: 31 },
    { name: 'November', length: 30 },
    { name: 'December', length: 31 }
  ];

  calcDaysInYear() {
    console.time('calc');
    let daysInYear = [];
    let newDay = new Date(this._year, 1, 1).getDay();

    for (let i = 1; i <= this.yearLength; i++) {
      newDay = addDays(newDay, i);

      daysInYear.push({
        purchases: [],
        meals: [],

        // calendar stuff
        week: {
          dayInWeek: newDay.getDay(),
          weekday: weekdays[newDay.getDay()]
        },
        month: {
          name: this.months[newDay.getMonth()].name,
          number: newDay.getMonth() + 1,
          dayInMonth: newDay.getDate(),
        },
        year: {
          isLeapYear: this.isLeap(newDay.getFullYear),
          number: this._year,
          dayInYear: i
        }
      });
    }

    console.timeEnd('calc');
    return daysInYear;
  }

  calcMonthsInYear(daysInYear) {
    let yearCount = 0;
    let monthsInYear = [];

    if(daysInYear === 0) {
      daysInYear = this.calcDaysInYear();
    }

    for (let x = 0; x < 12; x++) {
      let month = {
        name: this.months[x].name,
        days: []
      };

      for (let y = 0; y <= this.months[x].length; y++) {
        month.days.push(daysInYear[yearCount]);

        yearCount++;
      }

      monthsInYear.push(month);
    }

    return monthsInYear;
  }
}