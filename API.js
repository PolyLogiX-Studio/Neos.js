/**
 * @fileoverview NeosVR CloudX.Shared Library in NodeJS
 *
 * @author Bitman
 * @author PolyLogiX Studio
 *
 * @requires NPM:uuid
 * @requires NPM:node-fetch
 * @requires NPM:uri-js
 *
 */

/**
 *
 * @template T
 * @class Action
 */
class Action { }
/**
 *
 * @template T
 * @class Task
 */
class Task extends Promise { }
const {
  v4: uuidv4
} = require("uuid");
const fetch = require("node-fetch");
const Decimal = require("decimal.js");
const fs = require("fs");

const SHA256 = require("crypto-js/sha256");










/**
 * @template T
 * @class Enumerable
 * @extends {Object}
 * @returns {Enumerable<T>}
 */





const TransactionType = new Enumerable([
  "User2User",
  "Withdrawal",
  "Deposit",
  "Tip"
]);
const HttpMethod = new Enumerable({
  Get: "GET",
  Put: "PUT",
  Delete: "DELETE",
  Post: "POST",
  Patch: "PATCH"
});
const OnlineStatus = new Enumerable([
  "Offline",
  "Invisible",
  "Away",
  "Busy",
  "Online"
]);
const AssetVariantEntityType = new Enumerable([
  "BitmapMetadata",
  "BitmapVariant"
]);
const FriendStatus = new Enumerable([
  "None",
  "SearchResult",
  "Requested",
  "Ignored",
  "Blocked",
  "Accepted"
]);
const OwnerType = new Enumerable(["Machine", "User", "Group", "INVALID"]);
/**
 *
 *  Delay by ms
 * @param {TimeSpan} timespan
 * @returns {Promise}
 */
function Delay(timespan) {
  return new Promise(resolve => setTimeout(resolve, timespan.msecs));
}

class Path {
  static GetExtension(str) {
    return str.match(/\.[a-zA-Z0-9]+$/)[0];
  }
  static GetFileNameWithoutExtension(str) {
    return str.replace(/\.[^/.]+$/, "");
  }
}




Number.prototype.TryParseInt = function (num, out) {
  if (!isNaN(parseInt(num))) {
    out.Out = parseInt(num);
    return true;
  } else {
    return false;
  }
};
Array.prototype.ToList = function () {
  let t = new List();
  for (let item of this) {
    t.Add(item);
  }
  return t;
};
String.prototype.noExtension = function () {
  return this.replace(/\.[^/.]+$/, "");
};
String.IsNullOrWhiteSpace = function (str) {
  if (!str) return true;
  if (str.trim() == "") return true;
  return false;
};
String.IsNullOrEmpty = function (str) {
  if (!str) return true;
  if (str == "") return true;
  return false;
};
/**
 * Simple class to work with Characters
 *
 * @class Char
 */
class Char {
  static IsLetterOrDigit(char) {
    if (char == null || char == "" || char == " ") return false;
    if (!isNaN(char)) return true;
    if (char.toUpperCase() != char.toLowerCase()) return true;
    return false;
  }
  static IsWhiteSpace(char) {
    if (!char) return false;
    if (char == " ") return true;
    return false;
  }
}

/**
 *
 *
 * @class HttpRequestMessage
 */
class HttpRequestMessage {
  constructor(method, uri) {
    this.Headers = {
      Accept: "application/json"
    };
    this.Content = {};
    this.Method = method;
    this.RequestUri = uri;
  }
}
/**
 *
 * @class HttpResponseMessage
 */
class HttpResponseMessage {
  constructor() {
    this.Headers = {};
    this.Content = {};
    this.Method = new String();
    this.RequestUri = new String();
  }
}

//Models
/**
 *
 *
 * @class HubPatreons
 */
class HubPatreons {
  /**
   *Creates an instance of HubPatreons.
   * @param {{
   * "patreon-names": List<string>,
   * "patreon-pictures": List<PicturePatreon>
   * }} $b
   * @memberof HubPatreons
   */
  constructor($b) {
    if (!$b) $b = {};
    this.MAX_NAMES = 400;
    this.MAX_PICTURES = 50;
    this.PatreonNames = $b["patreon-names"] || new List();
    this.PatreonPictures = $b["patreon-pictures"] || new List();
  }
}
/**
 *
 *
 * @class AssetDiff
 */
class AssetDiff {
  /**
   *Creates an instance of AssetDiff.
   * @param {{
   * hash:string,
   * bytes:Number,
   * state: AssetDiff.Diff,
   * isUploaded?: Boolean
   * }} $b
   * @memberof AssetDiff
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Hash = $b.hash;
    this.Bytes = $b.bytes;
    this.State = $b.state;
    this.IsUploaded = $b.isUploaded || new Boolean();
    /**@type {Enumerable<String>} */
    this.Diff = new Enumerable(["Added", "Unchanged", "Removed"]);
  }
}
class AssetMetadataRequest {
  static get MAX_BATCH_SIZE() {
    return 32;
  }
}

