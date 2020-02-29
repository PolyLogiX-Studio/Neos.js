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
class Action {

}
/**
 *
 * @template T
 * @class Task
 */
class Task extends Promise {

}
const uuidv4 = require('uuid/v4')
const fetch = require('node-fetch')
const AsyncLock = require('async-lock')
const Lock = new AsyncLock()
const fs = require("fs")
const URI = require('uri-js')
const path = require("path")
const SHA256 = require("crypto-js/sha256");
const { TimeSpan, parse, parseDate, fromSeconds, fromMinutes } = require('timespan')

/**
 * @template T
 *
 * @class Out
 */
class Out {
    /**
     *Creates an instance of Out.
     * @param {T} type
     * @memberof Out
     */
    constructor(type) {
        return []
    }
}
class AuthenticationHeaderValue{
    constructor(bearer, token){
    this.Authorization = bearer +" "+token
    }
}
class HTTP_CLIENT {
    /**
     *
     *
     * @static
     * @param {*} request
     * @param {*} token
     * @returns {Promise<HttpResponseMessage>}
     * @memberof HTTP_CLIENT
     */
    static async SendAsync(request, token) {
        let state
        let dat = { method: request.Method }
        dat.headers = request.Headers
        if (request.Method == "POST"||request.Method == "PATCH") dat.body = request.Content
       
            let response = await fetch(request.RequestUri, dat ).then(res => {
                state = res.status
                return res.json()
            })
        let cloudResult = new CloudResult()
        cloudResult.CloudResult(state, response)
        return cloudResult
    }
}
class Type {
    static Get(obj) { return obj.constructor.name }
}

String.prototype.GetHashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
/**
 * @template T
 * @class Enumerable
 * @extends {Object}
 * @returns {Enumerable<T>}
 */
class Enumerable extends Object {
    /**
     *Creates an instance of Enumerable.
     * @param {(string[]|List<String>)} $b
     * @returns {Enumerable<$b>}
     * @memberof Enumerable
     */
    constructor($b) {
        if ($b == null) throw new Error("No Data Given")
        super()
        let keys
        let i
        switch (Type.Get($b)) {
            case "Array":
            case "List":
                keys = $b
                for (i = 0; i < keys.length; i++) {
                    this[keys[i]] = i
                }
                break
            case "Object":

                keys = Object.keys($b)
                for (i = 0; i < keys.length; i++) {
                    this[keys[i]] = $b[[keys[i]]]
                }
                break
            default:
                throw new Error("Invalid Data, Expected type: <Array, List, Object>")

        }
        Object.freeze(this)
    }
    GetValue(key) {
        if (this._values)
            return this._values[key]
        return this[key]
    }

    FromEnum(Enum) {
        let keys = Object.keys(Enum).shift()
        if (Enum > keys.length) throw new Error("Bounds Exceeded")
        for (let i = 0; i < keys.length; i++) {
            if (this[keys[i]] == Enum) return keys[i]
        }
        throw new Error("Value not Found")
    }
}
const AccountType = new Enumerable([
    'Normal',
    'AgentSmith',
    'BladeRunner',
    'Gunter',
    "Neuromancer",
    'Architect',
    'Curator',
    "Level144",
    'Level250',
    'Anorak',
    'END'
])
const ServerStatus = new Enumerable([
    "Good",
    "Slow",
    "Down",
    "NoInternet"
])
const MessageType = new Enumerable([
    "Text",
    "Object",
    "SessionInvite",
    "CreditTransfer",
    "SugarCubes" //Not Implimented
])
const TransactionType = new Enumerable([
    "User2User",
    "Withdrawal",
    "Deposit",
    "Tip"
])
const HttpMethod = new Enumerable({
    "Get": "GET",
    "Put": "PUT",
    "Delete": "DELETE",
    "Post": "POST",
    "Patch": "PATCH"
})
const AssetVariantEntityType = new Enumerable([
    "BitmapMetadata",
    "BitmapVariant"
])
/**
 *
 *  Delay by ms
 * @param {TimeSpan} timespan
 * @returns {Promise}
 */
function Delay(timespan) {
    return new Promise(resolve => setTimeout(resolve, timespan.msecs));
}
class Uri {
    /**
     *Creates an instance of Uri.
     * @param {String} url
     * @memberof Uri
     */
    constructor(url) {
        if (!url) return
        this.URL = url
    }
    /**
     * @param {string} url
     */
    set URL(url) {
        Object.defineProperty(this, "rawUrl", { value: url, enumerable: false })
        this._raw = URI.parse(url)
        let path = (this._raw.path.split('/'))
        this.Segments = new Array()
        path.forEach((value, index) => {
            this.Segments.push((index < path.length - 1) ? value + "/" : value)
        })
    }
    /**
     *
     *
     * @readonly
     * @memberof Uri
     */
    get Scheme() {
        return this._raw.scheme
    }
    /**
     *
     *
     * @static
     * @param {String} dat
     * @returns {String}
     * @memberof Uri
     */
    static EscapeDataString(dat) {
        return encodeURI(dat)
    }
}
class Path {

}
/**
 * Unordered List
 *
 * @class List
 * @extends {Array}
 * @template T
 */
class List extends Array {
    /**
     *Creates an instance of List.
     * @param {List} props List
     * @template T
     * @param {T} props
     * @returns {List<T>}
     * @memberof List
     */
    constructor(props) {
        if (!props) return super()
        super(props)
    }
    /**
     *Add a Value to the List
     * @template T
     * @type {ThisType[0]} T
     * @param {T} value
     * @memberof List
     */
    Add(value) {
        this.push(value)
    }
    Any(action) {
        return this.some(action)
    }
    /**
     * Concat 2 Lists
     * @param {List} list 
     */
    AddRange(list) {
        if (list == null) throw new Error("ArgumentNullException")
        if (!(Type.Get(list) == "List")) throw new Error("AddRange: Expected type List");
        for (var item of list) {
            this.Add(item)
        }
    }
    /**
     *Clear the List
     *
     * @memberof List
     */
    Clear() {
        this.splice(0, this.length)
    }
    /**
     * Does the List contain a given item
     * @param {*} item 
     */
    Contains(item) {
        return this.includes(item)
    }
    get Count() {
        return this.length
    }
    /**
     * 
     * @param {*} match 
     */
    Exists(match) {
        //TODO
    }
    /**
     *
     *
     * @param {*} match
     * @returns
     * @memberof List
     */
    Find(match) {
        return this.find(match)
    }
    /**
     *
     *
     * @param {*} action
     * @memberof List
     */
    ForEach(action) {
        this.forEach(action)
    }
    /**
     *
     *
     * @param {*} iValue 
     * @returns {Number} Index
     * @memberof List
     */
    Remove(iValue) {
        var iIndex = this.indexOf(iValue)
        if (iIndex > -1) {
            this.RemoveAt(iIndex)
        }
        return iIndex
    }
    /**
     *
     *
     * @param {Number} iIndex
     * @returns {*} Removed Item
     * @memberof List
     */
    RemoveAt(iIndex) {
        var vItem = this[iIndex];
        if (vItem) {
            this.splice(iIndex, 1);
        }
        return vItem;
    }
    /**
     * 
     * @param {} value 
     * @param {Out<T>} out 
     */
    TryGetValue(value, out) {
        if (value == null) return false
        if (!this.includes(value)) return false
        if (out) out.Out = value
        return true
    }
    ToArray() {
        return //TODO
    }
}


/**
 *
 *
 * @class HashSet
 * @extends {Set}
 * @template T
 */
class HashSet extends List {
    /**
     *Creates an instance of HashSet.
     * @param {*} $b
     * @memberof HashSet
     * @return {T}
     */
    constructor($b) {
        if (!$b) $b = []
        switch (Type.Get($b)) {
            case "Array":
                $b = $b.ToList()
            case "List":
                super()
                this.AddRange($b)
                break
            case "Number":
                super($b)
                break
            default:
                throw new Error("ArgumentException: Expected <Array, List, Number>")
        }
    }
    IsSame(set) {
        for (item of set) {

        }
    }
}
/**
 *
 *
 * @class Dictionary
 * @extends {Array}
 * @template T, A
 */
class Dictionary extends Array {
    /**
     *Creates an instance of Dictionary.
     * @memberof Dictionary
     */
    constructor() {
        super()
    }
    /**
     * @param {T} Key
     * @param {A} Value
     * @memberof Dictionary
     */
    Add(Key, Value) {
        if (this.ContainsKey(Key)) throw new Error("ArgumentException: An element with the same key already exists")
        this.push({ Key, Value })
    }
    /**
     *
     *
     * @memberof Dictionary
     */
    Clear() {
        this.splice(0, this.length)
    }
    /**
     *
     *
     * @param {*} key
     * @returns
     * @memberof Dictionary
     */
    ContainsKey(key) {
        for (let object of this) {
            if (object.Key == key) return true
        }
        return false
    }
    /**
     *
     *
     * @param {*} value
     * @returns
     * @memberof Dictionary
     */
    ContainsValue(value) {
        for (let object of this) {
            if (object.Value == value) return true
        }
        return false
    }
    /**
     *
     *
     * @param {*} capacity
     * @returns
     * @memberof Dictionary
     */
    EnsureCapacity(capacity) {
        return this.length
    }
    /**
     *
     *
     * @param {*} iIndex
     * @returns
     * @memberof Dictionary
     */
    RemoveAt(iIndex) {
        var vItem = this[iIndex];
        if (vItem) {
            this.splice(iIndex, 1);
        }
        return vItem;
    }
    /**
     *
     *
     * @param {*} key
     * @returns
     * @memberof Dictionary
     */
    Remove(key) {
        if (!this.ContainsKey(key)) return false
        for (let object of this) {
            if (object.Key == key) { this.RemoveAt(this.indexOf(object)); return true }
        }
        return false
    }
    get Count() {
        return this.length
    }
    Get(key, out) {
        if (!this.ContainsKey(key)) return false
        for (let object of this) {
            if (object.Key == key) { out.Out = object.Value; return true }
        }
        return false // How tf you manage that??
    }
    /**
     * 
     * @param {} value 
     * @param {Out<T>} out 
     */
    TryGetValue(value, out) {
        if (value == null) return false
        if (!this.ContainsKey(value)) return false
        if (out) this.Get(value, out)
        return true
    }
}

Array.prototype.ToList = function () {
    let t = new List()
    for (let item of this) {
        t.Add(item)
    }
    return t
}
String.prototype.noExtension = function () {
    return this.replace(/\.[^/.]+$/, "")
}
String.prototype.IsNullOrWhiteSpace = function (str) {
    if (!str) return true
    if (str.trim() == '') return true
    return false
}
/**
 *
 *
 * @class HttpRequestMessage
 */
class HttpRequestMessage {
    constructor(method, uri) {
        this.Headers = {}
        this.Content = {}
        this.Method = method
        this.RequestUri = uri
    }
}
/**
 *
 * @class HttpResponseMessage
 */
