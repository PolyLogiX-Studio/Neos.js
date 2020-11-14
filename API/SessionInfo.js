const { List } = require("./List");
const { Type } = require("./Type");
const { Uri } = require("./Uri");
const { HashSet } = require("./HashSet");
const { SessionUser } = require("./SessionUser");
class SessionInfo {
	constructor($b) {
		if (!$b) $b = {};
		this.Name = $b.name;
		this.Description = $b.description;
		this.CorrespondingWorldId = $b.correspondingWorldId;
		this.Tags = $b.tags
			? $b.tags instanceof HashSet
				? $b.tags
				: new HashSet($b.tags)
			: null;
		this.SessionId = $b.sessionId;
		this.HostUserId = $b.hostUserId;
		this.HostUsername = $b.hostUsername;
		this.CompatabilityHash = $b.compatabilityHash;
		this.UniverseId = $b.universeId;
		this.NeosVersion = $b.neosVersion;
		this.HeadlessHost = $b.headlessHost;
		this.SessionURLs = $b.sessionURLs
			? $b.sessionURLs instanceof List
				? $b.sessionURLs
				: List.ToList($b.sessionURLs)
			: null;
		this.SessionUsers = $b.sessionUsers
			? $b.sessionUsers instanceof List
				? $b.sessionUsers
				: ((users) => {
					let userList = new List();
					for (user of users) {
						userList.Add(new SessionUser(user));
					}
					return userList;
				  })($b.sessionUsers)
			: new List();
			this.Thumbnail = $b.thumbnail
			this.JoinedUsers = $b.joinesUsers
			this.ActiveUsers = $b.activeUsers
			this.MaximumUsers = $b.maximumUsers
			this.MobileFriendly = $b.mobileFriendly
			this.SessionBeginTime = $b.sessionBeginTime
			this.LastUpdate = $b.lastUpdate
			this.AwaySince = $b.awaySince //Can be Null
			this.AccessLevel = $b.accessLevel //Enum

	}
	get IsOnLAN(){
		return this.LAN_URL != null
	}
	get HasEnded(){
		return this.SessionURLs == null || this.SessionURLs.Count === 0;
	}
	SetEnded(){
		this.SessionURLs = null
	}
	CopyLAN_Data(source){
		this.LAN_URL = source.LAN_URL
		this.LastLAN_Update = source.LastLAN_Update
		if (this.LAN_URL == null) return;
		if (this.SessionURLs == null)
			this.SessionURLs = new List()
		this.SessionURLs.Add(this.LAN_URL)
	}
	GetSessionURLs(){
		let urls = new List()
		for (url in this.SessionURLs){
			urls.Add(new Uri(url))
		}
		return urls
	}
	get NormalizedSessionId() {
		if (this.SessionId) return this.SessionId.toLower();
		return null;
	}

	get MAX_NAME_LENGTH() {
		return 256;
	}
	get MAX_DESCRIPTION_LENGTH() {
		return 16384;
	}
	get MAX_TAG_LENGTH() {
		return 128;
	}
	get MAX_TAGS() {
		return 256;
	}
	get MAX_ID_LENGTH() {
		return 128;
	}
	get MAX_URL_LENGTH() {
		return 256;
	}
	SessionInfo(sessionId) {
		this.SessionId = sessionId;
		this.LastUpdate = new Date();
	}
	static IsCustomSessionId(sessionId) {
		return sessionId.startsWith("S-U-");
	}
	static GetCustomSessionOwnerId(sessionId) {
		var num = sessionId.indexOf(":");
		if (!~num)
			throw new Error("Invalid custom sessionId! Make sure it's valid first.");
		return sessionId.substr(2, num - 2);
	}
	static IsValidSessionId(sessionId) {
		if (sessionId == null || sessionId.trim() == "") return false;
		for (let c of sessionId) {
			if (!/[0-9]/.test(c)) {
				if (/[a-zA-Z]/.test(c)) {
					if (c > "\u007F") return false; // No Unicode
				} else if (c != "-" && c != ":" && c != "_") return false; // No Tags
			}
		}
		return (
			!sessionId.startsWith("U-") &&
			(!SessionInfo.IsCustomSessionId(sessionId) || sessionId.indexOf(":") >= 0)
		);
	}
	IsSame(other){
		//TODO
		return this.Name == other.Name
	}
	HasTag(tag){
		return this.Tags != null && this.Tags.Contains(tag)
	}
	get IsValid(){
		//TODO
	}
	Trim(){
		var name = this.Name
		if ((name != null ? (name.length > SessionInfo.MAX_NAME_LENGTH ? 1 : 0) : 0) != 0)
			this.Name = this.Name.substr(0, SessionInfo.MAX_NAME_LENGTH)
		var description = this.Description
		if ((description != null ? (description.length > SessionInfo.MAX_DESCRIPTION_LENGTH?1:0):0)!=0)
			this.Description = this.Description.substr(0,SessionInfo.MAX_DESCRIPTION_LENGTH);
		//TODO Trim Tags
	}
	ToString(){
		return "SessionInfo. Id "+this.SessionId
	}
}
module.exports = {
	SessionInfo,
};