class AssetUploadData {
  /**
   *Creates an instance of AssetUploadData.
   * @param {{
   * signature: string,
   * variant: string,
   * ownerId: string
   * totalBytes: Number,
   * chunkSIze: Number,
   * totalChunks: Number,
   * uploadState: (UploadState)
   * }} $b
   * @memberof AssetUploadData
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Signature = $b.signature;
    this.Variant = $b.variant;
    this.OwnerId = $b.ownerId;
    this.TotalBytes = $b.totalBytes;
    this.ChunkSIze = $b.chunkSIze;
    this.TotalChunks = $b.totalChunks;
    /** @template UploadState*/
    this.UploadState = $b.uploadState;
  }
}
class AssetUtil {
  /**
   * @readonly
   * @static
   * @memberof AssetUtil
   */
  static get COMPUTE_VERSION() {
    return 4;
  }
  /**
   *
   * @template T
   * @static
   * @param {T} file
   * @memberof AssetUtil
   */
  static GenerateHashSignature(file) {
    if (Type.Get(file) == "String") {
      let fileStream = fs.readFileSync(file);
      return AssetUtil.GenerateHashSignature(fileStream);
    } else {
      return SHA256(file.toString())
        .toString()
        .replace("-", "")
        .toLowerCase();
    }
  }
  static GenerateURL(signature, extension) {
    if (!extension.startsWith(".")) extension = "." + extension;
    return new Uri("neosdb:///" + signature + extension);
  }
  /**
   * @static
   * @param {Uri} uri
   * @param {Out<String>} extension
   * @memberof AssetUtil
   */
  static ExtractSignature(uri, extension = new Out()) {
    if (uri.Scheme != "neosdb") throw new Error("Not a NeosDB URI");
    let segment = uri.Segments[1];
    extension.Out = Path.GetExtension(segment);
    return Path.GetFileNameWithoutExtension(segment);
  }
  /**
   *
   *
   * @param {string} signature
   * @param {string} variant
   * @memberof AssetUtil
   */
  static ComposeIdentifier(signature, variant) {
    if (String.IsNullOrWhiteSpace(variant)) return signature;
    return signature + "&" + variant;
  }
  /**
   *
   *
   * @static
   * @param {string} identifier
   * @param {Out<String>} signature
   * @param {Out<String>} variant
   * @memberof AssetUtil
   */
  static SplitIdentifier(identifier, signature, variant) {
    let length = identifier.indexOf("&");
    if (length >= 0) {
      variant.Out = identifier.substr(length + 1);
      signature.Out = identifier.substr(0, length);
    } else {
      variant.Out = null;
      signature.Out = identifier.toLowerCase();
    }
  }
}
class AssetVariantComputationTask {
  /**
   *Creates an instance of AssetVariantComputationTask.
   * @param {{
   * assetSignature: string,
   * variantId: string,
   * entityType: AssetVariantEntityType
   * }} $b
   * @memberof AssetVariantComputationTask
   */
  constructor($b) {
    if (!$b) $b = {};
    this.AssetSignature = $b.assetSignature;
    this.VariantId = $b.variantId;
    this.EntityType = $b.entityType;
  }
}
class ChildRecordDiff {
  /**
   *Creates an instance of ChildRecordDiff.
   * @param {{
   * operation: <#RecordInfoOperation>,
   * created: Date,
   * parentRecord: RecordId,
   * recordInfo: RecordInfo,
   * }} $b
   * @memberof ChildRecordDiff
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Operation = $b.operation;
    this.Created = $b.created;
    this.ParentRecord = $b.parentRecord;
    this.RecordInfo = $b.recordInfo;
    /** @template Enumerable<string> */
    this.RecordInfoOperation = new Enumerable(["Upsert", "Remove"]);
  }
}
class CreditTransaction {
  /**
   *Creates an instance of CreditTransaction.
   * @param {{
   * token: string,
   * fromUserId: string,
   * toUserId: string,
   * amount: number,
   * comment: string,
   * transactionType: TransactionType,
   * anonymous: Boolean
   * }} $b
   * @memberof CreditTransaction
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Token = $b.token;
    this.FromUserId = $b.fromUserId;
    this.ToUserId = $b.toUserId;
    this.Amount = $b.amount;
    this.Comment = $b.comment;
    this.TransactionType = $b.transactionType;
    this.Anonymous = $b.anonymous;
  }
}
class ExternalQueueObject {
  /**
     *Creates an instance of ExternalQueueObject.
     @template T
     * @param {{
     * id: string,
     * popReceipt: string,
     * object: T
     * }} $b
     * @memberof ExternalQueueObject
     */
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.id;
    this.PopReceipt = $b.popReceipt;
    this.Object = $b.object;
  }
}
class PicturePatreon {
  /**
   *Creates an instance of PicturePatreon.
   * @param {{
   * name: string,
   * pictureUrl: string
   * }} $b
   * @memberof PicturePatreon
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Name = $b.name;
    this.PictureURL = $b.pictureUrl;
  }
  /**
   *
   *
   * @param {string} name
   * @param {string} url
   * @memberof PicturePatreon
   */
  PicturePatreon(name, url) {
    this.Name = name;
    this.PictureURL = url;
  }
}
class License {
  /**
   *Creates an instance of License.
   * @param {{
   * licenseGroup: string,
   * licenseKey: string,
   * PairedMachineUUID: string
   * }} $b
   * @memberof License
   */
  constructor($b) {
    if (!$b) $b = {};
    this.LicenseGroup = $b.licenseGroup;
    this.LicenseKey = $b.licenseKey;
    this.PairedMachineUUID = $b.PairedMachineUUID;
  }
}
class LoginCredentials {
  /**
   *Creates an instance of LoginCredentials.
   * @param {{
   * ownerId: string,
   * username: string,
   * email: string,
   * password: string,
   * recoverCode: string,
   * sessionCode: string
   * secretMachineId: string,
   * rememberMe: Boolean
   * }} $b
   * @memberof LoginCredentials
   */
  constructor($b) {
    if (!$b) $b = {};
    this.OwnerId = $b.ownerId;
    this.Username = $b.username;
    this.Email = $b.email;
    this.Password = $b.password;
    this.RecoverCode = $b.recoverCode;
    this.SessionToken = $b.sessionCode;
    this.SecretMachineId = $b.secretMachineId;
    this.RememberMe = $b.rememberMe;
  }
  Preprocess() {
    if (this.Username) this.Username = this.Username.trim();
    if (this.Email) this.Email = this.Email.trim();
  }
  /**
   *
   * @readonly
   * @memberof LoginCredentials
   * @returns {Boolean}
   */
  get IsPasswordValid() {
    return CryptoHelper.IsValidPassword(this.Password);
  }
}
class NeosAccount {
  /**
   *
   * @static
   * @param {AccountType} type
   * @returns {Number}
   * @memberof NeosAccount
   */
  static MinCents(type) {
    let num = 100;
    switch (type) {
      case AccountType.Normal:
        return 0;
      case AccountType.AgentSmith:
        return num;
      case AccountType.BladeRunner:
        return num * 6;
      case AccountType.Gunter:
        return num * 12;
      case AccountType.Neuromancer:
        return num * 24;
      case AccountType.Architect:
        return num * 32;
      case AccountType.Curator:
        return num * 72;
      case AccountType.Level144:
        return num * 144;
      case AccountType.Level250:
        return num * 250;
      case AccountType.Anorak:
        return num * 500;
      default:
        throw new Error("Invalid AccountType: " + type);
    }
  }
  /**
   *
   *
   * @static
   * @param {AccountType} type
   * @returns {String}
   * @memberof NeosAccount
   */
  static AccountName(type) {
    switch (type) {
      case AccountType.Normal:
        return "Standard Account";
      case AccountType.AgentSmith:
        return "Agent Smith";
      case AccountType.BladeRunner:
        return "Blade Runner";
      case AccountType.Gunter:
        return "Gunter";
      case AccountType.Neuromancer:
        return "Neuromancer";
      case AccountType.Architect:
        return "Architect";
      case AccountType.Curator:
        return "Curator";
      case AccountType.Level144:
        return "Level 144";
      case AccountType.Level250:
        return "Level 250";
      case AccountType.Anorak:
        return "Anorak";
      default:
        return "Unknown Account Type";
    }
  }
  /**
   *
   *
   * @static
   * @param {AccountType} type
   * @returns {Number}
   * @memberof NeosAccount
   */
  static StorageBytes(type) {
    var num = 1073741824;
    switch (type) {
      case AccountType.Normal:
        return num;
      case AccountType.AgentSmith:
        return num * 5;
      case AccountType.BladeRunner:
        return num * 25;
      case AccountType.Gunter:
        return num * 50;
      case AccountType.Neuromancer:
        return num * 100;
      case AccountType.Architect:
        return num * 150;
      case AccountType.Curator:
        return num * 300;
      case AccountType.Level144:
        return num * 600;
      case AccountType.Level250:
        return num * 1200;
      case AccountType.Anorak:
        return num * 2400;
      default:
        throw new Error("Invalid AccountType: " + type);
    }
  }
  /**
   *
   *
   * @static
   * @param {AccountType} type
   * @returns {Number}
   * @memberof NeosAccount
   */
  static HasPatreonWorldAccess(type) {
    switch (type) {
      case AccountType.Normal:
      case AccountType.AgentSmith:
        return false;
      case AccountType.BladeRunner:
      case AccountType.Gunter:
      case AccountType.Neuromancer:
      case AccountType.Architect:
      case AccountType.Curator:
      case AccountType.Level144:
      case AccountType.Level250:
      case AccountType.Anorak:
        return true;
      default:
        throw new Error("Invalid AccountType: " + type);
    }
  }
}
class NeosDBAsset {
  /**
   *Creates an instance of NeosDBAsset.
   * @param {{
   * hash: string,
   * bytes: number
   * }} $b
   * @memberof NeosDBAsset
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Hash = $b.hash;
    this.Bytes = $b.bytes;
  }
}

class RecordInfo {
  /**
   *Creates an instance of RecordInfo.
   * @param {{
   * recordId: string,
   * ownerId: string,
   * name: string,
   * assetUri: string,
   * thumbnailUri: string,
   * globalVersion: Number
   * }} $b
   * @memberof RecordInfo
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.recordId;
    this.OwnerId = $b.ownerId;
    this.Name = $b.name;
    this.AssetURI = $b.assetUri;
    this.ThumbnailURI = $b.thumbnailUri;
    this.GlobalVersion = $b.globalVersion;
  }
}
class RecordPreprocessStatus {
  /**
   *Creates an instance of RecordPreprocessStatus.
   * @param {{
   * id: string,
   * ownerId: string,
   * recordId: string,
   * state: RecordPreprocessStatus,
   * progress: number,
   * failReason: string
   * resultDiffs: List
   * }} $b
   * @memberof RecordPreprocessStatus
   */
  constructor($b) {
    if (!$b) $b = {};
    this.PreprocessId = $b.id;
    this.OwnerId = $b.ownerId;
    this.RecordId = $b.recordId;
    this.State = $b.state;
    this.Progress = $b.progress;
    this.FailReason = $b.failReason;
    this.ResultDiffs = $b.resultDiffs;
  }
}
class RSAParametersData {
  /**
   *Creates an instance of RSAParametersData.
   * @param {{
   * Exponent:Number[],
   * Modulus:Number[],
   * P:Number[],
   * Q:Number[],
   * DP:Number[],
   * DQ:Number[],
   * InverseQ:Number[],
   * D:Number[]
   * }} $b
   * @memberof RSAParametersData
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Exponent = $b.Exponent;
    this.Modulus = $b.Modulus;
    this.P = $b.P;
    this.Q = $b.Q;
    this.DP = $b.DP;
    this.DQ = $b.DQ;
    this.InverseQ = $b.InverseQ;
    this.D = $b.D;
  }
  /**
   *
   * @static
   * @param {RSAParametersData} rsa
   * @memberof RSAParametersData
   */
  static RSAParametersData(rsa) {
    let rsaParametersData = new RSAParametersData(rsa);
    rsaParametersData.D = rsaParametersData.D;
    return rsaParametersData;
  }
  /**
   *
   * @static
   * @param {RSAParametersData} data
   * @memberof RSAParametersData
   */
  static RSAParameters(data) {
    return new RSAParametersData(data);
  }
}
const SessionAccessLevel = new Enumerable([
  "Private",
  "LAN",
  "Friends",
  "RegisteredUsers",
  "Anyone"
]);
class ServerStatistics {
  /**
   *Creates an instance of ServerStatistics.
   * @param {{
   * lastUpdate: Date,
   * responseTimeMilliseconds:Number
   * }} $b
   * @memberof ServerStatistics
   */
  constructor($b) {
    if (!$b) $b = {};
    this.LastUpdate = $b.lastUpdate;
    this.ResponseTimeMilliseconds = $b.responseTimeMilliseconds;
  }
}
class SessionInfo {
  /**
   *Creates an instance of SessionInfo.
   * @param {{
   * name:String,
   * description:String,
   * tags:HashSet<String>,
   * sessionId:String,
   * hostUserId:String,
   * hostMachineId:String,
   * hostUsername:String,
   * compatibilityHash:String,
   * neosVersion:String,
   * headlessHost:Boolean,
   * url:String,
   * sessionURLs:List<String>,
   * sessionUsers:List<SessionUser>,
   * thumbnail:String,
   * joinedUsers:Number,
   * activeUsers:Number,
   * maxUsers:Number,
   * mobileFriendly:Boolean,
   * sessionBeginTime:Date,
   * lastUpdate:Date,
   * awaySince?:Date,
   * accessLevel:SessionAccessLevel
   * }} $b
   * @memberof SessionInfo
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Name = $b.name;
    this.Description = $b.description;
    this.Tags = $b.tags;
    this.SessionId = $b.sessionId;
    this.HostUserId = $b.hostUserId;
    this.HostMachineId = $b.hostMachineId;
    this.HostUsername = $b.hostUsername;
    this.CompatibilityHash = $b.compatibilityHash;
    this.NeosVersion = $b.neosVersion;
    this.HeadlessHost = $b.headlessHost;
    this.LegacySessionURL = $b.url || null; //LEGACY
    let SessionURLs = $b.sessionURLs;
    if (Type.Get(SessionURLs) == "List") this.SessionURLs = SessionURLs;
    if (Type.Get(SessionURLs) == "Array")
      this.SessionURLs = SessionURLs.ToList();
    let SessionUsers = $b.sessionUsers;
    if (Type.Get(SessionUsers) == "List") this.SessionUsers = SessionUsers;
    if (Type.Get(SessionUsers) == "Array")
      this.SessionUsers = SessionUsers.ToList();
    this.Thumbnail = $b.thumbnail;
    this.JoinedUsers = $b.joinedUsers;
    this.ActiveUsers = $b.activeUsers;
    this.MaximumUsers = $b.maxUsers;
    this.MobileFriendly = $b.mobileFriendly;
    this.SessionBeginTime = $b.sessionBeginTime;
    this.LastUpdate = $b.lastUpdate;
    this.AwaySince = $b.awaySince;
    this.AccessLevel = $b.accessLevel;
    this.IsLAN = new Boolean();
  }
  /**
   *
   *
   * @returns {List<Uri>}
   * @memberof SessionInfo
   */
  GetSessionURLs() {
    if (this.SessionURLs != null)
      return this.SessionURLs.filter(str => {
        return str;
      })
        .map(str => new Uri(str))
        .ToList();
    let uriList = new List();
    if (this.LegacySessionURL != null)
      uriList.Add(new Uri(this.LegacySessionURL));
    return uriList;
  }
  /**
   *
   * @readonly
   * @memberof SessionInfo
   */
  get HasEnded() {
    if (this.SessionURLs == null || this.SessionURLs.length == 0)
      return this.LegacySessionURL == null;
    return false;
  }
  /**
   *
   * @param {SessionInfo} other
   * @returns {Boolean}
   * @memberof SessionInfo
   */
  IsSame(other) {
    if (
      !(this.Name == other.Name) ||
      !(this.Description == other.Description) ||
      !this.Tags.IsSame(other.Tags) ||
      !(this.SessionId == other.SessionId) ||
      !(this.HostUserId == other.HostUserId) ||
      !(this.HostMachineId == other.HostMachineId) ||
      !(this.HostUsername == other.HostUsername) ||
      !(this.CompatibilityHash == other.CompatibilityHash) ||
      !(this.NeosVersion == other.NeosVersion) ||
      this.HeadlessHost != other.HeadlessHost
    )
      return false;
    return true;
  }
}
/**
 *
 *
 * @class SessionUpdate
 */
