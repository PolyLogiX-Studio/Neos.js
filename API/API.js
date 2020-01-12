const uuidv4 = require('uuid/v4')
class AssetEntry {
    constructor(){
        this.id = new String()
        this.OwnerId = new String()
        this.Entry
        this.ComputeLock
    }
    get AssetHash(){
        if (this.OwnerId==null|| !this.OwnerId.startsWith("A-")){
            console.error("OwnerId is invalid, cannot extract asset hash from it");
        }
        return this.OwnerId.substring("A-".length);
    }
    set AssetHash(value) {
        this.OwnerId = "A-" + value
    }
}
class AssetInfo {
    constructor(){
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
    constructor(){
        this.Message = new String()
    }
    static ExtractMessage(content){
        try {
            return content.Message || content
        } catch(err) {
            return content;
        }
    }
}
class CloudVariable {
    constructor(){
        this.VariableOwnerId = new String()
        this.Path = new String()
        this.Value = new String()
    }
    static GetDefinitionPath(path,ownerId,subpath){
        let length = path.indexOf('.')
        ownerId.value = path.substring(0,length)
        subpath.value = path.substring(length + 1)
    }
    GetDefinitionPath(ownerId,subpath){
        CloudVariable.GetDefinitionPath(this.Path,ownerId,subpath)
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
    constructor(){
        this.GroupId = new String()
        this.AdminUserId = new String()
        this.Name = new String()
        this.QuotaBytes = new BigInt()
        this.UsedBytes = new BigInt()
    }
}
//IRecord
class Member {
    constructor(){
        this.UserId = new String()
        this.GroupId = new String()
        this.QuotaBytes = new BigInt()
        this.UsedBytes = new BigInt()
    }
}
class Membership {
    constructor(){
        this.UserId = new String()
        this.GroupId = new String()
        this.GroupName = new String()
    }
}
class Message {
    constructor(){
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
    static GenerateId(){
        return "MSG-" + new uuidv4()
    }
    ExtractContent(){
        return JSON.parse(this.Content)
    }
    SetContent(obj){
        this.Content = JSON.stringify(obj)
    }
    get IsSent() {
        return this.SenderId == this.OwnerId
    }
    get IsReceived() {
        return this.RecipientId == this.OwnerId
    }
    get IsRead() {
        return (this.ReadTime!==undefined)
    }
}
class RecordHelper{

}
class IRecord {
    constructor(){
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
    constructor(){
        
    }

}
class User {
    constructor(){
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
    get IsAccountBanned(){
        return new Date() < this.AccountBanExpiration
    }
    get IsPublicBanned(){
        return new Date() < this.PublicBanExpiration
    }
    get IsSpectatorBanned(){
        return new Date() < this.SpectatorBanExpiration
    }
    get IsMuteBanned(){
        return new Date() < this.MuteBanExpiration
    }
    get CurrentAccountType(){
        if (this.PatreonData == null) return AccountType.Normal;
        return this.PatreonData.CurrentAccountType
    }
    get AccountName(){
        return this.PatreonData?.AccountName || NeosAccount.AccountName(AccountType.Normal)
    }
}
AccountType = {
    'Normal':0,
    'AgentSmith':1,
    'BladeRunner':2,
    'Gunter':3,
    "Neuromancer":4,
    'Architect':5,
    'Curator':6,
    "Level144":7,
    'Level250':8,
    'Anorak':9,
    'END':10
}
class CloudResult {
    constructor(){
        this.State
        this.Content
    }
    ToString(){
        return ("CloudResult - State: "+this.State+" Content: "+this.Content)
    }
    CloudResult(state,content){
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
    get IsOK(){
        if (this.State != 200) return (this.State == 204);
            return true
    }
    get IsError(){
        return !this.IsOK;
    }
}
class CloudResultGeneric extends CloudResult{
    
}
class CloudXInterface {
    constructor(){
        this.lockobj = new Object()
        this._groupMemberships = new Membership()
        this._groupMemberInfos = new Member()
        this._groups = new Group()
        this.cachedRecords = new CloudResult()
    }
    static DEFAULT_RETRIES = 5
    static UPLOAD_DEGREE_OF_PARALLELISM = 16
    static DEBUG_UPLOAD = false
    static storageUpdateDelays = [1,5,15,30]
    static get JSON_MEDIA_TYPE(){return {'content-type':'application/json'}}

}




//module.exports = {AssetInfo,AssetInfo,CloudMessage,CloudVariable,CloudVariableDefinition,Friend,Group,RecordHelper,IRecord,Member,Membership,Message,Record,User}