class HttpResponseMessage {
    constructor() {

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
        if (!$b) $b = {}
        this.MAX_NAMES = 400;
        this.MAX_PICTURES = 50
        this.PatreonNames = $b['patreon-names'] || new List()
        this.PatreonPictures = $b['patreon-pictures'] || new List()

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
        if (!$b) $b = {}
        this.Hash = $b.hash
        this.Bytes = $b.bytes
        this.State = $b.state
        this.IsUploaded = $b.isUploaded || new Boolean()
        /**@type {Enumerable<String>} */
        this.Diff = new Enumerable(["Added", "Unchanged", "Removed"])
    }
}
class AssetMetadataRequest {
    static MAX_BATCH_SIZE = 32
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
        if (!$b) $b = {}
        this.Signature = $b.signature
        this.Variant = $b.variant
        this.OwnerId = $b.ownerId
        this.TotalBytes = $b.totalBytes
        this.ChunkSIze = $b.chunkSIze
        this.TotalChunks = $b.totalChunks
        /** @template UploadState*/
        this.UploadState = $b.uploadState
    }
}
class AssetUtil {
    /**
     * @returns 4
     * @readonly
     * @static
     * @memberof AssetUtil
     */
    static get COMPUTE_VERSION() {
        return 4
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
            let fileStream = fs.readFileSync(file)
            return AssetUtil.GenerateHashSignature(fileStream)
        } else {
            return SHA256(file.toString()).toString().replace("-", "").toLowerCase()
        }
    }
    static GenerateURL(signature, extension) {
        if (!extension.startsWith("."))
            extension = "." + extension;
        return new Uri("neosdb:///" + signature + extension)
    }
    /**
     * @static
     * @param {Uri} uri
     * @param {Out<String>} extension
     * @memberof AssetUtil
     */
    static ExtractSignature(uri, extension) {
        if (uri.Scheme != neosdb)
            throw new Error("Not a NeosDB URI");
        let segment = uri.Segments[1];
        extension.Out = Path.GetExtension(segment)
        return segment.noExtension()
    }
    /**
     *
     *
     * @param {string} signature
     * @param {string} variant
     * @memberof AssetUtil
     */
    static ComposeIdentifier(signature, variant) {
        if (String.IsNullOrWhiteSpace(variant))
            return signature
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
        let length = identifier.indexOf("&")
        if (length >= 0) {
            variant.Out = identifier.substr(length + 1);
            signature.Out = identifier.substr(0, length)
        }
        else {
            variant.Out = null;
            signature.Out = identifier.toLowerCase()
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
        if (!$b) $b = {}
        this.AssetSignature = $b.assetSignature
        this.VariantId = $b.variantId
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
        if (!$b) $b = {}
        this.Operation = $b.operation;
        this.Created = $b.created;
        this.ParentRecord = $b.parentRecord
        this.RecordInfo = $b.recordInfo;
        /** @template Enumerable<string> */
        this.RecordInfoOperation = new Enumerable([
            "Upsert",
            "Remove"
        ])
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
        if (!$b) $b = {}
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
        if (!$b) $b = {}
        this.Id = $b.id
        this.PopReceipt = $b.popReceipt
        this.Object = $b.object
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
        if (!$b) $b = {}
        this.Name = $b.name
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
        this.Name = name
        this.PictureURL = url
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
        if (!$b) $b = {}
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
        if (!$b) $b = {}
        this.OwnerId = $b.ownerId
        this.Username = $b.username
        this.Email = $b.email
        this.Password = $b.password;
        this.RecoverCode = $b.recoverCode
        this.SessionToken = $b.sessionCode
        this.SecretMachineId = $b.secretMachineId;
        this.RememberMe = $b.rememberMe
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
        return CryptoHelper.IsValidPassword(this.Password)
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
                return num
            case AccountType.BladeRunner:
                return num * 6;
            case AccountType.Gunter:
                return num * 12
            case AccountType.Neuromancer:
                return num * 24
            case AccountType.Architect:
                return num * 32
            case AccountType.Curator:
                return num * 72
            case AccountType.Level144:
                return num * 144
            case AccountType.Level250:
                return num * 250
            case AccountType.Anorak:
                return num * 500
            default:
                throw new Error("Invalid AccountType: " + type)
        }
    }
    /**
     *
     *
     * @static
     * @param {AccountType} type
     * @returns {number}
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
        if (!$b) $b = {}
        this.Hash = $b.hash
        this.Bytes = $b.bytes
    }
}
class RecordId {
    /**
     *Creates an instance of RecordId.
     * @param {{
     * recordId: string,
     * ownerId: string
     * }} $b
     * @memberof RecordId
     */
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.recordId
        this.OwnerId = $b.ownerId
    }
    GetHashCode() {
        return this.Id.GetHashCode() ^ this.OwnerId.GetHashCode()
    }
    /**
     *
     *
     * @param {RecordId} other
     * @returns {Boolean}
     * @memberof RecordId
     */
    Equals(other) {
        if (this.Id == other.Id)
            return this.OwnerId == other.OwnerId
        return false;
    }
    /**
     *
     *
     * @param {string} ownerId
     * @param {string} recordId
     * @memberof RecordId
     */
    RecordId(ownerId, recordId) {
        this.OwnerId = ownerId
        this.Id = recordId
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
        if (!$b) $b = {}
        this.Id = $b.recordId
        this.OwnerId = $b.ownerId
        this.Name = $b.name
        this.AssetURI = $b.assetUri
        this.ThumbnailURI = $b.thumbnailUri
        this.GlobalVersion = $b.globalVersion
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
        if (!$b) $b = {}
        this.PreprocessId = $b.id
        this.OwnerId = $b.ownerId
        this.RecordId = $b.recordId
        this.State = $b.state
        this.Progress = $b.progress
        this.FailReason = $b.failReason
        this.ResultDiffs = $b.resultDiffs
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
        if (!$b) $b = {}
        this.Exponent = $b.Exponent
        this.Modulus = $b.Modulus
        this.P = $b.P
        this.Q = $b.Q
        this.DP = $b.DP
        this.DQ = $b.DQ
        this.InverseQ = $b.InverseQ
        this.D = $b.D
    }
    /**
     *
     * @static
     * @param {RSAParametersData} rsa
     * @memberof RSAParametersData
     */
    static RSAParametersData(rsa) {
        let rsaParametersData = new RSAParametersData(rsa)
        rsaParametersData.D = rsaParametersData.D
        return rsaParametersData
    }
    /**
     *
     * @static
     * @param {RSAParametersData} data
     * @memberof RSAParametersData
     */
    static RSAParameters(data) {
        return new RSAParametersData(data)
    }
}
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
        if (!$b) $b = {}
        this.LastUpdate = $b.lastUpdate
        this.ResponseTimeMilliseconds = $b.responseTimeMilliseconds
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
        if (!$b) $b = {}
        this.Name = $b.name
        this.Description = $b.description
        this.Tags = $b.tags
        this.SessionId = $b.sessionId
        this.HostUserId = $b.hostUserId
        this.HostMachineId = $b.hostMachineId
        this.HostUsername = $b.hostUsername;
        this.CompatibilityHash = $b.compatibilityHash
        this.NeosVersion = $b.neosVersion
        this.HeadlessHost = $b.headlessHost
        this.LegacySessionURL = $b.url || null //LEGACY
        let SessionURLs = $b.sessionURLs
        if (Type.Get(SessionURLs) == "List")
            this.SessionURLs = SessionURLs
        if (Type.Get(SessionURLs) == "Array")
            this.SessionURLs = SessionURLs.ToList()
        let SessionUsers = $b.sessionUsers
        if (Type.Get(SessionUsers) == "List")
            this.SessionUsers = SessionUsers
        if (Type.Get(SessionUsers) == "Array")
            this.SessionUsers = SessionUsers.ToList()
        this.Thumbnail = $b.thumbnail
        this.JoinedUsers = $b.joinedUsers
        this.ActiveUsers = $b.activeUsers
        this.MaximumUsers = $b.maxUsers
        this.MobileFriendly = $b.mobileFriendly
        this.SessionBeginTime = $b.sessionBeginTime;
        this.LastUpdate = $b.lastUpdate
        this.AwaySince = $b.awaySince
        this.AccessLevel = $b.accessLevel
        this.IsLAN = new Boolean()
    }
    /**
     *
     *
     * @returns {List<Uri>}
     * @memberof SessionInfo
     */
    GetSessionURLs() {
        if (this.SessionURLs != null)
            return this.SessionURLs.filter((str) => { return str }).map(str => new Uri(str)).ToList()
        let uriList = new List()
        if (this.LegacySessionURL != null)
            uriList.Add(new Uri(this.LegacySessionURL));
        return uriList
    }
    /**
     *
     * @readonly
     * @memberof SessionInfo
     */
    get HasEnded() {
        if (this.SessionURLs == null || this.SessionURLs.length == 0)
            return this.LegacySessionURL == null
        return false
    }
    /**
     *
     * @param {SessionInfo} other
     * @returns Boolean
     * @memberof SessionInfo
     */
    IsSame(other) {
        if (!(this.Name == other.Name) || !(this.Description == other.Description) || !(this.Tags.IsSame(other.Tags)) || !(this.SessionId == other.SessionId) || !(this.HostUserId == other.HostUserId) || !(this.HostMachineId == other.HostMachineId) || !(this.HostUsername == other.HostUsername) || !(this.CompatibilityHash == other.CompatibilityHash) || !(this.NeosVersion == other.NeosVersion) || this.HeadlessHost != other.HeadlessHost)
            return false;
            return true
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
        this.HostedSessions = $b.hostedSessions
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
        if (!$b) $b = {}
        this.id = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.Entry = $b.entry || null
        this.ComputeLock = $b.computeLock || null
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
        this.OwnerId = "A-" + value
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
        if (!b) $b = {}
        this.MAX_THUMBNAIL_LIFETIME_MINUTES = 10
        this.Id = $b.id
        this.Key = $b.key || null
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
        if (!$b) $b = {}
        this.Token = $b.token
        this.RecipientId = $b.recipientId
        this.Amount = $b.amount
        this.Comment = $b.comment
        this.TransactionType = $b.transactionType || null
    }
}

