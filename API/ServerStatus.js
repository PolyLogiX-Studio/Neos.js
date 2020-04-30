const {Enumerable} = require("./Enumerable")
const ServerStatus = new Enumerable([
  "Good",
  "Slow",
  "Down",
  "NoInternet"
]);
module.exports = {
  ServerStatus
}