const Decimal = require("decimal.js");
const {
  StringBuilder
} = require("./StringBuilder");
const {
  TimeSpan
} = require("./TimeSpan");
const {
  Out
} = require("./Out.js")
const {
  AuthenticationHeaderValue
} = require("./AuthenticationHeaderValue")
const {
  HTTP_CLIENT
} = require("./HTTP_CLIENT")
const {
  CloudResult
} = require("./CloudResult")
const {
  UserTags
} = require("./UserTags")
const {
  Type
} = require("./Type")
const {
  Uri
} = require("./Uri")
const {
  Enumerable
} = require("./Enumerable")
const {
  RecordId
} = require("./RecordId")
const {
  MessageType
} = require("./MessageType")
const {
  ServerStatus
} = require("./ServerStatus")
const {
  AccountType
} = require("./AccountType")
const {
  List
} = require("./List")
const {
  Dictionary
} = require("./Dictionary")
const {
  HashSet
} = require("./HashSet")
const {
  Char
} = require("./Char")
const {
  HttpMethod
} = require("./HttpMethod")
const {
  OnlineStatus
} = require("./OnlineStatus")
const {
  TransactionType
} = require("./TransactionType")
const {
  AssetVariantEntityType
} = require("./AssetVariantEntityType")
const {
  OwnerType
} = require("./OwnerType")
const {
  FriendStatus
} = require("./FriendStatus")
const {
  Path
} = require("./Path")
const {
  AssetUtil
} = require("./AssetUtil")
const {
  CloudXInterface
} = require("./CloudXInterface")
const {
  MessageManager
} = require("./MessageManager")
const {
  FriendManager
} = require("./FriendManager")
const {
  Endpoints
} = require("./Endpoints")
const {
  Group
} = require("./Group")
const {
  RecordUtil
} = require("./RecordUtil")
const {
  Record
} = require("./Record")
const {
  IdUtil
} = require("./IdUtil")
const {
  User
} = require("./User")
const {
  SearchParameters
} = require("./SearchParameters")
const {
  Message
} = require("./Message")
const {
  NeosSession
} = require("./NeosSession")
const {
  UserStatus
} = require("./UserStatus")
const {
  TransactionManager
} = require("./TransactionManager")
const CloudX = {
  Shared: {
    FriendManager,
    FriendStatus,
    OwnerType,
    AuthenticationHeaderValue,
    UserTags,
    OnlineStatus,
    RecordId,
    AccountType,
    AssetUtil,
    AssetVariantEntityType,
    CloudResult,
    CloudXInterface,
    Endpoints,
    Group,
    ServerStatus,
    MessageType,
    TransactionType,
    HttpMethod,
    CloudXInterface,
    RecordUtil,
    Record,
    IdUtil,
    User,
    SearchParameters,
    MessageManager,
    Message,
    NeosSession,
    UserStatus,
    TransactionManager
  },
  Util: {
    Path,
    StringBuilder,
    TimeSpan,
    Out,
    Uri,
    Type,
    Enumerable,
    List,
    Dictionary,
    HashSet,
    Char,
    Decimal
  }
}
module.exports = {
  CloudX
}