class SessionUpdate {
  /**
   *Creates an instance of SessionUpdate.
   * @param {{
   * hostedSessions:List<SessionInfo>,
   * removedSessions:List<String>}} $b
   * @memberof SessionUpdate
   */
  constructor($b) {
    this.HostedSessions = $b.hostedSessions;
    this.RemovedSessions = $b.removedSessions;
  }
}
//CLOUD
/**
 *
 * @public
 * @class AssetEntry
 */
class AssetEntry {
  /**
   *Creates an instance of AssetEntry.
   * @param {*} $b
   * @memberof AssetEntry
   */
  constructor($b) {
    if (!$b) $b = {};
    this.id = $b.id || new String();
    this.OwnerId = $b.ownerId || new String();
    this.Entry = $b.entry || null;
    this.ComputeLock = $b.computeLock || null;
  }
  /**
   *
   * @public
   * @memberof AssetEntry
   */
  get AssetHash() {
    if (this.OwnerId == null || !this.OwnerId.startsWith("A-")) {
      console.error("OwnerId is invalid, cannot extract asset hash from it");
    }
    return this.OwnerId.substring("A-".length);
  }
  set AssetHash(value) {
    this.OwnerId = "A-" + value;
  }
}
class ThumbnailInfo {
  /**
   *Creates an instance of ThumbnailInfo.
   * @param {{
   * id: string,
   * key: string
   * }} $b
   * @memberof ThumbnailInfo
   */
  constructor($b) {
    if (!b) $b = {};
    this.MAX_THUMBNAIL_LIFETIME_MINUTES = 10;
    this.Id = $b.id;
    this.Key = $b.key || null;
  }
}

class TransactionMessage {
  /**
   *Creates an instance of TransactionMessage.
   * @param {{
   * token: string,
   * recipientId: string,
   * amount:number,
   * comment:string,
   * transactionType: TransactionType
   * }} $b
   * @memberof TransactionMessage
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Token = $b.token;
    this.RecipientId = $b.recipientId;
    this.Amount = $b.amount;
    this.Comment = $b.comment;
    this.TransactionType = $b.transactionType || null;
  }
}

class UserPatreonData {
  constructor($b) {
    if (!$b) $b = {};
    this.MIN_WORLD_ACCESS_CENTS = 600;
    this.ACTIVATION_LENGTH = 40;
    this.Email = $b.email;
    this.IsPatreonSupporter = $b.isPatreonSupporter;
    this.LastPatreonPledgeCents = $b.lastPatreonPledgeCents;
    this.LastTotalCents = $b.lastTotalCents;
    this.RewardMultiplier = $b.rewardMultiplier || null;
    this.RewardType = $b.rewardType;
    this.CustomTier = $b.customTier;
    /** @deprecated */
    this.LastPlusActivationTime = $b.lastPlusActivationTime || null;
    this.LastActivationTime = $b.lastActivationTime;
    /** @deprecated */
    this.LastPlusPledgeAmount = $b.lastPlusPledgeAmount || null;
    this.LastPaidPledgeAmount = $b.lastPaidPledgeAmount;
  }
  /**
   * @deprecated
   * @param {Date} value
   * @memberof UserPatreonData
   */
  set LastPlusActivationTime(value) {
    this.LastActivationTime = value || this.LastActivationTime;
  }
  get LastPlusActivationTime() {
    return this.LastActivationTime;
  }
  /**
   * @deprecated
   * @memberof UserPatreonData
   */
  set LastPlusPledgeAmount(value) {
    this.LastPaidPledgeAmount = value;
  }
  get LastPlusPledgeAmount() {
    return this.LastPaidPledgeAmount;
  }
  /**
   * @returns {AccountType}
   * @readonly
   * @memberof UserPatreonData
   */
  get AccountName() {
    if (this.CustomTier != null) return this.CustomTier;
    return NeosAccount.AccountName(this.CurrentAccountType);
  }
  /**
   * @returns {AccountType}
   * @readonly
   * @memberof UserPatreonData
   */
  get CurrentAccountType() {
    if (
      new Date(new Date() - this.LastActivationTime).getSeconds() /
      (1000 * 3600 * 24) <=
      40.0
    )
      return UserPatreonData.GetAccountType(this.LastPaidPledgeAmount);
    return AccountType.Normal;
  }
  get PledgedAccountType() {
    return UserPatreonData.GetAccountType(this.LastPatreonPledgeCents);
  }
  /**
   *
   * @public
   * @param {number} currentTotalCents
   * @param {Out<Boolean>} extendedPlus
   *
   * @memberof UserPatreonData
   */
  UpdatePatreonStatus(currentTotalCents, extendedPlus) {
    extendedPlus.Out = false;
    let num = currentTotalCents - this.LastTotalCents;
    if (num <= 0) {
      if (this.LastActivationTime.getFullYear() > 2016) return false;
      num = this.LastPaidPledgeAmount;
    }
    if (num > 0) {
      this.LastActivationTime = new Date();
      this.LastPaidPledgeAmount = num;
      extendedPlus.Out = true;
    }
    this.LastTotalCents = currentTotalCents;
    return true;
  }
  /**
   *
   * @private
   * @param {number} cents
   * @memberof UserPatreonData
   * @returns {AccountType}
   */
  GetAccountType(cents) {
    for (var type = AccountType.Anorak; type >= AccountType.Normal; type--) {
      if (cents >= NeosAccount.MinCents(type)) return type;
    }
    return AccountType.Normal;
  }
  get HasPledgesEnoughForPlus() {
    return (
      Math.max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) >
      NeosAccount.MinCents(AccountType.BladeRunner)
    );
  }
  get HasPledgedEnoughForWorlds() {
    return (
      Math.max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) >= 600
    );
  }
}