class UserPatreonData {
    constructor($b) {
        if (!$b) $b = {}
        this.MIN_WORLD_ACCESS_CENTS = 600
        this.ACTIVATION_LENGTH = 40
        this.Email = $b.email
        this.IsPatreonSupporter = $b.isPatreonSupporter
        this.LastPatreonPledgeCents = $b.lastPatreonPledgeCents
        this.LastTotalCents = $b.lastTotalCents
        this.RewardMultiplier = $b.rewardMultiplier || null
        this.RewardType = $b.rewardType;
        this.CustomTier = $b.customTier;
        /** @deprecated */
        this.LastPlusActivationTime = $b.lastPlusActivationTime || null
        this.LastActivationTime = $b.lastActivationTime
        /** @deprecated */
        this.LastPlusPledgeAmount = $b.lastPlusPledgeAmount || null
        this.LastPaidPledgeAmount = $b.lastPaidPledgeAmount
    }
    /**
     * @deprecated
     * @param {Date} value
     * @memberof UserPatreonData
     */
    set LastPlusActivationTime(value) {
        this.LastActivationTime = value || this.LastActivationTime
    }
    get LastPlusActivationTime() {
        return this.LastActivationTime
    }
    /**
     * @deprecated
     * @memberof UserPatreonData
     */
    set LastPlusPledgeAmount(value) {
        this.LastPaidPledgeAmount = value
    }
    get LastPlusPledgeAmount() {
        return this.LastPaidPledgeAmount
    }
    /**
     * @returns {AccountType}
     * @readonly
     * @memberof UserPatreonData
     */
    get AccountName() {
        if (this.CustomTier != null)
            return this.CustomTier
        return NeosAccount.AccountName(this.CurrentAccountType)
    }
    /**
     * @returns {AccountType}
     * @readonly
     * @memberof UserPatreonData
     */
    get CurrentAccountType() {
        if ((new Date(new Date() - this.LastActivationTime).getSeconds() / (1000 * 3600 * 24)) <= 40.0)
            return UserPatreonData.GetAccountType(this.LastPaidPledgeAmount)
        return AccountType.Normal
    }
    get PledgedAccountType() {
        return UserPatreonData.GetAccountType(this.LastPatreonPledgeCents);
    }
    /**
     *
     * @public
     * @param {number} currentTotalCents
     * @param {Out<Boolean>} extendedPlus
     * @returns
     * @memberof UserPatreonData
     */
    UpdatePatreonStatus(currentTotalCents, extendedPlus) {
        extendedPlus.Out = false;
        let num = currentTotalCents - this.LastTotalCents;
        if (num <= 0) {
            if (this.LastActivationTime.getFullYear() > 2016)
                return false
            num = this.LastPaidPledgeAmount;
        }
        if (num > 0) {
            this.LastActivationTime = new Date()
            this.LastPaidPledgeAmount = num
            extendedPlus.Out = true
        }
        this.LastTotalCents = currentTotalCents
        return true
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
            if (cents >= NeosAccount.MinCents(type))
                return type
        }
        return AccountType.Normal
    }
    get HasPledgesEnoughForPlus() {
        return Math.max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) > NeosAccount.MinCents(AccountType.BladeRunner)
    }
    get HasPledgedEnoughForWorlds() {
        return Math.max(this.LastPatreonPledgeCents, this.LastPaidPledgeAmount) >= 600
    }
}

class UserProfile {
    constructor($b) {
        if (!$b) $b = {}
        this.IconUrl = $b.iconUrl;
        this.BackgroundUrl = $b.backgroundUrl;
        this.TagLine = $b.tagLine;
        this.Description = $b.description;
        this.ProfileWorldUrl = $b.profileWorldUrl;
        this.ShowcaseItems = $b.showcaseItems;
        this.TokenOptOut = $b.tokenOptOut;
    }
    static MAX_SHOWCASE_ITEMS() {
        return 6
    }
    /**
     *
     * @readonly
     * @memberof UserProfile
     */
    get IsValid() {
        let showcaseItems = this.ShowcaseItems
        return ((showcaseItems != null) ? showcaseItems.Count : 0) <= UserProfile.MAX_SHOWCASE_ITEMS
    }
    /**
     *
     *
     * @param {String} token
     * @returns
     * @memberof UserProfile
     */
    AcceptsToken(token) {
        return this.TokenOptOut == null || !this.TokenOptOut.Any(s => s == token)
    }
}
class UserStatus {
    static get STATUS_RESET_SECONDS() {
        return 120
    }
    static get REMOVED_STATUS_KEEP_SECONDS() {
        return 300
    }
    constructor($b) {
        if (!$b) $b = {}
        this.OnlineStatus = $b.onlineStatus
        this.LastStatusChange = $b.lastStatusChange
        this.CurrentSessionId = $b.currentSessionId
        this.CompatibilityHash = $b.compatibilityHash
        this.NeosVersion = $b.neosVersion
        this.PublicRSAKey = $b.publicRSAKey;
        this.ActiveSessions = $b.activeSessions
    }
    /**
     *
     * @returns {SessionInfo}
     * @readonly
     * @memberof UserStatus
     */
    get CurrentSession() {
        let activeSessions = this.ActiveSessions;
        if (activeSessions == null)
            return null
        return activeSessions.find(s => s.SessionId == this.CurrentSessionId)
    }
    /**
     *
     * @returns {Boolean}
     * @param {UserStatus} other
     * @memberof UserStatus
     */
    IsSame(other) {
        if (other == null || this.OnlineStatus != other.OnlineStatus || this.CurrentSessionId != other.currentSessionId)
            return false
        let activeSessions1 = this.ActiveSessions
        let num1 = activeSessions1 != null ? activeSessions1.Count : 0
        let activeSessions2 = this.ActiveSessions
        let num2 = activeSessions2 != null ? activeSessions2.Count : 0
        let activeSessions3 = other.ActiveSessions
        let num3 = activeSessions3 != null ? activeSessions3.Count : 0
        if (num2 != num3)
            return false
        for (let index = 0; index < num1; index++) {
            if (!this.ActiveSessions[index].IsSame(other.ActiveSessions[index]))
                return false
        }
        return true
    }
    SortSessions() {
        if (this.ActiveSessions == null)
            return
        this.ActiveSessions.sort((a, b) => {
            if (a.SessionId == this.CurrentSessionId)
                return -1
            if (b.SessionId == this.CurrentSessionId)
                return 1;
            if (a.AwaySince != null && b.AwaySince != null)
                return a.AwaySince.toLocaleString().localeCompare(b.AwaySince.toLocaleString())
            return a.SessionId.localeCompare(b.SessionId)
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
        if (!$b) $b = {}
        this.OwnerId = $b.ownerId || new String()
        this.AssetHash = $b.assetHash || new String()
        this.Bytes = $b.bytes || new Number()
        this.Free = $b.free || new Boolean()
        this.IsUploaded = $b.isUploaded || new Boolean()
        this.UploaderUserId = $b.uploadUserId || new String()
        this.CountsAgainstMemberQuota = $b.bytes || new Boolean()
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
        if (!$b) $b = {}
        this.Message = $b.Message || new String()
    }
    static ExtractMessage(content) {
        try {
            return content.Message || content
        } catch (err) {
            return content;
        }
    }
}
class CloudVariable {
    constructor($b) {
        if (!$b) $b = {}
        this.VariableOwnerId = $b.ownerId || new String()
        this.Path = $b.path || new String()
        this.Value = $b.value || new String()
    }
    static GetDefinitionPath(path, ownerId, subpath) {
        let length = path.indexOf('.')
        ownerId.Out = path.substring(0, length)
        subpath.Out = path.substring(length + 1)
    }
    GetDefinitionPath(ownerId, subpath) {
        CloudVariable.GetDefinitionPath(this.Path, ownerId, subpath)
    }
}
class CloudVariableDefinition {
    constructor($b) {
        if (!$b) $b = {}
        this.DefinitionOwnerId = $b.definitionOwnerId || new String()
        this.Subpath = $b.subpath || new String()
        this.TypeHint = $b.typeHint || new String()
        this.DefaultValue = $b.defaultvalue || new String()
        this.VariableOwnerCanRead = $b.variableOwnerCanRead || new Boolean()
        this.VariableOwnerCanWrite = $b.variableOwnerCanWrite || new Boolean()
        this.AnyoneCanRead = $b.anyoneCanRead || new Boolean()
        this.AnyoneCanWrite = $b.anyoneCanWrite || new Boolean()
    }
    CanRead(variableOwnerId, readerId) {
        return this.AnyoneCanRead || this.VariableOwnerCanRead && variableOwnerId == readerId || readerId == this.DefinitionOwnerId
    }
    CanWrite(variableOwnerId, writerId) {
        return this.AnyoneCanWrite || this.VariableOwnerCanWrite && variableOwnerId == writerId || writerId == this.DefinitionOwnerId
    }
}
class Friend {
    constructor($b) {
        if (!$b) $b = {}
        this.FriendUserId = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.FriendUsername = $b.friendUsername || new String()
        this.FriendStatus = $b.friendStatus || new Object()
        this.IsAccepted = $b.isAccepted || new Boolean()
        this.UserStatus = $b.userStatus || new Object()
        this.LatestMessageTime = $b.latestMessageTime || new Date()
        this.Profile = $b.profile || new Object()
    }
}
class Group {
    constructor($b) {
        if (!$b) $b = {}
        this.GroupId = $b.id || new String()
        this.AdminUserId = $b.adminUserId || new String()
        this.Name = $b.name || new String()
        this.QuotaBytes = $b.quotaBytes || new Number()
        this.UsedBytes = $b.usedBytes || new Number()
    }
}
class RecordHelper {
    static IsSameVersion(record, other) {
        if (record.LastModifyingMachineId == other.LastModifyingMachineId && record.LastModifyingUserId == other.LastModifyingUserId)
            return record.LocalVersion == other.LocalVersion;
        if (record.LocalVersion == other.LocalVersion && record.GlobalVersion == other.GlobalVersion && record.LastModifyingMachineId == other.LastModifyingMachineId)
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
        return record
    }

    static CanOverwrite(record, oldRecord) {
        if (oldRecord == null)
            return true;
        if (record.LastModifyingMachineId == oldRecord.LastModifyingMachineId && record.LastModifyingUserId == oldRecord.LastModifyingUserId)
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
        return record
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
        return record
    }
}
class Member {
    constructor($b) {
        if (!$b) $b = {}
        this.UserId = $b.id || new String()
        this.GroupId = $b.ownerId || new String()
        this.QuotaBytes = $b.quotaBytes || new Number()
        this.UsedBytes = $b.usedBytes || new Number()
    }
}
class Membership {
    constructor($b) {
        if (!$b) $b = {}
        this.UserId = $b.ownerId || new String()
        this.GroupId = $b.id || new String()
        this.GroupName = $b.groupName || new String()
    }
}
class Message {
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.RecipientId = $b.recipientId || new String()
        this.SenderId = $b.senderId || new String()
        this.MessageType = $b.messageType || new Object()
        this.Content = $b.content || new String()
        this.SendTime = $b.sendTime || new Date()
        this.LastUpdateTime = $b.lastUpdateTime || new Date()
        this.ReadTime = $b.readTime || new Date()
    }
    static GenerateId() {
        return "MSG-" + new uuidv4()
    }
    ExtractContent() {
        return JSON.parse(this.Content)
    }
    SetContent(obj) {
        this.Content = JSON.stringify(obj)
    }
    get IsSent() {
        return this.SenderId == this.OwnerId
    }
    get IsReceived() {
        return this.RecipientId == this.OwnerId
    }
    get IsRead() {
        return (this.ReadTime !== undefined)
    }
}
class NeosSession {
    constructor($b) {
        if (!$b) $b = {}
        this.ReverseTimestamp = $b.reverseTimestamp || new String()
        this.SessionId = $b.sessionId || new String()
        this.NeosVersion = $b.neosVersion || new String()
        this.UserId = $b.userId || new String()
        this.MachineId = $b.machineId || new String()
        this.CountryCode = $b.countryCode || new String()
        this.SystemLocale = $b.systemLocale || new String()
        this.ClientIp = $b.clientIp || new String()
        this.SessionStart = $b.sessionStart || new Date()
        this.SessionEnd = $b.sessionEnd || new Date()
        this.VisitedWorlds = $b.visitedWorlds || new Number()
        this.CreatedWorlds = $b.createdWorlds || new Number()
        this.OperatingSystem = $b.operatingSystem || new String()
        this.HeadDevice = $b.headDevice || new String()
        this.HeadDeviceModel = $b.headDeviceModel || new String()
        this.CPU = $b.cpu || new String()
        this.GPU = $b.gpu || new String()
        this.MemoryBytes = $b.memoryBytes || new Number()
        this.Peripherals = $b.peripherals || new String()
    }
}
class IRecord {
    constructor() {
        this.RecordId = new String()
        this.OwnerId = new String()
        this.URL = new String()
        this.GlobalVersion = new Number()
        this.Localversion = new Number()
        this.LastModifyingUserId = new String()
        this.LastModifyingMachineId = new String()
        this.Name = new String()
        this.OwnerName = new String()
        this.Description = new String()
        this.RecordType = new String()
        this.Tags = new HashSet()
        this.Path = new String()
        this.ThumbnailURI = new String()
        this.IsPublic = new Boolean()
        this.IsForPatreons = new Boolean()
        this.IsListed = new Boolean()
        this.Visits = new Number()
        this.Rating = new Number()
        this.FirstPublishTime = new Date()
        this.CreationTime = new Date()
        this.LastModificationTime = new Date()
        this.NeosDBManifest = new List()
    }
}
class Record extends IRecord {
    constructor($b) {
        if (!$b) $b = {}
        super()
        this.RecordId = $b.id || new String()
        this.OwnerId = $b.ownerId || new String()
        this.AssetURI = $b.assetUri || new String()
        this._URL = new String()
        this.GlobalVersion = $b.globalVersion || new Number()
        this.Localversion = $b.localVersion || new Number()
        this.LastModifyingUserId = $b.lastModifyingUserId || new String()
        this.LastModifyingMachineId = $b.lastModifyingMachineId || new String()
        this.Name = $b.name || new String()
        this.Description = $b.description || undefined
        this.RecordType = $b.recordType || new String()
        this.OwnerName = $b.ownerName || new String()
        this.Tags = ($b.tags ? new HashSet($b.tags) : undefined)
        this.Path = $b.path || new String()
        this.ThumbnailURI = $b.thumbnailUri || new String()
        this.LastModificationTime = $b.lastModificationTime || new Date()
        this.CreationTime = $b.creationTime || new Date()
        this.FirstPublishTime = $b.firstPublishTime || new Date()
        this.IsPublic = $b.isPublic || new Boolean()
        this.IsForPatreons = $b.isForPatreons || new Boolean()
        this.IsListed = $b.isListed || new Boolean()
        this.Visits = $b.visits || new Number()
        this.Rating = $b.rating || new Number()
        this.Submissions = $b.submissions || new List()
        this.Manifest = new List()
        this.NeosDBManifest = $b.neosDbManidest || new List()
    }
    get URL() {
        return RecordHelper.GetUrl(this)
    }
    URL(value) {
        return RecordHelper.SetUrl(this, value)
    }
    static IsValidId(recordId) {
        return recordId.startsWith("R-")
    }
    get IsValidOwnerId() {
        return IdUtil.GetOwnerType(this.OwnerName) != OwnerType.INVALID
    }
    get IsValidRecordId() {
        return RecordUtil.IsValidRecordID(this.RecordId)
    }
    ResetVersioning() {
        this.Localversion = 0;
        this.GlobalVersion = 0;
        this.LastModifyingMachineId = null
        this.LastModifyingMachineId = null
    }
}
class RecordList {
    constructor($b) {
        if (!$b) $b = {}
        this._Id = $b.id
        this.OwnerId = b.ownerId
        this.Name = $b.name
        this.Page = $b.page
        this.Records = $b.records //TYPE Record
    }
    get Id() {
        return this.Name + "-" + this.Page.toString()
    }
}
class SessionUser {
    constructor($b) {
        if (!$b) $b = {}
        this.Username = $b.username
        this.UserID = $b.userID
        this.IsPresent = $b.isPresent
    }
    Equals(other) {
        if (this.Username == other.Username && this.UserID == other.UserID)
            return this.IsPresent == other.IsPresent;
        return false
    }
}
class Submission {
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.id || new String()
        this.GroupId = $b.ownerId || new String()
        this.TargetRecordId = $b.targetRecordId || new RecordId()
        this.SubmissionTime = $b.submissionTime || new Date()
        this.SubmittedById = $b.submittedById || new String()
        this.Featured = $b.featured || new Boolean()
        this.FeaturedByUserId = $b.featuredByUserId || new String()
        this.FeaturedTimestamp = $b.featuredTimestamp || new Date()
    }
}
class User {
    constructor($b) {
        if (!$b) $b = {}
        this.Id = $b.id || new String()
        this.Username = $b.username || new String()
        this.Email = $b.email || undefined
        this.RegistrationDate = $b.registrationDate || new Date()
        this.QuotaBytes = $b.quotaBytes || new Number()
        this.UsedBytes = $b.usedBytes || new Number()
        this.isVerified = $b.isVerified || new Boolean()
        this.AccountBanExpiration = $b.accountBanExpiration || new Date(0)
        this.PublicBanExpiration = $b.publicBanExpiration || new Date(0)
        this.SpectatorBanExpiration = $b.spectatorBanExpiration || new Date(0)
        this.MuteBanExpiration = $b.muteBanExpiration || new Date(0)
        this.Password = $b.password || new String()
        this.RecoverCode = $b.recoverCode || new String()
        this.Tags = new HashSet($b.tags)
        this.PatreonData = new UserPatreonData($b.patreonData) || null
        this.Credits = $b.credits || new Number()
        this.NCRDepositAddress = $b.NCRdepositAddress || new String()
        this.ReferralId = $b.referralId || new String()
        this.ReferrerUserId = $b.referrerUserId || new String()
        this.Profile = $b.profile || new Object()
    }
    get IsAccountBanned() {
        return new Date() < this.AccountBanExpiration
    }
    get IsPublicBanned() {
        return new Date() < this.PublicBanExpiration
    }
    get IsSpectatorBanned() {
        return new Date() < this.SpectatorBanExpiration
    }
    get IsMuteBanned() {
        return new Date() < this.MuteBanExpiration
    }
    get CurrentAccountType() {
        if (this.PatreonData == null) return AccountType.Normal;
        return this.PatreonData.CurrentAccountType
    }
    get AccountName() {
        return this.PatreonData.AccountName || NeosAccount.AccountName(AccountType.Normal)
    }
    get IsPasswordValid() {
        return this.Password != null && this.Password.length >= 8 && true //TODO:Count Check
    }
    get IsUsernameValid() {
        if (this.Username != null)
            return this.Username.length > 0;
        return false
    }
}
class UserSession {
    constructor($b) {
        if (!$b) $b = {}
        this.UserId = $b.userId || new String()
        this.SessionToken = $b.token || new String()
        this.SessionCreated = $b.created || new Date()
        this.SessionExpire = $b.expire || new Date()
        this.SecretMachineId = $b.secretMachineId || new String()
        this.RememberMe = $b.rememberMe || new Boolean()
    }
    get IsExpired() {
        return new Date() > this.SessionExpire
    }
}
class Visit {
    constructor($b) {
        if (!$b) $b = {}
        this.URL = $b.url || new Uri()
        this.UserId = $b.userId || new String()
        this.NeosSessionID = $b.neosSessionID || new String()
        this.RecordVersion = $b.recordVersion || new Number()
        this.Duration = $b.duration || new Number()
        this.Start = $b.start || new Date()
        this.End = $b.end || new Date()
        this.Referal = $b.referal || new String()
    }
    get IsValid() {
        return this.Start.getFullYear() >= 2016 && !(this.Start >= this.End) && ((this.End - this.Start).getSeconds() >= this.Duration && !String.IsNullOrWhiteSpace(this.URL._rawUrl))
    }
}
/**
 *
 * @template T
 * @class CloudResult
 */
