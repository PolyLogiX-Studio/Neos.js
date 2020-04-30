const {StringBuilder} = require("./StringBuilder");
const {TimeSpan} = require("./TimeSpan");
const {Out} = require("./Out.js")
const {AuthenticationHeaderValue} = require("./AuthenticationHeaderValue")
const {HTTP_CLIENT} = require("./HTTP_CLIENT")
const {CloudResult} = require("./CloudResult")
const {UserTags} = require("./UserTags")
const {Type} = require("./Type")
const {Uri} = require("./Uri")
const {Enumerable} = require("./Enumerable")
const {RecordId} = require("./RecordId")
const {MessageType} = require("./MessageType")
const {ServerStatus} = require("./ServerStatus")
const {AccountType} = require("./AccountType")
const {List} = require("./List")
const {Dictionary} = require("./Dictionary")
const {HashSet} = require("./HashSet")
const CloudX = {
  Shared: {
    AuthenticationHeaderValue,
    CloudResult,
    UserTags,
    HTTP_CLIENT,
    RecordId,
    MessageType,
    ServerStatus,
    AccountType
  },
  Util: {
    StringBuilder,
    TimeSpan,
    Out,
    Uri,
    Type,
    Enumerable,
    List,
    Dictionary,
    HashSet
  }
}
module.exports = {
  CloudX
}