class UserProfile {
  constructor($b) {
    if (!$b) $b = {};
    this.IconUrl = $b.iconUrl;
    this.BackgroundUrl = $b.backgroundUrl;
    this.TagLine = $b.tagLine;
    this.Description = $b.description;
    this.ProfileWorldUrl = $b.profileWorldUrl;
    this.ShowcaseItems = $b.showcaseItems;
    this.TokenOptOut = $b.tokenOptOut;
  }
  /**
   *
   *
   * @param {UserProfile} other
   * @returns
   * @memberof UserProfile
   */
  IsSame(other) {
    return (
      this.IconUrl == other.IconUrl &&
      this.BackgroundUrl == other.BackgroundUrl &&
      this.TagLine &&
      other.TagLine
    ); //TODO When implimented
  }
  static MAX_SHOWCASE_ITEMS() {
    return 6;
  }
  /**
   *
   * @readonly
   * @memberof UserProfile
   */
  get IsValid() {
    let showcaseItems = this.ShowcaseItems;
    return (
      (showcaseItems != null ? showcaseItems.Count : 0) <=
      UserProfile.MAX_SHOWCASE_ITEMS
    );
  }
  /**
   *
   *
   * @param {String} token
   *
   * @memberof UserProfile
   */
  AcceptsToken(token) {
    return this.TokenOptOut == null || !this.TokenOptOut.Any(s => s == token);
  }
}
class UserStatus {
  static get STATUS_RESET_SECONDS() {
    return 120;
  }
  static get REMOVED_STATUS_KEEP_SECONDS() {
    return 300;
  }
  constructor($b) {
    if (!$b) $b = {};
    this.OnlineStatus = $b.onlineStatus;
    this.LastStatusChange = $b.lastStatusChange;
    this.CurrentSessionId = $b.currentSessionId;
    this.CompatibilityHash = $b.compatibilityHash;
    this.NeosVersion = $b.neosVersion;
    this.PublicRSAKey = $b.publicRSAKey;
    this.ActiveSessions = $b.activeSessions;
  }
  /**
   *
   * @returns {SessionInfo}
   * @readonly
   * @memberof UserStatus
   */
  get CurrentSession() {
    let activeSessions = this.ActiveSessions;
    if (activeSessions == null) return null;
    return activeSessions.find(s => s.SessionId == this.CurrentSessionId);
  }
  /**
   *
   * @returns {Boolean}
   * @param {UserStatus} other
   * @memberof UserStatus
   */
  IsSame(other) {
    if (
      other == null ||
      this.OnlineStatus != other.OnlineStatus ||
      this.CurrentSessionId != other.CurrentSessionId
    )
      return false;
    return true; //TODO remove when implimented
    let activeSessions1 = this.ActiveSessions;
    let num1 = activeSessions1 != null ? activeSessions1.Count : 0;
    let activeSessions2 = this.ActiveSessions;
    let num2 = activeSessions2 != null ? activeSessions2.Count : 0;
    let activeSessions3 = other.ActiveSessions;
    let num3 = activeSessions3 != null ? activeSessions3.Count : 0;
    if (num2 != num3) return false;
    for (let index = 0; index < num1; index++) {
      if (!this.ActiveSessions[index].IsSame(other.ActiveSessions[index]))
        return false;
    }
    return true;
  }
  SortSessions() {
    if (this.ActiveSessions == null) return;
    this.ActiveSessions.sort((a, b) => {
      if (a.SessionId == this.CurrentSessionId) return -1;
      if (b.SessionId == this.CurrentSessionId) return 1;
      if (a.AwaySince != null && b.AwaySince != null)
        return a.AwaySince.toLocaleString().localeCompare(
          b.AwaySince.toLocaleString()
        );
      return a.SessionId.localeCompare(b.SessionId);
    });
  }
}

/**
 *
 *
 * @class AssetInfo
 */
class AssetInfo {
  /**
   *Creates an instance of AssetInfo.
   * @memberof AssetInfo
   */
  constructor($b) {
    if (!$b) $b = {};
    this.OwnerId = $b.ownerId || new String();
    this.AssetHash = $b.assetHash || new String();
    this.Bytes = $b.bytes || new Number();
    this.Free = $b.free || new Boolean();
    this.IsUploaded = $b.isUploaded || new Boolean();
    this.UploaderUserId = $b.uploadUserId || new String();
    this.CountsAgainstMemberQuota = $b.bytes || new Boolean();
  }
}
/**
 *
 *
 * @class CloudMessage
 */
class CloudMessage {
  /**
   *Creates an instance of CloudMessage.
   * @memberof CloudMessage
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Message = $b.Message || new String();
  }
  static ExtractMessage(content) {
    try {
      return content.Message || content;
    } catch (err) {
      return content;
    }
  }
}
class CloudVariable {
  constructor($b) {
    if (!$b) $b = {};
    this.VariableOwnerId = $b.ownerId;
    this.Path = $b.path;
    this.Value = $b.value;
  }
  static GetDefinitionPath(path, ownerId, subpath) {
    let length = path.indexOf(".");
    ownerId.Out = path.substring(0, length);
    subpath.Out = path.substring(length + 1);
  }
  GetDefinitionPath(ownerId, subpath) {
    CloudVariable.GetDefinitionPath(this.Path, ownerId, subpath);
  }
}
class CloudVariableDefinition {
  constructor($b) {
    if (!$b) $b = {};
    this.DefinitionOwnerId = $b.definitionOwnerId;
    this.Subpath = $b.subpath;
    this.TypeHint = $b.typeHint;
    this.DefaultValue = $b.defaultvalue;
    this.VariableOwnerCanRead = $b.variableOwnerCanRead;
    this.VariableOwnerCanWrite = $b.variableOwnerCanWrite;
    this.AnyoneCanRead = $b.anyoneCanRead;
    this.AnyoneCanWrite = $b.anyoneCanWrite;
  }
  CanRead(variableOwnerId, readerId) {
    return (
      this.AnyoneCanRead ||
      (this.VariableOwnerCanRead && variableOwnerId == readerId) ||
      readerId == this.DefinitionOwnerId
    );
  }
  CanWrite(variableOwnerId, writerId) {
    return (
      this.AnyoneCanWrite ||
      (this.VariableOwnerCanWrite && variableOwnerId == writerId) ||
      writerId == this.DefinitionOwnerId
    );
  }
}
class Friend {
  /**
   *Creates an instance of Friend.
   * @param {*} $b
   * @memberof Friend
   */
  constructor($b) {
    if (!$b) $b = {};
    this.FriendUserId = $b.id;
    this.OwnerId = $b.ownerId;
    this.FriendUsername = $b.friendUsername;
    this.FriendStatus = $b.friendStatus;
    this.IsAccepted = $b.isAccepted;
    this.UserStatus = new UserStatus($b.userStatus);
    this.LatestMessageTime = $b.latestMessageTime;
    this.Profile = new UserProfile($b.profile);
  }
  /**
   *
   *
   * @param {Friend} other
   * @memberof Friend
   */
  IsSame(other) {
    if (
      this.FriendUserId == other.FriendUserId &&
      this.OwnerId == other.OwnerId &&
      this.FriendUsername == other.FriendUsername &&
      this.IsAccepted == other.IsAccepted &&
      this.FriendStatus == other.FriendStatus &&
      this.LatestMessageTime == other.LatestMessageTime &&
      this.UserStatus.IsSame(other.UserStatus)
    )
      return true;
    return false;
  }
}
class Group {
  constructor($b) {
    if (!$b) $b = {};
    this.GroupId = $b.id || new String();
    this.AdminUserId = $b.adminUserId || new String();
    this.Name = $b.name || new String();
    this.QuotaBytes = $b.quotaBytes || new Number();
    this.UsedBytes = $b.usedBytes || new Number();
  }
}
class RecordHelper {
  static IsSameVersion(record, other) {
    if (
      record.LastModifyingMachineId == other.LastModifyingMachineId &&
      record.LastModifyingUserId == other.LastModifyingUserId
    )
      return record.LocalVersion == other.LocalVersion;
    if (
      record.LocalVersion == other.LocalVersion &&
      record.GlobalVersion == other.GlobalVersion &&
      record.LastModifyingMachineId == other.LastModifyingMachineId
    )
      return record.LastModifyingUserId == other.LastModifyingUserId;
    return false;
  }
  static IsSameRecord(record, other) {
    if (record.OwnerId == other.OwnerId)
      return record.RecordId == other.RecordId;
    return false;
  }

  static InheritPermissions(record, source) {
    record.IsPublic = source.IsPublic;
    record.IsForPatrons = source.IsForPatrons;
    return record;
  }

  static CanOverwrite(record, oldRecord) {
    if (oldRecord == null) return true;
    if (
      record.LastModifyingMachineId == oldRecord.LastModifyingMachineId &&
      record.LastModifyingUserId == oldRecord.LastModifyingUserId
    )
      return record.LocalVersion > oldRecord.LocalVersion;
    return record.GlobalVersion == oldRecord.GlobalVersion;
  }

  static TakeIdentityFrom(record, source) {
    record.RecordId = source.RecordId;
    record.OwnerId = source.OwnerId;
    record.LocalVersion = source.LocalVersion;
    record.GlobalVersion = source.GlobalVersion;
    record.LastModifyingMachineId = source.LastModifyingMachineId;
    record.LastModifyingUserId = source.LastModifyingUserId;
    record.IsPublic = source.IsPublic;
    record.IsForPatrons = source.IsForPatrons;
    record.IsListed = source.IsListed;
    record.FirstPublishTime = source.FirstPublishTime;
    record.CreationTime = source.CreationTime;
    record.Visits = source.Visits;
    record.Rating = source.Rating;
    return record;
  }

  static GetUrl(record) {
    return RecordUtil.GenerateUri(record.OwnerId, record.RecordId);
  }

