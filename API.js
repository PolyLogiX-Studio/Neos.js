const uuidv4 = require('uuid/v4')
const fetch = require('node-fetch')
const AsyncLock = require('async-lock')
const Lock = new AsyncLock()
const URI = require('uri-js')
const { TimeSpan, parse, parseDate, fromSeconds } = require('timespan')
class HTTP_CLIENT {
    static async SendAsync(request, token) {
        let state
        let response = await fetch(request.RequestUri, { method: request.Method }).then(res => {
            state = res.status
            return res.json()
        })
        let cloudResult = new CloudResult()
        cloudResult.CloudResult(state, response)
        return cloudResult
    }
}
const HttpMethod = {
    "Get": "GET",
    "Put": "PUT",
    "Delete": "DELETE",
    "Post": "POST",
    "Patch": "PATCH"
}
function Delay(timespan) {
    return new Promise(resolve => setTimeout(resolve, timespan.msecs));
}
class Uri {
    constructor(url) {
        this._rawUrl = url
        this._raw = URI.parse(url)
        let path = (this._raw.path.split('/'))
        this.Segments = new Array()
        path.forEach((value, index) => {
            this.Segments.push((index < path.length - 1) ? value + "/" : value)
        })
    }
    get Scheme() {
        return this._raw.schema
    }
    static EscapeDataString(dat) {
        return encodeURI(dat)
    }
}
class Path {

}
class List extends Array {
    constructor(props) {
        if (!props) return super()
        super(props)
    }
    Add(value) {
        this.push(value)
    }
    AddRange(list) {
        if (list == null) throw new Error("ArgumentNullException")
        if (!typeof list == "object") throw new Error("AddRange: Expected type List")
        for (item of list) {
            this.Add(item)
        }
    }
    Clear() {
        this.splice(0, this.length)
    }
    Contains(item) {
        return this.includes(item)
    }
    Exists(match) {
        //TODO
    }
    Find(match) {
        return this.find(match)
    }
    ForEach(action) {
        this.forEach(action)
    }
    Remove(iValue) {
        var iIndex = this.indexOf(iValue)
        if (iIndex > -1) {
            this.RemoveAt(iIndex)
        }
        return iIndex
    }
    RemoveAt(iIndex) {
        var vItem = this[iIndex];
        if (vItem) {
            this.splice(iIndex, 1);
        }
        return vItem;
    }
    ToArray() {
        return //TODO
    }
}
class Dictionary extends Array {
    constructor(props) {
        if (!props) return super()
        super(props)
    }
    Add(Key, Value) {
        if (this.ContainsKey(Key)) throw new Error("ArgumentException: An element with the same key already exists")
        this.push({ Key, Value })
    }
    Clear() {
        this.splice(0, this.length)
    }
    ContainsKey(key) {
        for (let object of this) {
            if (object.Key == key) return true
        }
        return false
    }
    ContainsValue(value) {
        for (let object of this) {
            if (object.Value == value) return true
        }
        return false
    }
    EnsureCapacity(capacity) {
        return this.length
    }
    RemoveAt(iIndex) {
        var vItem = this[iIndex];
        if (vItem) {
            this.splice(iIndex, 1);
        }
        return vItem;
    }
    Remove(key) {
        if (!this.ContainsKey(key)) return false
        for (let object of this) {
            if (object.Key == key) { this.RemoveAt(this.indexOf(object)); return true }
        }
        return false
    }
}
class HashSet extends Array {
    constructor(){}
}
String.prototype.noExtension = function () {
    return this.replace(/\.[^/.]+$/, "")
}
class httpRequestMessage {
    constructor(method, uri) {
        this.Headers = {}
        this.Content = {}
        this.Method = method
        this.RequestUri = uri
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
        if ($b) $b = {}
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
        super()
        this.RecordId = $b.id  || new String()
        this.OwnerId = $b.ownerId || new String()
        this.AssetURI = $b.assetUri || new String()
        this._URL = new String()
        this.GlobalVersion = $b.globalVersion || new Number()
        this.Localversion = $b.localVersion || new Number()
        this.LastModifyingUserId = $b.lastModifyingUserId || new String()
    }
    get URL(){
        return RecordHelper.GetUrl(this)
    }
    set URL(value){
        this = RecordHelper.SetUrl(this, value)
    }
}
class User {
    constructor() {
        this.Id = new String()
        this.Username = new String()
        this.Email = new String()
        this.RegistrationDate = new Date()
        this.QuotaBytes = new Number()
        this.UsedBytes = new Number()
        this.isVerified = new Boolean()
        this.AccountBanExpiration
        this.PublicBanExpiration
        this.SpectatorBanExpiration
        this.MuteBanExpiration
        this.Password = new String()
        this.RecoverCode = new String()
        this.Tags = new Array()
        this.PatreonData = null
        this.Credits = new Number()
        this.NCRDepositAddress = new String()
        this.ReferralId = new String()
        this.ReferrerUserId = new String()
        this.Profile = new Object()
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
}
AccountType = {
    'Normal': 0,
    'AgentSmith': 1,
    'BladeRunner': 2,
    'Gunter': 3,
    "Neuromancer": 4,
    'Architect': 5,
    'Curator': 6,
    "Level144": 7,
    'Level250': 8,
    'Anorak': 9,
    'END': 10
}
ServerStatus = {
    "Good": 0,
    "Slow": 1,
    "Down": 2,
    "NoInternet": 3
}
MessageType = {
    "Text": 0,
    "Object": 1,
    "SessionInvite": 2,
    "CreditTransfer": 3,
    "SugarCubes": 4 //Not Implimented
}
TransactionType = {
    "User2User": 0,
    "Withdrawal": 1,
    "Deposit": 2,
    "Tip": 3
}
class CloudResult {
    constructor() {
        this.State
        this.Content
    }
    ToString() {
        return ("CloudResult - State: " + this.State + " Content: " + this.Content)
    }
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
    get Entity() {
        return this.Content
    }
    get IsOK() {
        if (this.State != 200) return (this.State == 204);
        return true
    }
    get IsError() {
        return !this.IsOK;
    }
}
class CloudResultGeneric extends CloudResult {

}
class CloudXInterface {
    constructor() {
        this.lockobj = new Object()
        this._groupMemberships = new Membership();
        this._groupMemberInfos = new Member();
        this._groups = new List();
        this.cachedRecords = new CloudResult();
        this._currentSession;
        this._currentUser;
        this._cryptoProvider;
        this._currentAuthenticationHeader;
        this._lastSessionUpdate;
        this.lastServerStatsUpdate;
        this.HttpClient
        this.PublicKey
        this.ServerResponseTime
        this.LastServerUpdate
        this.lastServerStateFetch
        this.Friends
        this.Messages
        this.Transactions
        this.SessionChanged
        this.UserUpdated
        this.MembershipsUpdated
        this.GroupUpdated
        this.GroupMemberUpdated
    }
    static CloudEndpoint = {
        "Production": 0,
        "Staging": 1,
        "Local": 2
    }
    static DEFAULT_RETRIES = 5;
    static UPLOAD_DEGREE_OF_PARALLELISM = 16;
    static DEBUG_UPLOAD = false;
    static storageUpdateDelays = [1, 5, 15, 30];
    static get JSON_MEDIA_TYPE() {
        return {
            'content-type': 'application/json'
        }
    }
    static SESSION_EXTEND_INTERVAL = 3600;
    static ProfilerBeginSampleCallback;
    static ProfilerEndSampleCallback;
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
        this._currentUser = value;
        let userUpdated = this.UserUpdated
        if (userUpdated == null) return;
        userUpdated(this._currentUser)
    }
    get CurrentSession() {
        return this._currentSession
    }
    set CurrentSession(value) {
        if (value == this._currentSession) return;
        //LOCK OBJECT
        if (this._currentSession.SessionToken != value.SessionToken) this._lastSessionUpdate = new Date();
        this._currentSession = value;
        this._currentAuthenticationHeader = value != null ? new AuthenticationHeaderValue('neos', value.userId + ":" + value.SessionToken) : (AuthenticationHeaderValue);
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
        //TODO URI VALIDATION, FOR NOT IS RAW
        if (true) return new Uri(url)
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
            request = this.CreateRequest(resource, HttpMethod.Post);
            this.AddBody(request, entity)
            return request;
        }), timeout)
    }
    POST_File(resource, filePath, FileMIME = null, progressIndicator = null) {
        return this.RunRequest((() => {
            request = this.CreateRequest(resource, HttpMethod.Post);
            this.AddFileToRequest(request, filePath, FileMIME, progressIndicator);
            return request
        }), 60.0)//TODO TIMESPAN FROM MINUTES NOT 60
    }
    PUT(resource, entity, timeout = null) {
        return this.RunRequest((() => {
            request = this.CreateRequest(resource, HttpMethod.Put)
            this.AddBody(request, entity)
            return request
        }), timeout)
    }
    PATCH(resource, entity, timeout = null) {
        return this.RunRequest((() => {
            request = this.CreateRequest(resource, CloudXInterface.PATCH_METHOD)
            this.AddBody(request, entity)
            return request
        }), timeout)
    }
    DELETE(resource, timeout = null) {
        return this.RunRequest((() => { return this.CreateRequest(resource, HttpMethod.Delete) }), timeout);

    }
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
    CreateRequest(resource, method) {
        let request = new httpRequestMessage(method, CloudXInterface.NEOS_API + resource)
        if (this.CurrentSession != null)
            request.Headers.Authorization = this._currentAuthenticationHeader;
        return request
    }
    AddBody(message, entity) {
        //TODO
    }
    async RunRequest(requestSource, timeout) {
        let request = null
        let result = null
        let exception = null
        let remainingRetries = CloudXInterface.DEFAULT_RETRIES
        let delay = 0
        do {
            request = requestSource();
            let cancellationToken = new CancellationTokenSource(timeout ? timeout : fromSeconds(30.0));
            result = await HTTP_CLIENT.SendAsync(request, cancellationToken.Token)
            result = result.Entity
            if (result == null) {
                console.error(`Exception running `)
                request = null
                await Delay(new TimeSpan(delay))
                delay += 250
            } else {
                return result
            }
        }
        while (result == null && remainingRetries-- > 0)
        if (result == null) {
            if (exception == null)
                throw new Error("Failed to get response. Exception is null")
            throw new Error(exception)
        }
    }
    async Login(credential, password, sessionToken, secretMachineId, rememberMe, reciverCode) {
        let cloudXinterface = this
        cloudXinterface.Logout(false);
        let credentials = new LoginCredentials()
        credentials.Password = password
        credentials.RecoverCode = reciverCode
        credentials.SessionToken = sessionToken
        credentials.secretMachineId = secretMachineId
        credentials.RememberMe = rememberMe
        if (credential.startsWith('U-'))
            credentials.OwnerId = credential
        else if (credential.includes('@'))
            credentials.Email = credential
        else
            credentials.Email = credential
        result = await cloudXinterface.POST("api/userSessions", credentials, new TimeSpan())
        if (result.IsOK) {
            cloudXinterface.CurrentSession = result.Entity
            cloudXinterface.CurrentUser = new User()
            cloudXinterface.CurrentUser.Id = cloudXinterface.CurrentSession.UserId
            cloudXinterface.CurrentUser.Username = credentials.Username
            cloudXinterface.UpdateCurrentUserInfo()
            cloudXinterface.UpdateCurrentUserMemberships()
            cloudXinterface.Friends.Update()
            cloudXinterface.onLogin()
        }
        else error("Error loging in: " + result.State.toString() + "\n" + result.Content)
        return result
    }
    async ExtendSession() {
        return await this.PATCH("api/userSessions", null, new TimeSpan())
    }
    async Register(username, email, password) {
        this.Logout(false)
        let u = new User()
        u.Username = username
        u.Email = email
        u.Password = password
        return await this.POST("/api/users", u, new TimeSpan())
    }
    async RequestRecoveryCode(email) {
        let u = new User()
        u.Email = email
        return await this.POST("/api/users/requestlostpassword", u, new TimeSpan())
    }
    async UpdateCurrentUserinfo() {
        switch (this.CurrentUser.Id) {
            case null:
                throw new Error("No current user!")
            default:
                let user = await this.GetUser(this.CurrentUser.Id);
                let entity = user.Entity
                if (user.IsOK && this.CurrentUser != null && this.CurrentUser.Id == entity.Id) {
                    this.CurrentUser = entity
                    patreonData = this.CurrentUser.PatreonData;
                    let num = new Number()
                    if ((patreonData != null ? (patreonData.IsPatreonSupporter ? 1 : 0) : 0) == 0) {
                        tags = this.CurrentUser.Tags
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
        this.Friends = []
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
        let groupMemberships = await this.GetUserMemberships();
        if (groupMemberships.isOK)
            this.SetMemberships(groupMemberships.Entity)
        return groupMemberships
    }
    async GetUserGroupMemberships(userId) {
        if (!userId)
            return await this.GetUserGroupMemberships(this.CurrentUser.Id);
        return await this.GET("api/users/" + userId + "/memberships", new TimeSpan())
    }
    async UpdateGroupInfo(groupId) {
        let group = this.GetGroup(groupId)
        let memberTask = this.GetGroupMember(groupId, this.CurrentUser.Id)
        let groupResult = await group
        let cloudResult = await memberTask
        Lock.acquire(this.lockobj, () => {
            if (groupResult.IsOK) {
                this._groups.Remove(groupId)
                this._groups.Add(groupId, groupResult.Entity)
                groupUpdated = this.GroupUpdated
                if (groupUpdated != null)
                    groupUpdated(groupResult.Entity)
            }
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
    constructor() {
        this.friends = new Array()
        this._friendSessions = new Array()
        this._lock = "FriendManager._lock"
        this.lastStatusUpdate = null
        this.lastRequest = null
        this._friendsChanged = new Boolean()
        this.Cloud
        this.FriendRequestCount
    }
    FriendManager(cloud) {
        this.Cloud = cloud
    }
    get FriendCount() {
        return this.friends.length
    }
    GetFriends(list) {
        for (let friend of this.friends) {
            list.push(friend.Value)
        }
    }
    ForeachFriend(action) {
        for (let friend of this.friends) {
            action(friend.Value)
        }
    }
    GetFriendSessions(sessions) {
        for (let friendSession of this._friendSessions) {
            sessions.push(friendSession.Value)
        }
        return this._friendSessions.length
    }
    ForeachFriendSession(action) {
        for (let friendSession of this._friendSessions) {
            action(friendSession.Value)
        }
    }
    GetFriend(friendId) {
        //TODO GetFriend
    }
    //TODO Friend Manager
}


class MessageManager {
    constructor() {
        this._messagesLock = "MessageManager._messagesLock"
        this._messages = new List()
        this.lastRequest
        this.lastUnreadMessage
        this._unreadCountDirty = new Boolean()
        this._waitingForRequest = new Boolean()
        this.Cloud
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
    constructor() {
        this.Cloud
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

const Shared = { CloudXInterface }
module.exports = {
    Shared
}