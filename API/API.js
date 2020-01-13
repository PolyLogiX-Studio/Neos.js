const uuidv4 = require('uuid/v4')
const fetch = require('node-fetch')
class AssetEntry {
    constructor() {
        this.id = new String()
        this.OwnerId = new String()
        this.Entry
        this.ComputeLock
    }
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
class AssetInfo {
    constructor() {
        this.ownerId = new String()
        this.assetHash = new String()
        this.Bytes = new BigInt()
        this.Free = new Boolean()
        this.isUploaded = new Boolean()
        this.UploaderUserId = new String()
        this.CountsAgainstMemberQuota = new Boolean()
    }
}
class CloudMessage {
    constructor() {
        this.Message = new String()
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
    constructor() {
        this.VariableOwnerId = new String()
        this.Path = new String()
        this.Value = new String()
    }
    static GetDefinitionPath(path, ownerId, subpath) {
        let length = path.indexOf('.')
        ownerId.value = path.substring(0, length)
        subpath.value = path.substring(length + 1)
    }
    GetDefinitionPath(ownerId, subpath) {
        CloudVariable.GetDefinitionPath(this.Path, ownerId, subpath)
    }
}
class CloudVariableDefinition {
    constructor() {
        this.DefinitionOwnerId = new String()
        this.Subpath = new String()
        this.TypeHint = new String()
        this.VariableOwnerCanRead = new Boolean()
        this.VariableOwnerCanWrite = new Boolean()
        this.AnyoneCanRead = new Boolean()
        this.AnyoneCanWrite = new Boolean()
    }
    CanRead(variableOwnerId, readerId) {
        return this.AnyoneCanRead || this.VariableOwnerCanRead && variableOwnerId == readerId || readerId == this.DefinitionOwnerId
    }
    CanWrite(variableOwnerId, writerId) {
        return this.AnyoneCanWrite || this.VariableOwnerCanWrite && variableOwnerId == writerId || writerId == this.DefinitionOwnerId
    }
}
class Friend {
    constructor() {
        this.FriendUserId = new String()
        this.OwnerId = new String()
        this.FriendUsername = new String()
        this.FriendStatus
        this.IsAccepted = new Boolean()
        this.UserStatus
        this.LatestMessageTime
        this.Profile
    }
}
class Group {
    constructor() {
        this.GroupId = new String()
        this.AdminUserId = new String()
        this.Name = new String()
        this.QuotaBytes = new BigInt()
        this.UsedBytes = new BigInt()
    }
}
//IRecord
class Member {
    constructor() {
        this.UserId = new String()
        this.GroupId = new String()
        this.QuotaBytes = new BigInt()
        this.UsedBytes = new BigInt()
    }
}
class Membership {
    constructor() {
        this.UserId = new String()
        this.GroupId = new String()
        this.GroupName = new String()
    }
}
class Message {
    constructor() {
        this.Id = new String()
        this.OwnerId = new String()
        this.RecipientId = new String()
        this.SenderId = new String()
        this.MessageType = new Object()
        this.Content = new String()
        this.SendTime = new Date()
        this.LastUpdateTime = new Date()
        this.ReadTime
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
class RecordHelper {

}
class IRecord {
    constructor() {
        this.RecordId = new String()
        this.OwnerId = new String()
        this.URL = new URL()
        this.GlobalVersion = new Number()
        this.Localversion = new Number()
        this.LastModifyingUserId = new String()
        this.LastModifyingMachineId = new String()
        this.Name = new String()
        this.OwnerName = new String()
        this.Description = new String()
        this.RecordType = new String()
        this.Tags
        this.Path = new String()
        this.ThumbnailURI = new String()
        this.IsPublic = new Boolean()
        this.IsForPatreons = new Boolean()
        this.IsListed = new Boolean()
        this.Visits = new Number()
        this.Rating = new Number()
        this.FirstPublishTime
        this.CreationTime
        this.LastModificationTime
        this.NeosDBManifest = new Array()
    }
}
class Record extends IRecord {
    constructor() {

    }

}
class User {
    constructor() {
        this.Id = new String()
        this.Username = new String()
        this.Email = new String()
        this.RegistrationDate = new Date()
        this.QuotaBytes = new BigInt()
        this.UsedBytes = new BigInt()
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
        return this.PatreonData?.AccountName || NeosAccount.AccountName(AccountType.Normal)
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
        this.lockobj = new Object();
        this._groupMemberships = new Membership();
        this._groupMemberInfos = new Member();
        this._groups = new Group();
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
    static get JSON_MEDIA_TYPE() { return { 'content-type': 'application/json' } }
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
                throw ("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString())
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
                throw ("Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString())
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
        userUpdated = this.UserUpdated
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
            sessionChanged = this.sessionChanged;
            if (sessionChanged == null) return;
            sessionChanged(this._currentSession);
        } catch (error) {
            Error("Exception in SessionChanged: " + (this.CurrentSession.toString() + error.toString()), true);
        }
    }
    get CurrentUserMemberships(){
        return this._groupMemberships;
    }
    get CurrentUserGroupInfos(){
        return this._groups.map(function(p){return p.Value})
    }
    get CurrentUserMemberInfos(){
        return this._groupMemberInfos.map(function(p){return p.Value})
    }
    TryGetCurrentUserGroupInfo(groupId){
        return this._groups.filter(function(item){
            return (item['groupId']=== groupId)
        })
    }
    TryGetCurrentUserGroupMemberInfo(groupId){
        return this._groupMemberInfos.filter(function(item){
            return (item['groupId']=== groupId)
        })
    }
    IsCurrentUserMemberOfGroup(groupId){
        return this.TryGetCurrentUserGroupMemberInfo != null
    }
    TryGetCurrentUserGroupMembership(groupId){
        //DO LATER
    }
    CloudXInterface(){
        this.HttpClient = fetch
        this.Friends = new FriendManager(this);
        this.Messages = new MessageManager(this);
        this.Transactions = new TransactionManager(this);
    }

}
class MessageManager {
    constructor(){

    }
    static UPDATE_PERIOD_SECONDS = 1;
    static UPDATE_TIMEOUT_SECONDS = 10

}