  static SetUrl(record, url) {
    let ownerId = [];
    let recordId = [];
    if (!RecordUtil.ExtractRecordID(url, ownerId, recordId))
      throw new Exception("Invalid Record URL");
    record.OwnerId = ownerId.Out;
    record.RecordId = recordId.Out;
    return record;
  }
}
class Member {
  constructor($b) {
    if (!$b) $b = {};
    this.UserId = $b.id || new String();
    this.GroupId = $b.ownerId || new String();
    this.QuotaBytes = $b.quotaBytes || new Number();
    this.UsedBytes = $b.usedBytes || new Number();
  }
}
class Membership {
  constructor($b) {
    if (!$b) $b = {};
    this.UserId = $b.ownerId || new String();
    this.GroupId = $b.id || new String();
    this.GroupName = $b.groupName || new String();
  }
}
class Message {
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.id;
    this.OwnerId = $b.ownerId;
    this.RecipientId = $b.recipientId;
    this.SenderId = $b.senderId;
    this.MessageType = $b.messageType;
    this.Content = $b.content;
    this.SendTime = $b.sendTime;
    this.LastUpdateTime = $b.lastUpdateTime;
    this.ReadTime = $b.readTime;
  }
  static GenerateId() {
    return "MSG-" + uuidv4();
  }
  ExtractContent() {
    return JSON.parse(this.Content);
  }
  SetContent(obj) {
    this.Content = JSON.stringify(obj);
  }
  get IsSent() {
    return this.SenderId == this.OwnerId;
  }
  get IsReceived() {
    return this.RecipientId == this.OwnerId;
  }
  get IsRead() {
    return this.ReadTime !== undefined;
  }
}
class NeosSession {
  constructor($b) {
    if (!$b) $b = {};
    this.ReverseTimestamp = $b.reverseTimestamp || new String();
    this.SessionId = $b.sessionId || new String();
    this.NeosVersion = $b.neosVersion || new String();
    this.UserId = $b.userId || new String();
    this.MachineId = $b.machineId || new String();
    this.CountryCode = $b.countryCode || new String();
    this.SystemLocale = $b.systemLocale || new String();
    this.ClientIp = $b.clientIp || new String();
    this.SessionStart = $b.sessionStart || new Date();
    this.SessionEnd = $b.sessionEnd || new Date();
    this.VisitedWorlds = $b.visitedWorlds || new Number();
    this.CreatedWorlds = $b.createdWorlds || new Number();
    this.OperatingSystem = $b.operatingSystem || new String();
    this.HeadDevice = $b.headDevice || new String();
    this.HeadDeviceModel = $b.headDeviceModel || new String();
    this.CPU = $b.cpu || new String();
    this.GPU = $b.gpu || new String();
    this.MemoryBytes = $b.memoryBytes || new Number();
    this.Peripherals = $b.peripherals || new String();
  }
}
class IRecord {
  constructor() {
    this.RecordId = new String();
    this.OwnerId = new String();
    this.URL = new String();
    this.GlobalVersion = new Number();
    this.Localversion = new Number();
    this.LastModifyingUserId = new String();
    this.LastModifyingMachineId = new String();
    this.Name = new String();
    this.OwnerName = new String();
    this.Description = new String();
    this.RecordType = new String();
    this.Tags = new HashSet();
    this.Path = new String();
    this.ThumbnailURI = new String();
    this.IsPublic = new Boolean();
    this.IsForPatreons = new Boolean();
    this.IsListed = new Boolean();
    this.Visits = new Number();
    this.Rating = new Number();
    this.FirstPublishTime = new Date();
    this.CreationTime = new Date();
    this.LastModificationTime = new Date();
    this.NeosDBManifest = new List();
  }
}
class Record extends IRecord {
  constructor($b) {
    if (!$b) $b = {};
    super();
    this.RecordId = $b.id || new String();
    this.OwnerId = $b.ownerId || new String();
    this.AssetURI = $b.assetUri || new String();
    this._URL = new String();
    this.GlobalVersion = $b.globalVersion || new Number();
    this.Localversion = $b.localVersion || new Number();
    this.LastModifyingUserId = $b.lastModifyingUserId || new String();
    this.LastModifyingMachineId = $b.lastModifyingMachineId || new String();
    this.Name = $b.name || new String();
    this.Description = $b.description || undefined;
    this.RecordType = $b.recordType || new String();
    this.OwnerName = $b.ownerName || new String();
    this.Tags = $b.tags ? new HashSet($b.tags) : undefined;
    this.Path = $b.path || new String();
    this.ThumbnailURI = $b.thumbnailUri || new String();
    this.LastModificationTime = $b.lastModificationTime || new Date();
    this.CreationTime = $b.creationTime || new Date();
    this.FirstPublishTime = $b.firstPublishTime || new Date();
    this.IsPublic = $b.isPublic || new Boolean();
    this.IsForPatreons = $b.isForPatreons || new Boolean();
    this.IsListed = $b.isListed || new Boolean();
    this.Visits = $b.visits || new Number();
    this.Rating = $b.rating || new Number();
    this.Submissions = $b.submissions || new List();
    this.Manifest = new List();
    this.NeosDBManifest = $b.neosDbManidest || new List();
  }
  get URL() {
    return RecordHelper.GetUrl(this);
  }
  URL(value) {
    return RecordHelper.SetUrl(this, value);
  }
  static IsValidId(recordId) {
    return recordId.startsWith("R-");
  }
  get IsValidOwnerId() {
    return IdUtil.GetOwnerType(this.OwnerName) != OwnerType.INVALID;
  }
  get IsValidRecordId() {
    return RecordUtil.IsValidRecordID(this.RecordId);
  }
  ResetVersioning() {
    this.Localversion = 0;
    this.GlobalVersion = 0;
    this.LastModifyingMachineId = null;
    this.LastModifyingMachineId = null;
  }
}
class RecordList {
  constructor($b) {
    if (!$b) $b = {};
    this._Id = $b.id;
    this.OwnerId = b.ownerId;
    this.Name = $b.name;
    this.Page = $b.page;
    this.Records = $b.records; //TYPE Record
  }
  get Id() {
    return this.Name + "-" + this.Page.toString();
  }
}
/**
 *
 * @static
 * @class RecordUtil
 */
class RecordUtil {
  /**
   *
   *
   * @static
   * @param {string} ownerId
   * @param {string} recordId
   *
   * @memberof RecordUtil
   */
  static GenerateUri(ownerId, recordId) {
    return new Uri("neosrec:///" + ownerId + "/" + recordId);
  }
  /**
   *
   *
   * @static
   * @param {string} recordId
   *
   * @memberof RecordUtil
   */
  static IsValidRecordID(recordId) {
    return (
      !String.IsNullOrWhiteSpace(recordId) &&
      recordId.startsWith("R-") &&
      recordId.length > "R-".length
    );
  }
  /**
   *
   *
   * @static
   * @param {Uri} recordUri
   * @param {Out<string>} ownerId
   * @param {Out<string>} recordId
   * @memberof RecordUtil
   */
  static ExtractRecordID(recordUri, ownerId, recordId) {
    ownerId.Out = null;
    recordId.Out = null;
    if (recordUri == null) return false;
    if (recordUri.Scheme != "neosrec" || recordUri.Segments.length != 3)
      return false;
    ownerId.Out = recordUri.Segments[1];
    if (String.IsNullOrEmpty(ownerId.Out)) return false;
    ownerId.Out = ownerId.Out.substr(0, ownerId.Out.length - 1);
    recordId.Out = recordUri.Segments[2];
    return (
      !String.IsNullOrEmpty(recordId.Out) &&
      RecordUtil.IsValidRecordID(recordId.Out)
    );
  }
  /**
   *
   *
   * @static
   * @param {Uri} recordUri
   * @param {Out<string>} ownerId
   * @param {Out<string>} recordPath
   * @memberof RecordUtil
   */
  static ExtractRecordPath(recordUri, ownerId, recordPath) {
    ownerId.Out = null;
    recordPath.Out = null;
    if (
      recordUri == null ||
      recordUri.Scheme != "neosrec" ||
      recordUri.Segments.length < 3
    )
      return false;
    ownerId.Out = recordUri.Segments[1];
    if (String.IsNullOrEmpty(ownerId.Out)) return false;
    ownerId.Out = ownerId.Out.substr(0, ownerId.Out.length - 1);
    let stringBuilder = new StringBuilder();
    for (let index = 2; index < recordUri.Segments.length; index++)
      stringBuilder.Append(recordUri.Segments[index]);
    recordPath.Out = stringBuilder.toString();
    return true;
  }
  static GenerateRecordID() {
    return "R-" + uuidv4();
  }
}
/**
 *
 * @static
 * @class IdUtil
 */