class CloudResult {
    /**
     *Creates an instance of CloudResult.
     * @memberof CloudResult
     * @param {{
     * state: HttpStatusCode,
     * content: string
     * }} $b
     */
    constructor(entity, state, content) {
        this.CloudResult(state, content)
    }
    ToString() {
        return ("CloudResult - State: " + this.State + " Content: " + this.Content)
    }
    /**
     * @param {HttpStatusCode} state
     * @param {string} content
     * @returns undefined
     * @memberof CloudResult
     */
    CloudResult(state, content) {
        this.State = state
        this.Content = content
        if (!this.IsError) return;
        if (content == null) return;
        try {
            this.Content = JSON.parse(content).Message
        } catch (error) {
            this.Content = content
        }
    }
    /**
     * Cet the Result Content Entity
     * @readonly
     * @memberof CloudResult
     */
    get Entity() {
        return this.Content
    }
    /**
     * Is Valid?
     *
     * @readonly
     * @memberof CloudResult
     */
    get IsOK() {
        if (this.State != 200) return (this.State == 204);
        return true
    }
    /**
     * Is Invalid?
     *
     * @readonly
     * @memberof CloudResult
     */
    get IsError() {
        return !this.IsOK;
    }
}

class UserTags{
    static get NeosTeam(){
        return 'neos team'
    }
    static get NeosAdmin(){
        return 'neos admin'
    }
    static get NeosModerator(){
        return 'neos moderator'
    }
    static get NeosCommunityManager(){
        return 'neos community manager'
    }
    static get DiagnoseRecordSync(){
        return 'diagnose record sync'
    }
    static get HearingImpaired(){
        return 'hearing impaired'
    }
    static get Potato(){
        return 'potato'
    }
    static get Coffee(){
        return 'coffee'
    }
    static get Java(){
        return 'java'
    }
    static get NCC_Participant(){
        return 'ncc participant'
    }
    static get NCC_Diamond(){
        return 'ncc diamond'
    }
    static get NCC_Gold(){
        return 'ncc gold'
    }
    static get NCC_Silver(){
        return 'ncc silver'
    }
    static  CustomBadge( neosDb,  pointFiltering)
    {
      let str = "custom badge:" + CloudXInterface.NeosDBSignature(neosDb);
      if (pointFiltering)
        str += ".point";
      return str;
    }
     static  GetCustomBadge( badge, pointFiltering)
    {
      if (!badge.startsWith("custom badge:"))
      {
        pointFiltering.Out = false;
        return  null;
      }
      badge = badge.substr("custom badge:".length).trim();
      pointFiltering = badge.includes(".point");
      return new Uri("neosdb:///" + badge.trim());
    }
}



class CloudResultGeneric extends CloudResult {

}
/**
 *
 *
 * @class CloudXInterface
 */
