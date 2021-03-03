class Utils {
  /**
   * Get a data in a list with the format {month, day, year}.
   * You can use the parameters to get a future date or a past date.
   * If you do not want to shift date, just send 0,0,0 in the parameters and you will get current day
   *
   * @param {number} months amount of months to shift
   * @param {number} days amount of days to shitf
   * @param {number} years amount of years to shitf
   */
  getDateInFutureOrPast(days, months, years) {
    const dayjs = require("dayjs");

    let now = dayjs();
    let date = now.add(days, "day").add(months, "month").add(years, "year");
    const date_formated = date.format("MM/DD/YYYY");

    return date_formated.split("/");
  }
}

export default Utils;