class IdUtil {
  static get MAX_NAME_LENGTH() {
    return 20;
  }
  /**
   *
   * @static
   * @param {string} id
   * @returns {OwnerType}
   * @memberof IdUtil
   */
  static GetOwnerType(id) {
    if (id == null) return OwnerType.INVALID;
    if (id.startsWith("M-")) return OwnerType.Machine;
    if (id.startsWith("U-")) return OwnerType.User;
    return id.startsWith("G-") ? OwnerType.Group : OwnerType.INVALID;
  }
  /**
   *
   * @static
   * @param {OwnerType} ownerType
   * @param {string} [name=null]
   * @param {number} [randomAppend=0]
   * @memberof IdUtil
   */
  static GenerateId(ownerType, name = null, randomAppend = 0) {
    name =
      name != null ?
        name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[\u{0080}-\u{FFFF}]/gu, "") :
        null;
    var stringBuilder = new StringBuilder();
    if (name != null) {
      for ( /** @type string */ let c of name) {
        if (Char.IsLetterOrDigit(c)) stringBuilder.Append(c);
        if (Char.IsWhiteSpace(c) || c == "_") stringBuilder.Append("-");
        if (stringBuilder.Length == 20) break;
      }
    }
    if (stringBuilder.Length == 0 || randomAppend > 0) {
      if (stringBuilder.Length > 0) stringBuilder.Append("-");
      let str = uuidv4();
      if (randomAppend > 0) str = str.substr(0, randomAppend);
      stringBuilder.Append(str);
    }
    switch (ownerType) {
      case OwnerType.Machine:
        stringBuilder.Insert(0, "M-");
        break;
      case OwnerType.User:
        stringBuilder.Insert(0, "U-");
        break;
      case OwnerType.Group:
        stringBuilder.Insert(0, "G-");
        break;
      default:
        throw new Error("Invalid Owner Type");
    }
    return stringBuilder.toString();
  }
}
class SessionUser {
  constructor($b) {
    if (!$b) $b = {};
    this.Username = $b.username;
    this.UserID = $b.userID;
    this.IsPresent = $b.isPresent;
  }
  Equals(other) {
    if (this.Username == other.Username && this.UserID == other.UserID)
      return this.IsPresent == other.IsPresent;
    return false;
  }
}
class Submission {
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.id;
    this.GroupId = $b.ownerId;
    this.TargetRecordId = $b.targetRecordId;
    this.SubmissionTime = $b.submissionTime;
    this.SubmittedById = $b.submittedById;
    this.Featured = $b.featuredByUserId;
    this.FeaturedByUserId = $b.featuredByUserId;
    this.FeaturedTimestamp = $b.featuredTimestamp;
  }
}
class User {
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.id;
    this.Username = $b.username;
    this.Email = $b.email || undefined;
    this.RegistrationDate = $b.registrationDate;
    this.QuotaBytes = $b.quotaBytes;
    this.UsedBytes = $b.usedBytes;
    this.IsVerified = $b.isVerified;
    this.AccountBanExpiration = $b.accountBanExpiration || new Date(0);
    this.PublicBanExpiration = $b.publicBanExpiration || new Date(0);
    this.SpectatorBanExpiration = $b.spectatorBanExpiration || new Date(0);
    this.MuteBanExpiration = $b.muteBanExpiration || new Date(0);
    this.Password = $b.password;
    this.RecoverCode = $b.recoverCode;
    this.Tags = new HashSet($b.tags) || null;
    this.PatreonData = new UserPatreonData($b.patreonData) || null;
    this.Credits = $b.credits;
    this.NCRDepositAddress = $b.NCRdepositAddress;
    this.ReferralId = $b.referralId;
    this.ReferrerUserId = $b.referrerUserId;
    this.Profile = new UserProfile($b.profile);
  }
  get IsAccountBanned() {
    return new Date() < this.AccountBanExpiration;
  }
  get IsPublicBanned() {
    return new Date() < this.PublicBanExpiration;
  }
  get IsSpectatorBanned() {
    return new Date() < this.SpectatorBanExpiration;
  }
  get IsMuteBanned() {
    return new Date() < this.MuteBanExpiration;
  }
  get CurrentAccountType() {
    if (this.PatreonData == null) return AccountType.Normal;
    return this.PatreonData.CurrentAccountType;
  }
  get AccountName() {
    return (
      this.PatreonData.AccountName ||
      NeosAccount.AccountName(AccountType.Normal)
    );
  }
  get IsPasswordValid() {
    return this.Password != null && this.Password.length >= 8 && true; //TODO:Count Check
  }
  get IsUsernameValid() {
    if (this.Username != null) return this.Username.length > 0;
    return false;
  }
}
class UserSession {
  constructor($b) {
    if (!$b) $b = {};
    this.UserId = $b.userId || new String();
    this.SessionToken = $b.token || new String();
    this.SessionCreated = $b.created || new Date();
    this.SessionExpire = $b.expire || new Date();
    this.SecretMachineId = $b.secretMachineId || new String();
    this.RememberMe = $b.rememberMe || new Boolean();
  }
  get IsExpired() {
    return new Date() > this.SessionExpire;
  }
}
class Visit {
  constructor($b) {
    if (!$b) $b = {};
    this.URL = $b.url || new Uri();
    this.UserId = $b.userId || new String();
    this.NeosSessionID = $b.neosSessionID || new String();
    this.RecordVersion = $b.recordVersion || new Number();
    this.Duration = $b.duration || new Number();
    this.Start = $b.start || new Date();
    this.End = $b.end || new Date();
    this.Referal = $b.referal || new String();
  }
  get IsValid() {
    return (
      this.Start.getFullYear() >= 2016 &&
      !(this.Start >= this.End) &&
      (this.End - this.Start).getSeconds() >= this.Duration &&
      !String.IsNullOrWhiteSpace(this.URL._rawUrl)
    );
  }
}




class ProductInfoHeaderValue {
  constructor(product, version) {
    this.Product = product;
    this.Version = version;
  }
  Value() {
    return this.Product + " " + this.Version;
  }
}

class CloudResultGeneric extends CloudResult { }
class PolyLogiXOAUTH {

}

class CancellationTokenSource {
  constructor(timeout) {
    this.Token = uuidv4();
  }
}

class SearchParameters {
  constructor($b) {
    if (!$b) $b = {};
    /** @type Boolean */
    this.Private = $b.private;
    /** @type string */
    this.ByOwner = $b.byOwner;
    /** @type OwnerType */
    this.OwnerType = $b.ownerType || OwnerType.User;
    /** @type string */
    this.SubmittedTo = $b.submittedTo;
    /** @type boolean */
    this.OnlyFeatured = $b.onlyFeatured;
    /** @type string */
    this.RecordType = $b.recordType;
    /** @type List<string> */
    this.RequiredTags = $b.requiredTags;
    /** @type Date */
    this.MinDate = $b.minDate;
    /** @type Date */
    this.MaxDate = $b.maxDate;
    /** @type SearchSortParameter */
    this.SortBy = $b.sortBy;
    /** @type SearchSortDirection */
    this.SortDirection = $b.sortDirection;
    /** @type List<string> */
    this.ExtraSignatures = new List();
    Object.defineProperties(this, {
      _isNormalized: {
        value: new Boolean()
      }
    });
  }
  Normalize() {
    if (this._isNormalized) return;
    if (this.RequiredTags != null) {
      this.RequiredTags.Sort();
      if (this.RequiredTags.Count == 0) this.RequiredTags = null;
    }
    if (this.ExtraSignatures != null) {
      this.ExtraSignatures.Sort();
      if (this.ExtraSignatures.Count == 0) this.ExtraSignatures = null;
    }
    Object.defineProperties(this, {
      _isNormalized: {
        value: true
      }
    });
  }
  /**
   *
   *
   * @param {SearchParameters} other
   * @memberof SearchParameters
   */
  Equals(other) {
    if (
      this.Private != other.Private ||
      this.ByOwner != other.ByOwner ||
      this.OwnerType != other.OwnerType ||
      this.SubmittedTo != other.SubmittedTo ||
      this.RecordType != other.RecordType
    )
      return false;
    let nullable1 = this.MinDate;
    let nullable2 = other.MinDate;
    if (
      (((nullable1 != null) == nullable2) != null ?
        nullable1 != null ?
          nullable1 != nullable2 ?
            1 :
            0 :
          0 :
        1) != 0
    )
      return false;
    nullable1 = this.MaxDate;
    nullable2 = other.MaxDate;
    if (
      (((nullable1 != null) == nullable2) != null ?
        nullable1 != null ?
          nullable1 != nullable2 ?
            1 :
            0 :
          0 :
        1) != 0 ||
      this.SortBy != other.SortBy ||
      this.OnlyFeatured != other.OnlyFeatured ||
      this.SortDirection != other.SortDirection
    )
      return false;
    this.Normalize();
    other.Normalize();
    return (
      SearchParameters.ListEqual(this.RequiredTags, other.RequiredTags) &&
      SearchParameters.ListEqual(this.ExtraSignatures, other.ExtraSignatures)
    );
  }
  /**
   *
   *
   * @static
   * @param {List<string>} a
   * @param {List<String>} b
   * @memberof SearchParameters
   */
  static ListEqual(a, b) {
    //Explicit Non-Virtual Call
    let num1 = a != null ? a.Count : 0;
    let num2 = b != null ? b.Count : 0;
    if (num1 != num2) return false;
    for (let index = 0; index < num1; index++) {
      if (a[index] != b[index]) return false;
    }
    return true;
  }
}
class Endpoints {
  static CLOUDX_NEOS_API = "https://cloudx.azurewebsites.net";
  static CLOUDX_NEOS_BLOB =
    "https://cloudxstorage.blob.core.windows.net/assets/";
  static CLOUDX_NEOS_THUMBNAILS =
    "https://cloudxstorage.blob.core.windows.net/thumbnails/";
}
class FriendManager {
  static UPDATE_PERIOD_SECONDS = 5;
  constructor(cloud) {
    this.Cloud = cloud;
    /** @type Dictionary<string, Friend> */
    this.friends = new Dictionary();
    /** @type Dictionary<string, SessionInfo> */
    this._friendSessions;
    /** @type Date */
    this.lastStatusUpdate = new Date(0);
    /** @type Date */
    this.lastRequest = new Date(0);
    /** @type boolean */
    this._friendsChanged;
    /** @type CloudXInterface */
    this.Cloud;
    /** @type Number */
    this.FriendRequestCount;
    Object.defineProperties(this, {
      _friendSessions: {
        value: new Dictionary(),
        writable: true
      },
      _lock: {
        value: new Object(),
        writable: false
      },
      _friendsChanged: {
        value: new Boolean(),
        writable: true
      }
    });
  }

