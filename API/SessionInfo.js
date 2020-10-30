const { List } = require('./List');
const { Type } = require('./Type');
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
    if (Type.Get(SessionURLs) == 'List') this.SessionURLs = SessionURLs;
    if (Type.Get(SessionURLs) == 'Array')
      this.SessionURLs = List.ToList(SessionURLs);
    let SessionUsers = $b.sessionUsers;
    if (Type.Get(SessionUsers) == 'List') this.SessionUsers = SessionUsers;
    if (Type.Get(SessionUsers) == 'Array')
      this.SessionUsers = List.ToList(SessionUsers);
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
      return List.ToList(
        this.SessionURLs.filter((str) => {
          return str;
        }).map((str) => new Uri(str))
      );
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
module.exports = {
  SessionInfo,
};
