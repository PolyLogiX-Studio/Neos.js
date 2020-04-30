const {Enumerable} = require("./Enumerable")
const MessageType = new Enumerable([
  "Text",
  "Object",
  "SessionInvite",
  "CreditTransfer",
  "SugarCubes" //Not Implimented
]);
module.exports = {
  MessageType
}