  /**
   *
   *
   * @param {CloudXInterface} cloud
   * @memberof FriendManager
   */
  FriendManager(cloud) {
    this.Cloud = cloud;
  }
  /**
   *
   * @returns {Boolean}
   * @readonly
   * @memberof FriendManager
   */
  get FriendCount() {
    return this.friends.Count;
  }
  /**
   *
   *
   * @param {List<Friend>} list
   * @memberof FriendManager
   */
  GetFriends(friendId) {
    switch (Type.Get(friendId)) {
      case "List":
        for (let friend of this.friends) {
          friendId.Add(friend.Value);
        }
        break;
      case "String":
        let friend = new Out();
        if (this.friends.TryGetValue(friendId, friend)) return friend.Out;
        return null;
    }
  }

  /**
   *
   *
   * @param {Action<Friend>} action
   * @memberof FriendManager
   */
  ForeachFriend(action) {
    for (let friend of this.friends) {
      action(friend.Value);
    }
  }
  /**
   *
   *
   * @param {List<SessionInfo>} sessions
   *
   * @memberof FriendManager
   */
  GetFriendSessions(sessions) {
    for (let friendSession of this._friendSessions) {
      sessions.Add(friendSession.Value);
    }
    return this._friendSessions.Count;
  }
  ForeachFriendSession(action) {
    for (let friendSession of this._friendSessions) {
      action(friendSession.Value);
    }
  }
  /**
   *
   *
   * @param {string} friendId
   * @returns {(Friend | Friend<Null>)}
   * @memberof FriendManager
   */
  GetFriend(friendId) {
    let friend = new Out();
    if (this.friends.TryGetValue(friendId, friend)) return friend.Out;
    return null;
  }
  FindFriend(predicate) {
    for (let friend of this.friends) {
      if (predicate(friend.Value)) return friend.Value;
    }
    return null;
  }
  IsFriend(userId) {
    let friend = new Out();
    if (this.friends.TryGetValue(userId, friend))
      return friend.Out.FriendStatus == "Accepted";
    return false;
  }
  /**
   *
   *
   * @param {(String | Friend)} friend
   * @memberof FriendManager
   */
  AddFriend(friend) {
    switch (Type.Get(friend)) {
      case "String":
        this.AddFriend(
          new Friend({
            id: friend,
            friendUsername: friend.substr(2),
            friendStatus: "Accepted"
          })
        );
        break;
      case "Friend":
        friend.OwnerId = this.Cloud.CurrentUser.Id;
        friend.FriendStatus = "Accepted";
        this.Cloud.UpsertFriend(friend);
        this.AddedOrUpdated(friend);
        break;
    }
  }
  RemoveFriend(friend) {
    friend.OwnerId = this.Cloud.CurrentUser.Id;
    friend.FriendStatus = "Ignored";
    this.Cloud.DeleteFriend(friend);
    this.Removed(friend);
  }
  IgnoreRequest(friend) {
    friend.OwnerId = this.Cloud.CurrentSession.UserId;
    friend.FriendStatus = "Ignored";
    this.Cloud.UpsertFriend(friend);
    this.AddedOrUpdated(friend);
  }
  /**
   *
   *
   * @param {Friend} friend
   * @memberof FriendManager
   */
  AddedOrUpdated(friend) {
    let old = new Out();
    if (!this.friends.TryGetValue(friend.FriendUserId, old)) {
      this.friends.Add(friend.FriendUserId, friend);
      let friendAdded = this.FriendAdded;
      if (friendAdded != null) {
        friendAdded(friend);
      }
      this._friendsChanged = true;
    } else {
      if (!friend.IsSame(old.Out)) {
        this.friends.Replace(friend.FriendUserId, friend);
        let friendUpdated = this.FriendUpdated;
        if (friendUpdated != null) friendUpdated(friend, old.Out);
        this._friendsChanged = true;
      }
    }
  }
  /**
   *
   *
   * @param {Friend} friend
   * @memberof FriendManager
   */
  Removed(friend) {
    this.friends.Remove(friend.FriendUserId);
    let friendRemoved = this.FriendRemoved;
    if (friendRemoved != null) friendRemoved(friend);
    this._friendsChanged = true;
  }
  Reset() {
    for (let friend of this.friends) {
      let friendRemoved = this.FriendRemoved;
      if (friendRemoved != null) friendRemoved(friend.Value);
    }
    this.friends.Clear();
    this.lastStatusUpdate = new Date(0);
    this.lastRequest = new Date(0);
  }
  Update() {
    if (this._friendsChanged) {
      this._friendsChanged = false;
      let num;
      num = this.friends.filter(f => {
        if (f.Value.FriendStatus == "Requested")
          return f.Value.FriendUserId != this.Cloud.CurrentUser.Id;
        return false;
      }).length;
      this._friendSessions.Clear();
      for (let friend of this.friends) {
        if (!friend.Value.UserStatus) friend.Value.UserStatus = {};
        if (friend.Value.UserStatus.ActiveSessions != null) {
          for (let activeSession in friend.Value.UserStatus.ActiveSessions) {
            if (
              activeSession.AccessLevel == SessionAccessLevel.Friends &&
              !this._friendSessions.ContainsKey(activeSession.SessionId)
            )
              this._friendSessions.Add(activeSession.SessionId, activeSession);
          }
        }
      }
      if (num != this.FriendRequestCount) {
        this.FriendRequestCount = num;
        let requestCountChanged = this.FriendRequestCountChanged;
        if (requestCountChanged != null)
          requestCountChanged(this.FriendRequestCount);
      }
      let friendsChanged = this.FriendsChanged;
      if (friendsChanged != null) friendsChanged();
    }
    if (
      this.Cloud.CurrentUser == null ||
      new Date(new Date() - this.lastRequest).getSeconds() <
      FriendManager.UPDATE_PERIOD_SECONDS
    ) {
      return;
    }
    this.lastRequest = new Date();
    this.Cloud.GetFriends(this.lastStatusUpdate).then(friends => {
      if (friends.IsError) {
        return;
      }
      for (let friend of friends.Entity) {
        if (friend.UserStatus != null) {
          this.lastStatusUpdate = new Date();
        }
        this.AddedOrUpdated(friend);
      }
    });
  }
}

class MessageManager {
  constructor(cloud) {
    this.lastRequest;
    this.lastUnreadMessage = null;
    this.Cloud = cloud;
    this.InitialmessagesFetched = new Boolean();
    this.UnreadCount = new Number();
    Object.defineProperties(this, {
      _messagesLock: {
        value: new Object(),
        writable: false
      },
      _messages: {
        value: new Dictionary(),
        writable: true
      },
      _unreadCountDirty: {
        value: new Boolean(),
        writable: true
      },
      _waitingForRequest: {
        value: new Boolean(),
        writable: true
      }
    });
  }
  static UPDATE_PERIOD_SECONDS = 1;
  static UPDATE_TIMEOUT_SECONDS = 10;

  static get MAX_READ_HISTORY() {
    return 100;
  }
  static get MAX_UNREAD_HISTORY() {
    return 500;
  }
  MessageManager(cloud) {
    this.Cloud = cloud;
  }

