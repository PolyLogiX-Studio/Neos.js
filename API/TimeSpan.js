/**
 * Work in Miliseconds
 *
 * @class TimeSpan
 */
class TimeSpan {
  constructor(num) {
    this.msecs = num != null ? num : 0;
  }
  static fromSeconds(num) {
    return num * 1000;
  }

  static fromMinutes(num) {
    return num * 60000;
  }
}
module.exports = {
  TimeSpan
}