class CloudXInterface {
    /**
     * 
     */
    constructor() {
        this.lockobj = "CloudXLockObj"
        /** @type List<Membership> */
        this._groupMemberships = new List();
        /** @type Dictionary<String, Member> */
        this._groupMemberInfos = new Dictionary();
        /** @type Dictionary<String, Group> */
        this._groups = new Dictionary();
        /** @type Dictionary<Type, Dictionary<Uri, CloudResult>> */
        this.cachedRecords = new Dictionary()
        /** @type UserSession */
        this._currentSession = new UserSession();
        /** @type User */
        this._currentUser;
        /** @type RSACryptoServiceProvider */
        this._cryptoProvider;
        /** @type AuthenticationHeaderValue */
        this._currentAuthenticationHeader;
        /** @type Date */
        this._lastSessionUpdate;
        /** @type Date */
        this.lastServerStatsUpdate;
        /** @type HttpClient */
        this.HttpClient
        /** @type RSAParameters */
        this.PublicKey
        /** @type Number */
        this.ServerResponseTime
        /** @type Date */
        this.LastServerUpdate
        /** @type Date */
        this.lastServerStateFetch
        /** @type FriendManager */
        this.Friends
        /** @type MessageManager */
        this.Messages
        /** @type TransactionManager */
        this.Transactions
        this.SessionChanged
        this.UserUpdated
        this.MembershipsUpdated
        this.GroupUpdated
        this.GroupMemberUpdated
        this.CloudXInterface()
    }

    static CloudEndpoint = new Enumerable([
        "Production",
        "Staging",
        "Local"])

