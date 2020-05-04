const {
  Enumerable
} = require("./Enumerable")
const TransactionType = new Enumerable([
  "User2User",
  "Withdrawal",
  "Deposit",
  "Tip"
]);
module.exports = {
  TransactionType
}