  Update() {
    if (this.Cloud.CurrentUser == null) {
      return;
    }
    if (this._unreadCountDirty) {
      Object.defineProperties(this, {
        _unreadCountDirty: {
          value: false,
          writable: true
        }
      });
      this.UnreadCount = this._messages.length;
      let messageCountChanged = this.UnreadMessageCountChanged;
      if (messageCountChanged != null) {
        messageCountChanged(this.UnreadCount);
      }
    }
    if (
      new Date(new Date() - this.lastRequest).getSeconds() <
      (this._waitingForRequest ?
        MessageManager.UPDATE_TIMEOUT_SECONDS :
        MessageManager.UPDATE_PERIOD_SECONDS)
    ) {
      return;
    }
    this.lastRequest = new Date();
    this._waitingForRequest = true;
    (async () => {
      let cloudResult1 = await this.Cloud.GetUnreadMessages(
        this.lastUnreadMessage
      ).then(async cloudResult1 => {
        this._waitingForRequest = false;
        if (!cloudResult1.IsOK) {
          return;
        }
        var hashSet = new HashSet();
        for (let message of cloudResult1.Entity) {
          let tMessage = this.GetUserMessages(message.SenderId);
          if (!tMessage) hashSet.push(message);
          else {
            tMessage.AddMessage(message);
          }
        }
        let flag1 = false;
        for (let message of cloudResult1.Entity) {
          if (!hashSet.includes(message)) {
            if (
              this.InitialmessagesFetched &&
              message.MessageType == "CreditTransfer"
            ) {
              let content = message.ExtractContent();
              let flag2 = content.RecipientId == this.Cloud.CurrentUser.Id;
              let currentUser = this.Cloud.CurrentUser;
              /*
                            if (currentUser.Credits != null && currentUser.Credits.CONTAINSKEY(content.Token)) { //TODO: Create Function CONTAINSKEY
                                currentUser.Credits[content.Token] += flag2 ? content.Amount : -content.Amount;
                            }
                            */
              flag1 = true;
            }
            let onMessageReceived = this.onMessageReceived;
            if (onMessageReceived != null) onMessageReceived(message);
            let friend = this.Cloud.Friends.GetFriend(message.SenderId);
            if (friend != null)
              friend.LatestMessageTime = Math.max(new Date(), message.SendTime);
          }
        }
        //TODO: POOL RETURN
        this.MarkUnreadCountDirty();
        this.InitialmessagesFetched = true;
        if (!flag1) return;
        await setTimeout(() => {
          let cloudResult2 = this.Cloud.UpdateCurrentUserInfo();
        }, 10000);
      });
    })();
  }
  MarkUnreadCountDirty() {
    Object.defineProperties(this, {
      _unreadCountDirty: {
        value: true,
        writable: true
      }
    });
  }
  Reset() {
    Object.defineProperties(this, {
      _messages: {
        value: new Dictionary(),
        writable: true
      }
    });
    this.lastUnreadMessage = new Date();
    this.InitialmessagesFetched = false;
  }
  GetUserMessages(userId) {
    let usermessages1 = new Out();
    if (this._messages.TryGetValue(userId, usermessages1)) {
      return usermessages1.Out;
    }
    let usermessages2 = new MessageManager.UserMessages();
    usermessages2.UserMessages(userId, this);
    this._messages.Add(userId, usermessages2);
    return usermessages2;
  }
  GetAllUserMessages(list) {
    for (let message of this._messages) {
      list.push(message.Value);
    }
  }
  //event OnMessageReceived
  //event UnreadMessageCounrChange
  static UserMessages = class {
    constructor() {
      this.UserId = new String();
      this.UnreadCount = new Number();
      this.Messages = new List();
      Object.defineProperties(this, {
        _messageIds: {
          value: new List(),
          writable: false
        },
        _lock: {
          value: "MessageManager.UserMessages._lock",
          writable: false
        },
        _historyLoadTask: {
          value: function () { },
          writable: true
        },
        _historyLoaded: {
          value: new Boolean(),
          writable: true
        }
      });
    }
    get CloudXInterface() {
      return this.Manager.Cloud;
    }
    UserMessages(userId, manager) {
      this.UserId = userId;
      this.Manager = manager;
    }
    MarkAllRead() {
      let ids = null;
      if (this.UnreadCount == 0) return;
      ids = new Array();
      for (let message of this.Messages) {
        if (!message.IsSent && !(message.ReadTime != undefined)) {
          message.ReadTime = new Date();
          ids.push(message.Id);
        }
      }
      this.UnreadCount = 0;
      (async () => {
        await this.Manager.Cloud.MarkMessagesRead(ids);
      })();
      this.Manager.MarkUnreadCountDirty();
    }
    CreateTextMessage(text) {
      let message = new Message();
      message.MessageType = "Text";
      message.Content = text;
      return message;
    }
    CreateInviteMessage(sessionInfo) {
      let message = new Message();
      message.Id = Message.GenerateId();
      message.SendTime = new Date();
      message.MessageType = "SessionInvite";
      message.SetContent(sessionInfo);
      return message;
    }
    async SendInviteMessage(sessionInfo) {
      return await this.SendMessage(this.CreateInviteMessage(sessionInfo));
    }
    AddSentTransactionMessage(token, amount, comment) {
      let message = new Message();
      message.Id = Message.GenerateId();
      message.OwnerId = this.Manager.Cloud.CurrentUser.Id;
      message.RecipientId = this.UserId;
      message.SenderId = message.OwnerId;
      message.SendTime = new Date();
      message.MessageType = "CreditTransfer";
      let _transaction = new TransactionMessage();
      _transaction.Token = token;
      _transaction.Amount = amount;
      _transaction.Comment = comment;
      _transaction.RecipientId = this.UserId;
      message.SetContent(_transaction);
      this.Messages.push(message);
      return message;
    }
    async SendMessage(message) {
      if (message.Id == null) message.Id = Message.GenerateId();
      message.RecipientId = this.UserId;
      message.SenderId = this.Cloud.CurrentUser.Id;
      message.OwnerId = message.SenderId;
      message.SendTime = new Date();
      this.Messages.push(message);
      let friend = this.Manager.Cloud.Friends.GetFriend(message.RecipientId);
      if (friend != null) friend.LatestMessageTime = new Date();
      return await this.Manager.Cloud.SendMessage(message);
    }
    async SendTextMessage(text) {
      return await this.SendMessage(this.CreateTextMessage(text));
    }
    async EnsureHistory() {
      if (this._historyLoaded) return;
      let isFirstRequest = false;
      if (this._historyLoaded) return;
      if (this._historyLoadTask == null) {
        isFirstRequest = true;
        this._historyLoadTask = this.Manager.Cloud.GetMessageHistory(
          this.UserId,
          MessageManager.MAX_READ_HISTORY
        );
      }
      let cloudResult = await this._historyLoadTask;
      if (!isFirstRequest) return;
      if (!cloudResult.IsOK) {
        this._historyLoadTask = null;
      } else {
        this.Messages = cloudResult.Entity;
        this.Messages.reverse();
        this.UnreadCount = this.Messages.filter(
          m => !m.ReadTime != undefined
        ).length;
        this._historyLoaded = true;
      }
    }
    AddMessage(message) {
      if (this._messageIds.includes(message.Id)) return false;
      this.Messages.Add(message);
      this._messageIds.Add(message.Id);
      if (message.IsReceived && !message.ReadTime != undefined)
        ++this.UnreadCount;
      while (
        this.Messages.length > MessageManager.MAX_UNREAD_HISTORY ||
        (this.Messages.length > MessageManager.MAX_UNREAD_HISTORY &&
          (this.Messages[0].IsSent || this.Messages[0].ReadTime != undefined))
      ) {
        this._messageIds.Remove(this.Messages[0].Id);
        this.Messages.RemoveAt(0);
      }
      return true;
      return true;
    }
    GetMessages(messages) {
      messages.AddRange(this.Messages);
    }
  };
}
class TransactionUtil {
  static NCR_CONVERSION_VARIABLE = "NCR_CONVERSION";
  static CDFT_CONVERSION_VARIABLE = "CDFT_CONVERSION";
}
class StringNumberConversion {
  static DecimalToBigInt(value) { }
  static BigIntToDecimal(value) { }
}
class TransactionManager {
  constructor(cloud) {
    this.CDFTConversionRatio = null
    this.NCRConversionRatio = null
    this.TransactionManager(cloud);
  }
  TransactionManager(cloud) {
    this.Cloud = cloud;
    (async () => {
      await this.LoadConversionData();
    })();
  }
  async LoadConversionData() {
    let cloudResult1 = await this.Cloud.ReadGlobalVariable(
      TransactionUtil.NCR_CONVERSION_VARIABLE
    );
    if (cloudResult1.IsOK) {
      this.NCRConversionRatio = new Decimal(cloudResult1.Entity.value);
    } else {
      console.error(
        "Error getting conversion ratio. " +
        cloudResult1.State.ToString() +
        "\n\n" +
        cloudResult1.Content
      );
    }
    let cloudResult2 = await this.Cloud.ReadGlobalVariable(
      TransactionUtil.CDFT_CONVERSION_VARIABLE
    );
    if (cloudResult2.IsOK) {
      this.CDFTConversionRatio = new Decimal(cloudResult2.Entity.value);
    } else {
      console.error(
        "Error getting conversion ratio. " +
        cloudResult2.State.ToString() +
        "\n\n" +
        cloudResult2.Content
      );
    }
  }
  TryConvert(sourceToken, sourceAmount, targetToken) {
    if (sourceToken == "USD") {
      switch (targetToken) {
        case "NCR":
          let num1 = sourceAmount;
          let ncrConversionRatio1 = this.NCRConversionRatio;
          return !ncrConversionRatio1 != null ? new Decimal() : num1 / ncrConversionRatio1
        case "CDFT":
          let num2 = sourceAmount;
          let cdftConversionRatio1 = this.CDFTConversionRatio;
          return !cdftConversionRatio1 != null ? new Decimal() : num2 / cdftConversionRatio1;
        default:
          return new Number()
      }
    } else {
      if (!(targetToken == "USD"))
        return new Number()
      switch (sourceAmount) {
        case "NCR":
          let num3 = sourceAmount;
          let ncrConversionRatio2 = this.NCRConversionRatio;
          return !ncrConversionRatio2 != null ? new Decimal() : num4 * ncrConversionRatio2;
        case "CDFT":
          let num4 = sourceAmount
          let cdftConversionRatio2 = this.CDFTConversionRatio;
          return !cdftConversionRatio2 != null ? new Decimal() : num4 * cdftConversionRatio2;
        case "KFC":
          return new Number()
        default:
          return new Number()
      }
    }
  }
  IsValidToken(token) {
    switch (token) {
      case "NCR":
      case "CDFT":
      case "KFC":
        return true;
      default:
        return false;
    }
  }
  ToUSD(token, amount) {
    switch (token) {
      case "NCR":
        return !this.NCRConversionRatio != null ? new Decimal() : this.NCRConversionRatio * amount;
      case "CDFT":
        let cdftConversionRatio = this.CDFTConversionRatio;
        let num = amount
        return !cdftConversionRatio != null ? new Decimal() : cdftConversionRatio * num;
      case 'KFC':
        return new Number()
      default:
        throw new Error("Invalid Token: " + token)
    }
  }
  static FormatCurrency(amount) {
    if (!amount) return "N/A";
    return amount.toString();
  }
}
class CryptoHelper { }
class ComputationLock { }
/**
 * @namespace
 * @memberof CloudX
 */
const Shared = {
  AccountType,
  AssetMetadataRequest,
  AssetUtil,
  AssetVariantEntityType,
  CloudResult,
  CloudXInterface,
  ComputationLock,
  CryptoHelper,
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
};
const Util = {
  Type,
  List,
  Dictionary,
  Enumerable,
  HashSet,
  Uri,
  Out,
  Decimal
};
/**
 * @namespace CloudX
 */
const CloudX = {
  Shared,
  Util
};
module.exports = {
  CloudX
};