    static DEFAULT_RETRIES = 5;
    static UPLOAD_DEGREE_OF_PARALLELISM = 16;
    static DEBUG_UPLOAD = false;
    static storageUpdateDelays = [1, 5, 15, 30];
    static get JSON_MEDIA_TYPE() {
        return {
            'Content-Type': 'application/json'
        }
    }
    static SESSION_EXTEND_INTERVAL = 3600;
    /** @type Action<string> */
    static ProfilerBeginSampleCallback;
    /** @type Action */
    static ProfilerEndSampleCallback;
    /** @type Func<MemoryStream> */
    static MemoryStreamAllocator;
    static USE_CDN = new Boolean();
    static CLOUDX_PRODUCTION_NEOS_API = "https://cloudx.azurewebsites.net/";
    static CLOUDX_STAGING_NEOS_API = "https://cloudx-staging.azurewebsites.net/";
    static CLOUDX_NEOS_BLOB = "https://cloudxstorage.blob.core.windows.net/";
    static CLOUDX_NEOS_CDN = "https://cloudx.azureedge.net/";
    static LOCAL_NEOS_API = "http://localhost:60612/";
    static LOCAL_NEOS_BLOB = "http://127.0.0.1:10000/devstoreaccount1/";
    ProfilerBeginSample(name) { }
    ProfilerEndSample() { }
    static CLOUD_ENDPOINT = CloudXInterface.CloudEndpoint.Production;
    static get NEOS_API() {
        switch (CloudXInterface.CLOUD_ENDPOINT) {
            case CloudXInterface.CloudEndpoint.Production:
                return "https://cloudx.azurewebsites.net/";
            case CloudXInterface.CloudEndpoint.Staging:
                return "https://cloudx-staging.azurewebsites.net/";
            case CloudXInterface.CloudEndpoint.Local:
                return "https://localhost:60612/";
            default:
                throw new Error("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString())
        }
    }
    static get NEOS_BLOB() {
        switch (CloudXInterface.CLOUD_ENDPOINT) {
            case CloudXInterface.CloudEndpoint.Production:
            case CloudXInterface.CloudEndpoint.Staging:
                return CloudXInterface.NEOS_CLOUD_BLOB
            case CloudXInterface.CloudEndpoint.Local:
                return CloudXInterface.NEOS_CLOUD_BLOB;
            default:
                throw new Error("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString())
        }
    }
    static get NEOS_ASSETS() {
        return CloudXInterface.NEOS_BLOB + "assets/";
    }
    static get NEOS_ASSETS_CDN() {
        return "https://cloudx.azureedge.net/assets/";
    }
    static get NEOS_ASSETS_BLOB() {
        return "https://cloudxstorage.blob.core.windows.net/assets/";
    }
    static get NEOS_THUMBNAILS() {
        return "https://cloudxstorage.blob.core.windows.net/thumbnails/";
    }
    static get NEOS_INSTALL() {
        return "https://cloudx.azureedge.net/install/";
    }
    static get NEOS_CLOUD_BLOB() {
        return !CloudXInterface.USE_CDN ? "https://cloudxstorage.blob.core.windows.net/" : "https://cloudx.azureedge.net/";
    }
    get ServerStatus() {
        if ((new Date() - this.lastServerStateFetch).getSeconds >= 60.0) return ServerStatus.NoInternet
        if ((new Date() - this.LastServerUpdate).getSeconds >= 60.0) return ServerStatus.Down
        return this.ServerResponseTime > 250 ? this.ServerStatus.Slow : this.ServerStatus.Good
    }
    get CurrentUser() {
        return this._currentUser;
    }
    set CurrentUser(value) {
        if (value == this._currentUser) return;
        let user = new User(value);
        this._currentUser = user 
        let userUpdated = this.UserUpdated
        if (userUpdated == null) return;
        userUpdated(this._currentUser)
    }
    get CurrentSession() {
        return this._currentSession
    }
    set CurrentSession(value) {
        if (value == null){
            this._currentSession = new UserSession()
            return
        }
        if (value == this._currentSession) return;
        //LOCK OBJECT
        if (!this._currentSession) this._currentSession = new UserSession()
        if (this._currentSession.SessionToken != value.SessionToken) this._lastSessionUpdate = new Date();
        this._currentSession = value;
        this._currentAuthenticationHeader = value != null ? new AuthenticationHeaderValue('neos', value.UserId + ":" + value.SessionToken).Authorization : (AuthenticationHeaderValue);
        this.OnSessionUpdated()
        try {
            let sessionChanged = this.sessionChanged;
            if (sessionChanged == null) return;
            sessionChanged(this._currentSession);
        } catch (error) {
            Error("Exception in SessionChanged: " + (this.CurrentSession.toString() + error.toString()), true);
        }
    }
    get CurrentUserMemberships() {
        return this._groupMemberships;
    }
    get CurrentUserGroupInfos() {
        return this._groups.map(function (p) {
            return p.Value
        })
    }
    get CurrentUserMemberInfos() {
        return this._groupMemberInfos.map(function (p) {
            return p.Value
        })
    }
    TryGetCurrentUserGroupInfo(groupId) {
        return this._groups.filter(function (item) {
            return (item['groupId'] === groupId)
        })
    }
    TryGetCurrentUserGroupMemberInfo(groupId) {
        return this._groupMemberInfos.filter(function (item) {
            return (item['groupId'] === groupId)
        })
    }
    IsCurrentUserMemberOfGroup(groupId) {
        return this.TryGetCurrentUserGroupMemberInfo != null
    }
    TryGetCurrentUserGroupMembership(groupId) {
        let a = this._groupMemberInfos.indexOf(groupId)
        if (a) { return this._groupMemberInfos[a] }
    }
    OnLogin() { }
    OnLogout() { }
    OnSessionUpdated() { }
    CloudXInterface() {
        this.HttpClient = HTTP_CLIENT
        this.Friends = new FriendManager(this);
        this.Messages = new MessageManager(this);
        this.Transactions = new TransactionManager(this);
    }
    update() {
        Lock.acquire(this.lockobj, () => {
            if (this.CurrentSession != null) {
                if ((new Date() - this._lastSessionUpdate).getSeconds() >= 3600.0) {
                    //Task.Run<CloudResult>(new Func<Task<CloudResult>>(this.ExtendSession)); TODO
                    this._lastSessionUpdate = new Date()
                }
            }
        })
        if ((new Date() - this._lastServerStatsUpdate).getSeconds() >= 10.0) {
            (async () => {
                cloudResult = await this.GetServerStatistics()
                if (cloudResult.IsOK) {
                    this.ServerResponseTime = cloudResult.Entity.ResponseTimeMilliseconds
                    this.LastServerUpdate = cloudResult.Entity.LastUpdate;
                }
                this.lastServerStateFetch = new Date()
            })
            this._lastServerStatsUpdate = new Date()
        }
        this.Friends.Update()
        this.Messages.Update()
    }
    HasPotentialAccess(ownerId) {
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.Machine:
                return true
            case OwnerType.User:
                return ownerId == this.CurrentUser.Id
            case OwnerType.Group:
                let ogreturn
                //TODO Create Object.Any
                Lock.acquire(this.lockobj, () => { ogreturn = this.CurrentUserMemberships.Any(m => m.GroupId == ownerId) })
                return ogreturn
            default:
                return false
        }
    }
    SetMemberships(memberships) {
        Lock.acquire(this.lockobj, () => {
            this._groupMemberships = memberships
            this.RunMembershipsUpdated()
        })
    }
    ClearMemberships() {
        Lock.acquire(this.lockobj, () => {
            if (this._groupMemberships.length == 0) return;
            this._groupMemberships = []
            this.RunMembershipsUpdated()
        })
    }
    async RunMembershipsUpdated() {
        for (groupMembership of this._groupMemberships) {
            await this.UpdateGroupInfo(groupMembership.GroupId)
        }
        let membershipsUpdated = this.MembershipsUpdated
        if (membershipsUpdated == null) return;
        membershipsUpdated(this._groupMemberships)
    }
    static NeosDBToHttp(neosdb, forceCDN = false, forceCloudBlob = false) {
        let str1 = CloudXInterface.NeosDBSignature(neosdb);
        let str2 = CloudXInterface.NeosDBQuery(neosdb)
        let str3 = str1
        if (str2 != null) str3 = str3 + "/" + str2
        if (CloudXInterface.IsLegacyNeosDB(neosdb)) return new Uri("https://neoscloud.blob.core.windows.net/assets/" + str3);
        return new Uri((forceCDN ? CloudXInterface.NEOS_ASSETS_CDN : (forceCloudBlob ? "https://cloudxstorage.blob.core.windows.net/" : CloudXInterface.NEOS_ASSETS)) + str3)
    }
    static FilterNeosURL(assetURL) {
        if (assetURL.Scheme == "neosdb" && assetURL.Segments.length >= 2 && assetURL.Segments.includes('.'))
            return assetURL = new Uri("neosdb:///" + (assetURL.Segments[1].noExtension()) + assetURL.Query);
        return assetURL
    }
    static NeosDBFilename(neosdb) {
        return neosdb.Segments[1] + neosdb.Query
    }
    static NeosDBSignature(neosdb) {
        return neosdb.Segments[1].noExtension()
    }
    static NeosDBQuery(neosdb) {
        if (neosdb.Query == null || neosdb.Query == "")
            return null
        return neosdb.Query.substring(1)
    }
    static NeosThumbnailIdToHttp(id) {
        return new Uri(CloudXInterface.NEOS_THUMBNAILS + id)
    }
    static TryFromString(url) {
        if (url == null) return null;
        if (Uri.IsWellFormedUriString(url, 1)) return new Uri(url)
        return null
    }
    static IsLegacyNeosDB(uri) {
        if (uri.Scheme != "neosdb")
            return false
        return uri.Segments[1].noExtension().length < 30;
    }
    //473
    GET(resource, timeout = null) {
        return this.RunRequest((() => { return this.CreateRequest(resource, HttpMethod.Get) }), timeout)
    }
    POST(resource, entity, timeout = null) {
        return this.RunRequest((() => {
        
            let request = this.CreateRequest(resource, HttpMethod.Post);
            this.AddBody(request, entity)
            return request;
        }), timeout)
    }
    POST_File(resource, filePath, FileMIME = null, progressIndicator = null) {
        return this.RunRequest((() => {
            let request = this.CreateRequest(resource, HttpMethod.Post);
            this.AddFileToRequest(request, filePath, FileMIME, progressIndicator);
            return request
        }), fromMinutes(60.0))
    }
    PUT(resource, entity, timeout = null) {
        return this.RunRequest((() => {
            let request = this.CreateRequest(resource, HttpMethod.Put)
            this.AddBody(request, entity)
            return request
        }), timeout)
    }
    PATCH(resource, entity, timeout = null) {
        return this.RunRequest((() => {
            let request = this.CreateRequest(resource, HttpMethod.Patch)
            this.AddBody(request, entity)
            console.log(request)
            return request
        }), timeout)
    }
    DELETE(resource, timeout = null) {
        return this.RunRequest((() => { return this.CreateRequest(resource, HttpMethod.Delete) }), timeout);

    }

    /**
     *
     *
     * @param {HttpRequestMessage} request
     * @param {string} filePath
     * @param {string} [mime=null]
     * @param {IProgressIndicator} [progressIndicator=null]
     * @memberof CloudXInterface
     */
    AddFileToRequest(request, filePath, mime = null, progressIndicator = null) {
        //FILESTREAM
        /* 
         FileStream fileStream = System.IO.File.OpenRead(filePath);
         StreamProgressWrapper streamProgressWrapper = new StreamProgressWrapper((Stream) fileStream, progressIndicator, (Action<Stream, IProgressIndicator>) null, new long?());
         MultipartFormDataContent multipartFormDataContent = new MultipartFormDataContent();
         StreamContent streamContent = new StreamContent((Stream) streamProgressWrapper, 32768);
         if (mime != null)
             streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse(mime);
         streamContent.Headers.ContentLength = new long?(fileStream.Length);
         multipartFormDataContent.Add((HttpContent) streamContent, "file", Path.GetFileName(filePath));
         request.Content = (HttpContent) multipartFormDataContent;
         */
    }

    /**
     * 
     * @param {string} resource 
     * @param {HttpMethod} method 
     * @returns {HttpRequestMessage}
     */
    CreateRequest(resource, method) {
        let request = new HttpRequestMessage(method, CloudXInterface.NEOS_API + resource)
        if (this.CurrentSession != null)
            request.Headers.Authorization = this._currentAuthenticationHeader;
        return request
    }
    /**
     *
     *
     * @param {HttpResponseMessage} message
     * @param {*} entity
     * @memberof CloudXInterface
     */
    AddBody(message, entity) {
        message.Headers['Content-Type'] = CloudXInterface.JSON_MEDIA_TYPE['Content-Type']
        if (entity)
        message.Content = JSON.stringify(entity)

    }

    /**
     *
     *
     * @param {Func<HttpRequestMessage>} requestSource
     * @param {TimeSpan} timeout
     * @returns {Promise<CloudResult>}
     * @memberof CloudXInterface
     */
    async RunRequest(requestSource, timeout) {
        /** @type {HttpRequestMessage} request */
        let request = null
        /** @type {HttpResponseMessage} */
        let result = null
        let exception = null
        let remainingRetries = CloudXInterface.DEFAULT_RETRIES
        let delay = 0
        do {

            request = requestSource();
            let cancellationToken = new CancellationTokenSource(timeout ? timeout : fromSeconds(30.0));
            result = await HTTP_CLIENT.SendAsync(request, cancellationToken.Token)
            if (result == null) {
                console.error(`Exception running `)
                request = null
                await Delay(new TimeSpan(delay))
                delay += 250
            }
            return result //BYPASS
        }
        while (result == null && remainingRetries-- > 0)
        if (result == null) {
            if (exception == null)
                throw new Error("Failed to get response. Exception is null")
            throw new Error(exception)
        }
        let entity
        let content = null
        if (result.IsSuccessStatusCode) {
            if (typeof result.Content == "string") {
                content = await result.Content.toString()
                entity = content
            } else {
                try {
                    let contentLength = result.Content.Headers.ContentLength
                    let num = 0
                    if (contentLength > num && (contentLength != null)) {
                        let responseStream = await result.Content.toString()
                        entity = await JSON.parse(responseStream)
                    }
                }
                catch (error) {
                    console.log('Exception deserializing ')
                }
                finally {

                }

            }
        }
        else {
            content = await result.Content
            return new CloudResult(entity, result.StatusCode, content)

        }

    }
    /**
     * 
     * @param {string} credential 
     * @param {string} password 
     * @param {string} sessionToken 
     * @param {string} secretMachineId 
     * @param {Boolean} rememberMe 
     * @param {string} reciverCode 
     * @returns {Promise<CloudResult<UserSession>>>}
     */
    async Login(credential, password, sessionToken, secretMachineId, rememberMe, recoverCode) {
        this.Logout(false);
        let credentials = new LoginCredentials()
        credentials.password = password
        credentials.recoverCode = recoverCode
        credentials.sessionToken = sessionToken
        credentials.secretMachineId = secretMachineId
        credentials.rememberMe = rememberMe
        if (credential.startsWith('U-'))
            credentials.ownerId = credential
        else if (credential.includes('@'))
            credentials.email = credential
        else
            credentials.username = credential
        var result = await this.POST("api/userSessions", credentials, new TimeSpan())
        if (result.IsOK) {
            this.CurrentSession = new UserSession(result.Content)
            this.CurrentUser = new User()
            this.CurrentUser.Id = this.CurrentSession.UserId
            this.CurrentUser.Username = credentials.Username
            this.UpdateCurrentUserInfo()
            this.UpdateCurrentUserMemberships()
            this.Friends.Update()
            this.onLogin()
        }
        else throw new Error("Error loging in: " + result.State + "\n" + result.Content)
        return result
    }
    onLogin(){}
    async ExtendSession() {
        return await this.PATCH("api/userSessions", null, new TimeSpan())
    }

    /**
     *
     *
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise<CloudResult<User>>}
     * @memberof CloudXInterface
     */
    async Register(username, email, password) {
        this.Logout(false)
        let u = new User()
        u.Username = username
        u.Email = email
        u.Password = password
        return await this.POST("/api/users", u, new TimeSpan())
    }
    /**
     *
     *
     * @param {*} email
     * @returns {Promise<CloudResult>}
     * @memberof CloudXInterface
     */
    async RequestRecoveryCode(email) {
        return await this.POST("/api/users/requestlostpassword",  new User({username:username, email:email, password:password}), new TimeSpan())
    }
    async UpdateCurrentUserInfo() {
        switch (this.CurrentUser.Id) {
            case null:
                throw new Error("No current user!")
            default:
                let user = await this.GetUser(this.CurrentUser.Id);
                let entity = user.Entity
                if (user.IsOK && this.CurrentUser != null && this.CurrentUser.Id == entity.id) {
                    this.CurrentUser = entity
                    let patreonData = this.CurrentUser.PatreonData;
                    let num = new Number()
                    if ((patreonData != null ? (patreonData.IsPatreonSupporter ? 1 : 0) : 0) == 0) {
                        let tags = this.CurrentUser.Tags
                        num = tags != null ? (tags.includes(UserTags.NeosTeam) ? 1 : 0) : 0;
                    }
                    else
                        num = 1
                    CloudXInterface.USE_CDN = num != 0
                }
                return user
        }
    }
    async GetUser(userId) {
        return await this.GET("api/users/" + userId, new TimeSpan())
    }
    async GetUserByName(username) {
        return await this.GET("api/users/" + username + "?byUsername=true", new TimeSpan())
    }
    async GetUsers(searchName) {
        return await this.GET("api/users?name=" + Uri.ExcapeDataString(searchName), new TimeSpan())
    }
    async GetUserCached(userId) {
        return await this.GetUser(userId)
    }
    Logout(manualLogOut) {
        this.OnLogout()
        if (this.CurrentSession != null && !this.CurrentSession.RememberMe | manualLogOut) {
            let _userId = this.CurrentSession.UserId
            let _sessionToken = this.CurrentSession.SessionToken
                (async () => await this.DELETE("api/userSessions/" + _userId + "/" + _sessionToken, new TimeSpan()))
        }
        this._cryptoProvider = null
        this.PublicKey // TODO RSAParameters
        this.CurrentSession = null
        this.CurrentUser = null
        this.ClearMemberships()
        this.Friends = new FriendManager(this)
        CloudXInterface.USE_CDN = false
    }
    SignHash(hash) {
        return this._cryptoProvider //TODO Cryptography
    }
    async FetchRecordCached(recordUri) {
        Lock.acquire(this.cachedRecords, () => {
            let dictionary = []
            //TODO Wtf is this lol
        })
    }
    FetchRecordIRecord(recordUri) {
        var ownerId = []
        var recordId = []
        if (RecordUtil.ExtractRecordID(recordUri, ownerId, recordId))
            return this.FetchRecord(ownerId.Value, recordId.Value)
        var recordPath = []
        if (RecordUtil.ExtractRecordPath(recordUri, ownerId, recordPath))
            return this.FetchRecordAtPath(ownerId.Value, recordPath.Value)
        throw new Error("Uri is not a record URI")
    }
    FetchRecord(ownerId, recordId) {
        if (!recordId) return this.FetchRecordIRecord(ownerId); // iRecord fetch
        return this.GET("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/records/" + recordId, new TimeSpan())
    }
    FetchRecordAtPath(ownerId, path) {
        return this.GET("api/" + CloudXInterface.GetOwnerPath(ownerId) + "/" + ownerId + "/records/root/" + path, new TimeSpan())
    }
    GetRecords(ownerId, tag = null, path = null) {
        let ownerPath = CloudXInterface.GetOwnerPath(ownerId);
        let str = ""
        if (tag != null)
            str = "?tag=" + Uri.EscapeDataString(tag);
        if (path != null)
            str = "?path=" + Uri.EscapeDataString(path)
        return this.GET("api/" + ownerPath + "/" + ownerId + "/records" + str)
    }
    FindRecords(search) {
        return this.POST("/api/records/search", search, new TimeSpan())
    }
    UpsertRecord(record) {
        let resource;
        switch (IdUtil.GetOwnerType(record.OwnerId)) {
            case OwnerType.User:
                resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId;
                break
            case OwnerType.Group:
                resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId;
                break
            default:
                throw new Error("Invalid record owner")
        }
        return this.PUT(resource, record, new TimeSpan())
    }
    PreprocessRecord(record) {
        let resource;
        switch (IdUtil.GetOwnerType(record.OwnerId)) {
            case OwnerType.User:
                resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess";
                break
            case OwnerType.Group:
                resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess";
                break
            default:
                throw new Error("Invalid record owner")
        }
        return this.POST(resource, record, new TimeSpan())
    }
    GetPreprocessStatus(ownerId, recordId, id) {
        if (!recordId) {
            recordId = ownerId.RecordId
            id = ownerId.PreprocessId
            ownerId = ownerId.OwnerId
        }
        let resource;
        switch (IdUtil.GetOwnerType(record.OwnerId)) {
            case OwnerType.User:
                resource = "api/users/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess/" + id;
                break
            case OwnerType.Group:
                resource = "api/groups/" + record.OwnerId + "/records/" + record.RecordId + "/preprocess/" + id;
                break
            default:
                throw new Error("Invalid record owner")
        }
        return this.GET(resource, record, new TimeSpan())
    }
    async DeleteRecord(ownerId, recordId) {
        if (!recordId) {
            recordid = ownerId.RecordId
            ownerId = ownerId.OwnerId
        }
        let result = await this.DELETE("api/users/" + ownerId + "/records/" + recordId, new TimeSpan())
        await this.UpdateStorage(ownerId)
        return result
    }
    AddTag(ownerId, recordId, tag) {
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.User:
                return this.PUT("api/users/" + ownerId + "/records/" + recordId + "/tags", tag, new TimeSpan());
            case OwnerType.Group:
                return this.PUT("api/groups/" + ownerId + "/records/" + recordId + "/tags", tag, new TimeSpan());
            default:
                throw new Error("Invalid record owner")
        }
    }
    async UpdateStorage(ownerId) {
        if (this.CurrentUser == null) return
        let ownerType = IdUtil.GetOwnerType(ownerId);
        let _signedUserId = this.CurrentUser.Id;
        let numArray = CloudXInterface.storageUpdateDelays;
        for (index = 0; index < numArray.length; index++) {
            await Delay(fromSeconds(numArray[index]))
            if (this.CurrentUser.Id != _signedUserId) return;
            if (ownerType == OwnerType.User) {
                cloudResult = await this.UpdateCurrentUserInfo()
            }
            else {
                await this.UpdateGroupInfo(ownerId)
            }
        }
        numArray = null
    }
    async FetchGlobalAssetInfo(hash) {
        return await this.GET("api/assets/" + hash.toLowerCase(), new TimeSpan())
    }
    async FetchUserAssetInfo(hash) {
        return await this.FetchUserAssetInfo(this.CurrentUser.Id, hash)
    }
    async FetchAssetInfo(ownerId, hash) {
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.User:
                return await this.GET("api/users/" + ownerId + "/assets/" + hash, new TimeSpan())
            case OwnerType.Group:
                return await this.GET("api/groups/" + ownerId + "/assets/" + hash, new TimeSpan())
            default:
                throw new Error("Invalid ownerId")
        }
    }
    async RegisterAssetInfo(assetInfo) {
        switch (IdUtil.GetOwnerType(assetInfo.OwnerId)) {
            case OwnerType.User:
                return await this.PUT("api/users/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash, assetInfo, new TimeSpan())
            case OwnerType.Group:
                return await this.PUT("api/groups/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash, assetInfo, new TimeSpan())
            default:
                throw new Error("Invalid ownerId")
        }
    }
    GetAssetBaseURL(ownerId, hash, variant) {
        hash = hash.toLowerCase()
        let str = hash
        if (variant != null)
            str += ("&" + variant)
        switch (IdUtil.GetOwnerType(ownerId)) {
            case OwnerType.User:
                return "api/users/" + ownerId + "/assets/" + str
            case OwnerType.Group:
                return "api/groups/" + ownerId + "/assets/" + str
            default:
                throw new Error("Invalid ownerId")
        }
    }
    async UploadAsset(ownerId, signature, variant, assetPath, retries = 5, progressIndicator = null) {
        let cloudResult = await this.BeginUploadAsset(ownerId, signature, variant, assetPath, retries, progressIndicator, new Number())
        if (!cloudResult.isOK) return cloudResult
        return await this.WaitForAssetFinishProcessing(cloudResult.Entity)
    }
    EnqueueChunk(baseUrl, fileName, buffer, processingBuffers) {
        buffer.task = this.RunRequest((() => { })) //TODO Wtf is this
    }
    async TakeFinishedBuffer(buffers) {
        //TODO TakeFinishedBuffer
    }
    async BeginUploadAsset(ownerId, signature, variant, assetPath, retries = 5, progressIndicator = null, bytes = null) {
        let fileName = Path.GetFileName(assetPath)
        //TODO finish
    }
    async WaitForAssetFinishProcessing(assetUpload) {
        let baseUrl = this.GetAssetBaseURL(assetUpload.OwnerId, assetUpload.Signature, assetUpload.Variant) + "/chunks"
        let cloudResult
        while (true) {
            cloudResult = await this.GET(baseUrl, new TimeSpan())
            if (!cloudResult.IsError && (cloudResult.Entity.UploadState != UploadState.Uploaded && cloudResult.Entity.UploadState != UploadState.Failed))
                await Delay(new TimeSpan(250))
            else
                break;
        }
        return cloudResult
    }
    UploadThumbnail(path) {
        return this.POST_File("api/thumbnails", path, "image/webp", null)
    }
    ExtendThumbnailLifetime(thumbnail) {
        return this.PATCH("api/thumbnails", thumbnail, new TimeSpan())
    }
    DeleteThumbnail(thumbnail) {
        return this.DELETE("api/thumbnails/" + thumbnail.Id + "/" + thumbnail.Key, new TimeSpan())
    }
    async GetGroup(groupId) {
        return await this.GET("api/groups/" + groupId, new TimeSpan())
    }
    async GetGroupCaches(groupId) {
        return await this.GetGroup(groupId)
    }
    async CreateGroup(group) {
        return await this.POST("api/groups", group, new TimeSpan())
    }
    async AddGroupMember(member) {
        return await this.POST("api/groups/" + member.GroupId + "/members", member, new TimeSpan())
    }
    async DeleteGroupMember(member) {
        return await this.DELETE("api/groups/" + member.GroupId + "/members/" + member.UserId, new TimeSpan())
    }
    async GetGroupMember(groupId, userId) {
        return await this.GET("api/groups/" + groupId + "/members/" + userId, new TimeSpan())
    }
    async GetGroupMembers(groupId) {
        return await this.GET("api/groups/" + groupId + "/members", new TimeSpan())
    }
    async UpdateCurrentUserMemberships() {
        let groupMemberships = await this.GetUserGroupMemberships();
        if (groupMemberships.isOK)
            this.SetMemberships(groupMemberships.Entity)
        return groupMemberships
    }
    async GetUserGroupMemberships(userId) {
        if (!userId)
            return await this.GetUserGroupMemberships(this.CurrentUser.Id);
        return await this.GET("api/users/" + userId + "/memberships", new TimeSpan())
    }
    /**
     *
     * @returns {Task}
     * @param {string} groupId
     * @memberof CloudXInterface
     */
    async UpdateGroupInfo(groupId) {
        /** @type {Task<CloudResult<Group>>>} */
        let group = this.GetGroup(groupId)
        /** @type {Task<CloudResult<Member>>>} */
        let memberTask = this.GetGroupMember(groupId, this.CurrentUser.Id)
        /** @type {CloudResult<Group>>} */
        let groupResult = await group
        /** @type {CloudResult<Member>>} */
        let cloudResult = await memberTask
        Lock.acquire(this.lockobj, () => {
            if (groupResult.IsOK) {
                this._groups.Remove(groupId)
                this._groups.Add(groupId, new Group(groupResult.Entity))
                let groupUpdated = this.GroupUpdated
                if (groupUpdated != null)
                    groupUpdated(groupResult.Entity)
            }
            if (!cloudResult.IsOK)
                return;
            this._groupMemberInfos.Remove(groupId)
            this._groupMemberInfos.Add(groupId, new Member(cloudResult.Entity));
            let groupMemberUpdated = this.GroupMemberUpdated
            if (groupMemberUpdated == null)
                return
            groupMemberUpdated(cloudResult.Entity)
        })
    }
}
class CancellationTokenSource {
    constructor(timeout) {
        this.Token = new uuidv4()
    }
}

class Endpoints {
    static CLOUDX_NEOS_API = "https://cloudx.azurewebsites.net";
    static CLOUDX_NEOS_BLOB = "https://cloudxstorage.blob.core.windows.net/assets/";
    static CLOUDX_NEOS_THUMBNAILS = "https://cloudxstorage.blob.core.windows.net/thumbnails/";
}
class FriendManager {
    static UPDATE_PERIOD_SECONDS = 5
    constructor(cloud) {
        this.Cloud = cloud
        /** @type Dictionary<string, Friend> */
        this.friends = new Dictionary()
        /** @type Dictionary<string, SessionInfo> */
        this._friendSessions = new Dictionary()
        this._lock = new Object()
        /** @type Date */
        this.lastStatusUpdate = null
        /** @type Date */
        this.lastRequest = null
        /** @type boolean */
        this._friendsChanged
        /** @type CloudXInterface */
        this.Cloud
        /** @type Number */
        this.FriendRequestCount
    }

    /**
     *
     *
     * @param {CloudXInterface} cloud
     * @memberof FriendManager
     */
    FriendManager(cloud) {
        this.Cloud = cloud
    }
    /**
     *
     * @returns {Boolean}
     * @readonly
     * @memberof FriendManager
     */
    get FriendCount() {
        return this.friends.Count
    }
    /**
     *
     *
     * @param {List<Friend>} list
     * @memberof FriendManager
     */
    GetFriends(list) {
        for (let friend of this.friends) {
            list.push(friend.Value)
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
            action(friend.Value)
        }
    }
    /**
     *
     *
     * @param {List<SessionInfo>} sessions
     * @returns
     * @memberof FriendManager
     */
    GetFriendSessions(sessions) {
        for (let friendSession of this._friendSessions) {
            sessions.Add(friendSession.Value)
        }
        return this._friendSessions.Count
    }
    ForeachFriendSession(action) {
        for (let friendSession of this._friendSessions) {
            action(friendSession.Value)
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
        Lock.acquire(this._lock, () => {
            let friend = new Out()
            if (this.friends.TryGetValue(friendId, friend))
                return friend.Out
            return null
        })
    }
    FindFriend(predicate) {
        Lock.acquire(this._lock, () => {
            for (let friend of this.friends) {
                if (predicate(friend.Value))
                    return friend.Value
            }
        })
        return null
    }
    IsFriend(userId) {
        Lock.acquire(this._lock, () => {
            let friend = new Out()
            if (this.friends.TryGetValue(userId, friend))
                return friend.Out.FriendStatus == FriendStatus.Accepted;
            return false
        })
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
                this.AddFriend(new Friend({ 'friendUserId': friend, 'friendUsername': friend.Substr(2), 'friendStatus': FriendStatus.Accepted }))
                break;
            case "Friend":
                friend.OwnerId = this.Cloud.CurrentUser.Id;
                friend.FriendStatus = FriendStatus.Accepted;
                this.Cloud.UpsertFriend(friend);
                Lock.acquire(this._lock, () => {
                    this.AddedOrUpdated(friend)
                })
                break;
        }
    }
    RemoveFriend(friend) {
        friend.OwnerId = this.Cloud.CurrentUser.Id
        friend.FriendStatus = FriendStatus.Ignored;
        this.Cloud.DeleteFriend(friend)
        Lock.acquire(this._lock, () => {
            this.Removed(friend)
        })
    }
    Update(){}
    //TODO Friend Manager
}


class MessageManager {
    constructor(cloud) {
        this._messagesLock = "MessageManager._messagesLock"
        this._messages = new List()
        this.lastRequest
        this.lastUnreadMessage
        this._unreadCountDirty = new Boolean()
        this._waitingForRequest = new Boolean()
        this.Cloud = cloud
        this.InitialmessagesFetched = new Boolean()
        this.UnreadCount = new Number()
    }
    static UPDATE_PERIOD_SECONDS = 1;
    static UPDATE_TIMEOUT_SECONDS = 10

    static get MAX_READ_HISTORY() {
        return 100;
    }
    static get MAX_UNREAD_HISTORY() {
        return 500;
    }
    MessageManager(cloud) {
        this.Cloud = cloud
    }

    Update() {
        if (this.Cloud.CurrentUser == null) {
            return
        }
        if (this._unreadCountDirty) {
            this._unreadCountDirty = false
            Lock.acquire(this._messagesLock, () => {
                this.UnreadCount = this._messages.length
                messageCountChanged = this.UnreadMessageCountChanged
                if (messageCountChanged != null) {
                    messageCountChanged(this.UnreadCount)
                }
            })
        }
        if ((new Date() - this.lastRequest).getSeconds() < (this._waitingForRequest ? MessageManager.UPDATE_TIMEOUT_SECONDS : MessageManager.UPDATE_PERIOD_SECONDS)) {
            return;
        }
        this.lastRequest = new Date()
        this._waitingForRequest = true(async () => {
            let cloudResult1 = await this.Cloud.GetUnreadMessages(this.lastUnreadMessage)
            this._waitingForRequest = false
            if (!cloudResult1.IsOK) {
                return
            }
            var hashSet = [] // HashSet need to create
            Lock.acquire(this._messagesLock, () => {
                for (message of cloudResult1.Entity) {
                    if (this.GetUserMessages(message.SenderId).AddMessage(message))
                        hashSet.push(message);
                }
            })
            let flag1 = false
            for (message of cloudResult1.Entity) {
                if (!hashSet.includes(message)) {
                    if (this.InitialmessagesFetched && message.MessageType == MessageType.CreditTransfer) {
                        let content = message.ExtractContent()
                        let flag2 = content.RecipientId == this.Cloud.CurrentUser.Id
                        let currentUser = this.Cloud.CurrentUser
                        if (currentUser.Credits != null && currentUser.Credits.CONTAINSKEY(content.Token)) { //TODO: Create Function CONTAINSKEY
                            currentUser.Credits[content.Token] += flag2 ? content.Amount : -content.Amount;
                        }
                        flag1 = true;
                    }
                    let onMessageReceived = this.onMessageReceived
                    if (onMessageReceived != null) onMessageReceived(message);
                    let friend = this.Cloud.Friends.GetFriend(message.SenderId);
                    if (friend != null) friend.LatestMessageTime = Math.max(new Date(), message.SendTime);
                }
            }
            //TODO: POOL RETURN
            this.MarkUnreadCountDirty()
            this.InitialmessagesFetched = true;
            if (!flag1) return;
            await setTimeout(() => {
                cloudResult2 = this.Cloud.UpdateCurrentUserInfo()
            }, 10000)
        })

    }
    MarkUnreadCountDirty() {
        this._unreadCountDirty = true;
    }
    Reset() {
        Lock.acquire(this._messagesLock, () => {
            this._messages = new Array()
            this.lastUnreadMessage = new Date()
            this.InitialmessagesFetched = false;
        })
    }
    GetUserMessages(userId) {
        Lock.acquire(this._messagesLock, () => {
            if (this._messages.indexOf(userId))
                return this._messages[userId]
            let usermessages2 = new MessageManager.UserMessages(userId, this)
            this._messages.push({ userId: usermessages2 })
            return usermessages2
        })
    }
    GetAllUserMessages(list) {
        Lock.acquire(this._messagesLock, () => {
            for (message of this._messages) {
                list.push(message.Value)
            }
        })
    }
    //event OnMessageReceived
    //event UnreadMessageCounrChange
    static UserMessages = class {
        constructor() {
            this._messageIds = new List()
            this._lock = "MessageManager.UserMessages._lock"
            this._historyLoadTask;
            this._historyLoaded = new Boolean()
            this.UserId = new String()
            this.UnreadCount = new Number()
            this.Messages = new Array()
        }
        get CloudXInterface() {
            return this.Manager.Cloud
        }
        UserMessages(userId, manager) {
            this.UserId = userId
            this.Manager = manager
        }
        MarkAllRead() {
            let ids = null
            Lock.acquire(this._lock, () => {
                if (this.UnreadCount == 0) return;
                ids = new Array()
                for (message of this.Messages) {
                    if (!message.IsSent && !(message.ReadTime != undefined)) {
                        message.ReadTime = new Date()
                        ids.push(message.Id)
                    }
                }
                this.UnreadCount = 0;
            })
                (async () => { await this.Cloud.MarkMessagesRead(ids) })
            this.Manager.MarkUnreadCountDirty()
        }
        CreateTextMessage(text) {
            let message = new Message()
            message.MessageType = MessageType.Text
            message.Content = text
            return message
        }
        CreateInviteMessage(sessionInfo) {
            let message = new Message()
            message.Id = Message.GenerateId()
            message.SendTime = new Date()
            message.MessageType = MessageType.SessionInvite;
            message.SetContent(sessionInfo)
            return message
        }
        async SendInviteMessage(sessionInfo) {
            return await this.SendMessage(this.CreateInviteMessage(sessionInfo));
        }
        AddSentTransactionMessage(token, amount, comment) {
            let message = new Message()
            message.Id = Message.GenerateId();
            message.OwnerId = this.Cloud.CurrentUser.Id;
            message.RecipientId = this.UserId
            message.SenderId = message.OwnerId
            message.SendTime = new Date()
            message.MessageType = MessageType.CreditTransfer
            let _transaction = new TransactionMessage()
            _transaction.Token = token
            _transaction.Amount = amount
            _transaction.Comment = comment
            _transaction.RecipientId = this.UserId
            message.SetContent(_transaction)
            Lock.acquire(this._lock, () => {
                this.Messages.push(message)
            })
            return message
        }
        async SendMessage(message) {
            if (message.Id == null) message.Id = Message.GenerateId()
            message.RecipientId = this.UserId
            message.SenderId = this.Cloud.CurrentUser.Id
            message.OwnerId = message.SenderId
            message.SendTime = new Date()
            Lock.acquire(this._lock, () => {
                this.Messages.push(message)
            })
            let friend = this.Cloud.Friends.GetFriend(message.RecipientId)
            if (friend != null) friend.LatestMessageTime = new Date()
            return await this.Cloud.SendMessage(message)
        }
        async SendTextMessage(text) {
            return await this.SendMessage(this.CreateTextMessage(text))
        }
        async EnsureHistory() {
            if (this._historyLoaded) return;
            let isFirstRequest = false
            Lock.acquire(this._lock, () => {
                if (this._historyLoaded) return;
                if (this._historyLoadTask == null) {
                    isFirstRequest = true
                    this._historyLoadTask = this.Cloud.GetMessageHistory(this.UserId, MessageManager.MAX_READ_HISTORY)

                }
            })
            let cloudResult = await this._historyLoadTask
            if (!isFirstRequest) return;
            if (!cloudResult.IsOK) {
                this._historyLoadTask = null
            } else {
                Lock.acquire(this._lock, () => {
                    this.Messages = cloudResult.Entity
                    this.Messages.reverse()
                    this.UnreadCount = this.Messages.filter(m => !m.ReadTime != undefined).length
                    this._historyLoaded = true
                })
            }
        }
        AddMessage(message) {
            Lock.acquire(this._lock, () => {
                if (this._messageIds.includes(message.Id)) return false;
                this.Messages.Add(message)
                this._messageIds.Add(message.Id)
                if (message.IsReceived && !message.ReadTime != undefined)++this.UnreadCount
                while (this.Messages.length > MessageManager.MAX_UNREAD_HISTORY || this.Messages.length > MessageManager.MAX_UNREAD_HISTORY && (this.Messages[0].IsSent || this.Messages[0].ReadTime != undefined)) {
                    this._messageIds.Remove(this.Messages[0].Id)
                    this.Messages.RemoveAt(0)
                }
                return true
            })
            return true
        }
        GetMessages(messages) {
            messages.AddRange(this.Messages);
        }
    }
}
class TransactionUtil {
    static NCR_CONVERSION_VARIABLE = "NCR_CONVERSION"
}
class StringNumberConversion {
    static DecimalToBigInt(value) { }
    static BigIntToDecimal(value) { }
}
class TransactionManager {
    constructor(cloud) {
        this.Cloud = cloud
        this.NCRConversionRatio
    }
    TransactionManager(cloud) {
        this.Cloud = cloud
            (async () => { await this.LoadConversionData() })
    }
    async LoadConversionData() {
        let cloudResult = await this.Cloud.ReadGlobalVariable(TransactionUtil.NCR_CONVERSION_VARIABLE)
        if (cloudResult.IsOK) {
            this.NCRConversionRatio = BigInt(StringNumberConversion.DecimalToBigInt(cloudResult.Entity));
        } else {
            console.error("Error getting conversion ratio. " + cloudResult.State.ToString() + "\n\n" + cloudResult.Content);
        }
    }
    TryConvert(sourceToken, sourceAmount, targetToken) {
        if (sourceToken == "USD") {
            if (targetToken == null || !(targetToken == "NCR")) return new Number()
            let num = sourceAmount;
            let ncrConversionRatio = this.NCRConversionRatio
            if (!ncrConversionRatio != undefined) return new Number()
            return new BigInt(num / ncrConversionRatio)
        }
        if (!(targetToken == "USD")) return new Number()
    }
    //TODO Rest of Thing, Will Break
}
class CryptoHelper{}
class ComputationLock {}
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
    CloudXInterface
}
const Util = {
    Type,
    List,
    Dictionary,
    Enumerable,
    HashSet
}
/**
 * @namespace CloudX
 */
const CloudX = { Shared, Util }
module.exports = {
    CloudX
}