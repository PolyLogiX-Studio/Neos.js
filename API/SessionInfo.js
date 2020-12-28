const { List } = require("./List");
const { Uri } = require("./Uri");
const { HashSet } = require("./HashSet");
const { SessionUser } = require("./SessionUser");
const { RecordId } = require("./RecordId");
class SessionInfo {
	/**
	 *	Creates an instance of SessionInfo.
	 * @param {{
	 * name: String,
	 * description: String
	 * correspondingWorldId: RecordId
	 * tags: HashSet<String>,
	 * sessionId: String,
	 * hostUserId: String,
	 * hostMachineId: String,
	 * hostUsername : String,
	 * compatabilityHash: String,
	 * universeId: String,
	 * neosVersion: String,
	 * headlessHost: Boolean,
	 * sessionURLs: List<String>,
	 * sessionUsers: List<SessionUser>,
	 * thumbnail: String,
	 * joinedUsers: Number,
	 * activeUsers: Number,
	 * maximumUsers: Number,
	 * mobileFreindly: Boolean,
	 * sessionBeginTime: Date,
	 * awaySince? : Date,
	 * accessLevel: String<SessionAccessLevel> // Enum
	 * }} $b
	 * @memberof SessionInfo
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.Name = $b.name;
		this.Description = $b.description;
		this.CorrespondingWorldId =
			$b.correspondingWorldId instanceof RecordId
				? $b.correspondingWorldId
				: new RecordId($b.correspondingWorldId);
		this.Tags = $b.tags
			? $b.tags instanceof HashSet
				? $b.tags
				: new HashSet($b.tags)
			: null;
		this.SessionId = $b.sessionId;
		this.HostUserId = $b.hostUserId;
		this.HostMachineId = $b.hostMachineId;
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
					for (let user of users) {
						userList.Add(new SessionUser(user));
					}
					return userList;
					//eslint-disable-next-line no-mixed-spaces-and-tabs
				  })($b.sessionUsers)
			: new List();
		this.Thumbnail = $b.thumbnail;
		this.JoinedUsers = $b.joinesUsers;
		this.ActiveUsers = $b.activeUsers;
		this.MaximumUsers = $b.maximumUsers;
		this.MobileFriendly = $b.mobileFriendly;
		this.SessionBeginTime = $b.sessionBeginTime;
		this.LastUpdate = $b.lastUpdate;
		this.AwaySince = $b.awaySince; //Can be Null
		this.AccessLevel = $b.accessLevel; //Enum
	}
	/**
	 * Is the session LAN
	 * @readonly
	 * @memberof SessionInfo
	 */
	get IsOnLAN() {
		return this.LAN_URL != null;
	}
	/**
	 * Is the session still up?
	 * @readonly
	 * @memberof SessionInfo
	 */
	get HasEnded() {
		return this.SessionURLs == null || this.SessionURLs.Count === 0;
	}
	/**
	 * Mark the session as ended
	 * @function
	 * @memberof SessionInfo
	 */
	SetEnded() {
		this.SessionURLs = null;
	}
	/**
	 * Copy the lan info of a session to the current session object
	 * @param {SessionInfo} source
	 * @memberof SessionInfo
	 */
	CopyLAN_Data(source) {
		this.LAN_URL = source.LAN_URL;
		this.LastLAN_Update = source.LastLAN_Update;
		if (this.LAN_URL == null) return;
		if (this.SessionURLs == null) this.SessionURLs = new List();
		this.SessionURLs.Add(this.LAN_URL);
	}
	/**
	 * Session Urls
	 * @returns {List<Uri>}
	 * @memberof SessionInfo
	 */
	GetSessionURLs() {
		let urls = new List();
		for (let url in this.SessionURLs) {
			urls.Add(new Uri(url));
		}
		return urls;
	}
	/**
	 * Is name Safe (!18+)
	 * @static
	 * @param {String} name
	 * @returns {Boolean}
	 * @memberof SessionInfo
	 */
	static IsAllowedName(name) {
		if (name == null) return true;
		name = name.toLowerCase();
		return !~name.indexOf("18+") && !~name.indexOf("nsfw");
	}
	/**
	 * Normalized Session Id
	 * @returns {String}
	 * @readonly
	 * @memberof SessionInfo
	 */
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
	get MAX_DLL_LENGTH() {
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
	/**
	 * Update Session Id
	 * @param {String} sessionId
	 * @memberof SessionInfo
	 */
	SessionInfo(sessionId) {
		this.SessionId = sessionId;
		this.LastUpdate = new Date();
	}
	/**
	 * Is the sessionId Custom (DEV)
	 * @static
	 * @param {String} sessionId
	 * @returns {Boolean}
	 * @memberof SessionInfo
	 */
	static IsCustomSessionId(sessionId) {
		return sessionId.startsWith("S-U-");
	}
	/**
	 * Get OwnerId from a Custom ID
	 * @static
	 * @param {String} sessionId
	 * @returns {String}
	 * @memberof SessionInfo
	 */
	static GetCustomSessionOwnerId(sessionId) {
		var num = sessionId.indexOf(":");
		if (!~num)
			throw new Error("Invalid custom sessionId! Make sure it's valid first.");
		return sessionId.substr(2, num - 2);
	}
	/**
	 * Check if the given session id is Valid
	 * @static
	 * @param {String} sessionId
	 * @returns {Boolean}
	 * @memberof SessionInfo
	 */
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
	static IsValidVersion(version) {
		if (version == null) return false;
		let length = version.indexOf("+");
		let str1;
		let str2;
		if (length < 0) {
			str1 = version;
			str2 = "";
		} else {
			str1 = version.substr(0, length);
			str2 = version.substring(length + 1);
		}
		let strArray = str1.split(".");
		if (strArray.length != 4) return false;
		return str2.Length <= 128;
	}

	IsSame(other) {
		//TODO
		return this.Name == other.Name;
	}
	HasTag(tag) {
		return this.Tags != null && this.Tags.Contains(tag);
	}
	get IsValid() {
		//TODO
		return true;
	}
	/**
	 * Trim the current SessionInfo to maximum lengths
	 * @memberof SessionInfo
	 */
	Trim() {
		var name = this.Name;
		if (
			(name != null
				? name.length > SessionInfo.MAX_NAME_LENGTH
					? 1
					: 0
				: 0) != 0
		)
			this.Name = this.Name.substr(0, SessionInfo.MAX_NAME_LENGTH);
		var description = this.Description;
		if (
			(description != null
				? description.length > SessionInfo.MAX_DESCRIPTION_LENGTH
					? 1
					: 0
				: 0) != 0
		)
			this.Description = this.Description.substr(
				0,
				SessionInfo.MAX_DESCRIPTION_LENGTH
			);
		//TODO Trim Tags
	}
	/**
	 * To String
	 * @returns {String}
	 * @memberof SessionInfo
	 */
	ToString() {
		return "SessionInfo. Id " + this.SessionId;
	}
}
module.exports = {
	SessionInfo,
};
