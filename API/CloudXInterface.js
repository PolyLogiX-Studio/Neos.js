const {
  Uri
} = require("./Uri");
const {
  StringBuilder
} = require("./StringBuilder");
const {
  List
} = require("./List");
const {
  SessionInfo
} = require("./SessionInfo")
const {
  Dictionary
} = require("./Dictionary");
const {
  Type
} = require("./Type");
const {
  IdUtil
} = require("./IdUtil")
const {
  OwnerType
} = require("./OwnerType")
const {
  TimeSpan
} = require("./TimeSpan")
const {
  HttpMethod
} = require("./HttpMethod")
const {
  HttpRequestMessage
} = require("./HttpRequestMessage")
const {
  HttpResponseMessage
} = require("./HttpResponseMessage")
const {
  CancellationTokenSource
} = require("./CancellationTokenSource")
const {
  CloudResult
} = require("./CloudResult")
const {
  LoginCredentials
} = require("./LoginCredentials")
const {
  AuthenticationHeaderValue
} = require("./AuthenticationHeaderValue")
const {
  User
} = require("./User")
const {
  Friend
} = require("./Friend")
const {
  Message
} = require("./Message")
const {
  ServerStatistics
} = require("./ServerStatistics")
const {
  UserTags
} = require("./UserTags")
const {
  Out
} = require("./Out");
const {
  Enumerable
} = require("./Enumerable");
const {
  v4: uuidv4
} = require("uuid");
const {
  HTTP_CLIENT
} = require("./HTTP_CLIENT")
const {
  FriendManager
} = require("./FriendManager")
const {
  MessageManager
} = require("./MessageManager")
const {
  TransactionManager
} = require("./TransactionManager")
const {
  ProductInfoHeaderValue
} = require("./ProductInfoHeaderValue")
const {
  UserSession
} = require("./UserSession")
/**
 *
 *
 * @class CloudXInterface
 */
class CloudXInterface {
  /**
   *
   */
  constructor(BUS, product, version) {
    this.CloudXInterface(product, version);
    this.OAuth = {
      IsOAUTH: false,
      Permissions: 0
    }
    /** @type List<Membership> */
    this._groupMemberships;
    /** @type Dictionary<String, Member> */
    this._groupMemberInfos;
    /** @type Dictionary<String, Group> */
    this._groups;
    /** @type Dictionary<Type, Dictionary<Uri, CloudResult>> */
    this.cachedRecords = new Dictionary();
    /** @type UserSession */
    this._currentSession;
    /** @type User */
    this._currentUser;
    /** @type RSACryptoServiceProvider */
    this._cryptoProvider;
    /** @type AuthenticationHeaderValue */
    this._currentAuthenticationHeader;
    /** @type Date */
    this._lastSessionUpdate = new Date(0);
    /** @type Date */
    this.lastServerStatsUpdate = new Date(0);
    /** @type HttpClient */
    this.HttpClient;
    /** @type RSAParameters */
    this.PublicKey;
    /** @type Number */
    this.ServerResponseTime = 0;
    /** @type Date */
    this.LastServerUpdate = new Date(0);
    /** @type Date */
    this.LastServerStateFetch = new Date(0);
    /** @type Date */
    this.LastLocalServerResponse = new Date(0);
    /** @type String */
    this.UserAgentProduct;
    /** @type String */
    this.UserAgentVersion;
    /** @type FriendManager */
    this.Friends;
    /** @type MessageManager */
    this.Messages;
    /** @type TransactionManager */
    this.Transactions;
    this.SessionChanged;
    this.UserUpdated;
    this.MembershipsUpdated;
    this.GroupUpdated;
    this.GroupMemberUpdated;
    //Setup Private Properties
    //this.CloudXInterface()
    this.Events = BUS;
    Object.defineProperties(this, {
      _groupMemberships: {
        value: new List(),
        writable: true
      },
      _groupMemberInfos: {
        value: new Dictionary(),
        writable: true
      },
      _groups: {
        value: new Dictionary(),
        writable: true
      },
      _currentSession: {
        value: new UserSession(),
        configurable: true
      },
      _currentUser: {
        writable: true
      },
      _cryptoProvider: {
        writable: true
      },
      _currentAuthenticationHeader: {
        value: null,
        writable: true
      },
      _lastSessionUpdate: {
        value: new Date(0),
        writable: true
      },
      _lastServerStatsUpdate: {
        value: new Date(0),
        writable: true
      },
      lockobj: {
        value: "CloudXLockObj"
      }
    });
  };

  static CloudEndpoint = new Enumerable(["Production", "Staging", "Local", "PolyLogiXOAUTH"]);

  static DEFAULT_RETRIES = 5;
  static UPLOAD_DEGREE_OF_PARALLELISM = 16;
  static DEBUG_UPLOAD = false;
  static storageUpdateDelays = [1, 5, 15, 30];
  static get JSON_MEDIA_TYPE() {
    return {
      "Content-Type": "application/json"
    };
  }
  static SESSION_EXTEND_INTERVAL = 3600;
  /** @type Action<string> */
  static ProfilerBeginSampleCallback;
  /** @type Action */
  static ProfilerEndSampleCallback;
  /** @type Func<MemoryStream> */
  static MemoryStreamAllocator;
  static USE_CDN = new Boolean();
  static CLOUDX_PRODUCTION_NEOS_API = "https://www.neosvr-api.com/";
  static CLOUDX_STAGING_NEOS_API = "https://cloudx-staging.azurewebsites.net/";
  static POLYLOGIX_OAUTH_API = "https://neos-oauth.glitch.me/"
  static CLOUDX_NEOS_BLOB = "https://cloudxstorage.blob.core.windows.net/";
  static CLOUDX_NEOS_CDN = "https://cloudx.azureedge.net/";
  static LOCAL_NEOS_API = "http://localhost:60612/";
  static LOCAL_NEOS_BLOB = "http://127.0.0.1:10000/devstoreaccount1/";
  ProfilerBeginSample(name) {
    let beginSampleCallback = CloudXInterface.ProfilerBeginSampleCallback;
    if (beginSampleCallback == null) return;
    beginSampleCallback();
  }
  ProfilerEndSample() {
    let endSampleCallback = CloudXInterface.ProfilerEndSampleCallback;
    if (endSampleCallback == null) return;
    endSampleCallback();
  }
  static get CLOUD_ENDPOINT() {
    if (this.OAuth) {
      if (this.OAuth.IsOAuth)
        return CloudXInterface.CloudEndpoint.PolyLogiXOAuth;
    }
    return CloudXInterface.CloudEndpoint.Production;
  }

  static get NEOS_API() {
    switch (CloudXInterface.CLOUD_ENDPOINT) {
      case CloudXInterface.CloudEndpoint.Production:
        return "https://www.neosvr-api.com/";
      case CloudXInterface.CloudEndpoint.Staging:
        return "https://cloudx-staging.azurewebsites.net/";
      case CloudXInterface.CloudEndpoint.Local:
        return "https://localhost:60612/";
      case CloudXInterface.CloudEndpoint.PolyLogiXOAuth:
        return "https://oauth.neosdb.net/" // Custom Server
      default:
        throw new Error(
          "Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString()
        );
    }
  }
  /**
   * Return the Blob Endpoint
   *
   * @readonly
   * @static
   * @memberof CloudXInterface
   */
  static get NEOS_BLOB() {
    switch (CloudXInterface.CLOUD_ENDPOINT) {
      case CloudXInterface.CloudEndpoint.PolyLogiXOAUTH:
      case CloudXInterface.CloudEndpoint.Production:
      case CloudXInterface.CloudEndpoint.Staging:
      case CloudXInterface.CloudEndpoint.Local:
        return CloudXInterface.NEOS_CLOUD_BLOB;
      default:
        throw new Error(
          "Invalid Endpoint: " + CloudXInterface.CLOUD_ENDPOINT.toString()
        );
    }
  }
  /**
   * Return the Assets URI
   *
   * @readonly
   * @static
   * @memberof CloudXInterface
   */
  static get NEOS_ASSETS() {
    return CloudXInterface.NEOS_BLOB + "assets/";
  }
  /**
   * Get the Neos CDN server
   *
   * @readonly
   * @static
   * @memberof CloudXInterface
   */
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
    return !CloudXInterface.USE_CDN ?
      "https://cloudxstorage.blob.core.windows.net/" :
      "https://cloudx.azureedge.net/";
  }
  /**
   * Recalculate Server Ping and Response Time
   *
   * @readonly
   * @memberof CloudXInterface
   */
  get ServerStatus() {
    if (new Date(new Date() - this.LastServerStateFetch).getSeconds() >= 60.0)
      return ServerStatus.NoInternet;
    if (new Date(new Date() - this.LastServerUpdate).getSeconds() >= 60.0)
      return ServerStatus.Down;
    return this.ServerResponseTime > 500 ?
      ServerStatus.Slow :
      ServerStatus.Good;
  }
  /**
   * The Current User Object
   *
   * @memberof CloudXInterface
   */
  get CurrentUser() {
    return this._currentUser;
  }
  set CurrentUser(value) {
    if (value == this._currentUser) return;
    let user = new User(value);
    this._currentUser = user;
    let userUpdated = this.UserUpdated;
    if (userUpdated == null) return;
    userUpdated(this._currentUser);
  }
  get CurrentSession() {
    return this._currentSession;
  }
  /**
   * The Current Session Object
   *
   * @memberof CloudXInterface
   */
  set CurrentSession(value) {
    if (value == null) {
      Object.defineProperties(this, {
        _currentSession: {
          value: new UserSession(),
          configurable: true
        }
      });
      return;
    }
    if (value == this._currentSession) return;
    if (!this._currentSession)
      Object.defineProperties(this, {
        _currentSession: {
          value: new UserSession(),
          configurable: true
        }
      });
    if (this._currentSession.SessionToken != value.SessionToken)
      this._lastSessionUpdate = new Date();
    Object.defineProperties(this, {
      _currentSession: {
        value: value,
        configurable: true
      }
    });
    if (!this.OAuth) this.OAuth = {}
    //Set the Authentication Header
    if (this.OAuth.IsOAUTH) {
      //Use the OAuth Schema
      this._currentAuthenticationHeader =
        value != null ?
        new AuthenticationHeaderValue(
          "Bearer",
          value.SessionToken
        ).Authorization :
        AuthenticationHeaderValue;
    } else {
      //Use the Neos Schema
      this._currentAuthenticationHeader =
        value != null ?
        new AuthenticationHeaderValue(
          "neos",
          value.UserId + ":" + value.SessionToken
        ).Authorization :
        AuthenticationHeaderValue;
    }
    //Call Event
    this.OnSessionUpdated();
    try {
      let sessionChanged = this.sessionChanged;
      if (sessionChanged == null) return;
      sessionChanged(this._currentSession);
    } catch (error) {
      Error(
        "Exception in SessionChanged: " +
        (this.CurrentSession.toString() + error.toString()),
        true
      );
    }
  }
  /**
   *The Curent Memberships, Will return Null if this.Update has not been run
   *
   * 
   * @memberof CloudXInterface
   */
  get CurrentUserMemberships() {
    return this._groupMemberships;
  }
  get CurrentUserGroupInfos() {
    return this._groups.map(function (p) {
      return p.Value;
    });
  }
  get CurrentUserMemberInfos() {
    return this._groupMemberInfos.map(function (p) {
      return p.Value;
    });
  }
  TryGetCurrentUserGroupInfo(groupId) {
    return this._groups.filter(function (item) {
      return item["groupId"] === groupId;
    });
  }
  TryGetCurrentUserGroupMemberInfo(groupId) {
    return this._groupMemberInfos.filter(function (item) {
      return item["groupId"] === groupId;
    });
  }
  IsCurrentUserMemberOfGroup(groupId) {
    return this.TryGetCurrentUserGroupMemberInfo != null;
  }
  TryGetCurrentUserGroupMembership(groupId) {
    let a = this._groupMemberInfos.indexOf(groupId);
    if (a) {
      return this._groupMemberInfos[a];
    }
  }
  /**
   * Redefineable Function for Hooks
   *
   * @memberof CloudXInterface
   */
  OnLogin() {}
  /**
   * Redefineable Function for Hooks
   *
   * @memberof CloudXInterface
   */
  OnLogout() {}
  /**
   * Redefineable Function for Hooks
   *
   * @memberof CloudXInterface
   */
  OnSessionUpdated() {}
  /**
   * Initializing Function, Setup local managers
   * @param {String} UserAgentProduct Agent ie. NeosJS
   * @param {String} UserAgentVersion Version ie v1.5.6
   */
  CloudXInterface(UserAgentProduct = "CloudX", UserAgentVersion = "0.0.0.0") {
    this.HttpClient = new HTTP_CLIENT();
    this.Friends = new FriendManager(this);
    this.UserAgentProduct = UserAgentProduct;
    this.UserAgentVersion = UserAgentVersion;
    this.UserAgent = new ProductInfoHeaderValue(
      UserAgentProduct,
      UserAgentVersion
    );
    this.Messages = new MessageManager(this);
    this.Transactions = new TransactionManager(this);
  }
  /**
   * Run all state updates 
   *
   * @memberof CloudXInterface
   */
  Update() {
    if (this.CurrentSession != null) {
      if (
        new Date(new Date() - this._lastSessionUpdate).getSeconds() >= 3600.0
      ) {
        this.ExtendSession();
        this._lastSessionUpdate = new Date();
      }
    }
    if (
      new Date(new Date() - this._lastServerStatsUpdate).getSeconds() >= 10.0
    ) {
      (async () => {
        let cloudResult = await this.GetServerStatistics();
        if (cloudResult.IsOK) {
          this.ServerResponseTime = cloudResult.Entity.ResponseTimeMilliseconds;
          this.LastServerUpdate = cloudResult.Entity.LastUpdate;
        }
        this.LastServerStateFetch = new Date();
      })();
      this._lastServerStatsUpdate = new Date();
    }
    if (this.Friends) this.Friends.Update();
    if (this.Messages) this.Messages.Update();
  }
  /**
   *
   *
   * @param {String} ownerId
   * @returns
   * @memberof CloudXInterface
   */
  HasPotentialAccess(ownerId) {
    switch (IdUtil.GetOwnerType(ownerId)) {
      case OwnerType.Machine:
        return true;
      case OwnerType.User:
        return ownerId == this.CurrentUser.Id;
      case OwnerType.Group:
        return this.CurrentUserMemberships.Any(m => m.GroupId == ownerId);
      default:
        return false;
    }
  }
  SetMemberships(memberships) {
    this._groupMemberships = memberships;
    this.RunMembershipsUpdated();
  }
  /**
   * Reset the membership cache
   * @memberof CloudXInterface
   */
  ClearMemberships() {
    if (this._groupMemberships.length == 0) return;
    this._groupMemberships = new List();
    this.RunMembershipsUpdated();
  }
  async RunMembershipsUpdated() {
    for (groupMembership of this._groupMemberships) {
      await this.UpdateGroupInfo(groupMembership.GroupId);
    }
    let membershipsUpdated = this.MembershipsUpdated;
    if (membershipsUpdated == null) return;
    membershipsUpdated(this._groupMemberships);
  }
  /**
   *
   *
   * @static
   * @param {Uri} neosdb
   * @param {boolean} [forceCDN=false]
   * @param {boolean} [forceCloudBlob=false]
   * @returns
   * @memberof CloudXInterface
   */
  static NeosDBToHttp(neosdb, forceCDN = false, forceCloudBlob = false) {
    let str1 = CloudXInterface.NeosDBSignature(neosdb);
    let str2 = CloudXInterface.NeosDBQuery(neosdb);
    let str3 = str1;
    if (str2 != null) str3 = str3 + "/" + str2;
    if (CloudXInterface.IsLegacyNeosDB(neosdb))
      return new Uri("https://neoscloud.blob.core.windows.net/assets/" + str3);
    return new Uri(
      (forceCDN ?
        CloudXInterface.NEOS_ASSETS_CDN :
        forceCloudBlob ?
        "https://cloudxstorage.blob.core.windows.net/" :
        CloudXInterface.NEOS_ASSETS) + str3
    );
  }
  static FilterNeosURL(assetURL) {
    if (
      assetURL.Scheme == "neosdb" &&
      assetURL.Segments.length >= 2 &&
      assetURL.Segments.includes(".")
    )
      return (assetURL = new Uri(
        "neosdb:///" + assetURL.Segments[1].noExtension() + assetURL.Query
      ));
    return assetURL;
  }
  static NeosDBFilename(neosdb) {
    return neosdb.Segments[1] + neosdb.Query;
  }
  static NeosDBSignature(neosdb) {
    return neosdb.Segments[1].noExtension();
  }
  static NeosDBQuery(neosdb) {
    if (neosdb.Query == null || neosdb.Query == "") return null;
    return neosdb.Query.substring(1);
  }
  static NeosThumbnailIdToHttp(id) {
    return new Uri(CloudXInterface.NEOS_THUMBNAILS + id);
  }
  static TryFromString(url) {
    if (url == null) return null;
    if (Uri.IsWellFormedUriString(url, 1)) return new Uri(url);
    return null;
  }
  static IsLegacyNeosDB(uri) {
    if (uri.Scheme != "neosdb") return false;
    return uri.Segments[1].noExtension().length < 30;
  }
  //473
  GET(resource, timeout = null) {
    return this.RunRequest(() => {
      return this.CreateRequest(resource, HttpMethod.Get);
    }, timeout);
  }
  POST(resource, entity, timeout = null) {
    return this.RunRequest(() => {
      let request = this.CreateRequest(resource, HttpMethod.Post);
      if (entity != null) this.AddBody(request, entity);
      return request;
    }, timeout);
  }
  POST_File(resource, filePath, FileMIME = null, progressIndicator = null) {
    return this.RunRequest(() => {
      let request = this.CreateRequest(resource, HttpMethod.Post);
      this.AddFileToRequest(request, filePath, FileMIME, progressIndicator);
      return request;
    }, TimeSpan.fromMinutes(60.0));
  }
  PUT(resource, entity, timeout = null) {
    return this.RunRequest(() => {
      let request = this.CreateRequest(resource, HttpMethod.Put);
      this.AddBody(request, entity);
      return request;
    }, timeout);
  }
  PATCH(resource, entity, timeout = null) {
    return this.RunRequest(() => {
      let request = this.CreateRequest(resource, HttpMethod.Patch);
      this.AddBody(request, entity);
      return request;
    }, timeout);
  }
  DELETE(resource, timeout = null) {
    return this.RunRequest(() => {
      return this.CreateRequest(resource, HttpMethod.Delete);
    }, timeout);
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
    let fileStream = fs.readFile(filePath);
    //TODO Multi Part Form Content
    //if (mime != null)
  }

  /**
   *
   * @param {string} resource
   * @param {HttpMethod} method
   * @returns {HttpRequestMessage}
   */
  CreateRequest(resource, method) {
    let Endpoint
    if (this.OAuth) {
      if (this.OAuth.IsOAUTH)
        Endpoint = CloudXInterface.POLYLOGIX_OAUTH_API + resource
      else
        Endpoint = CloudXInterface.NEOS_API + resource
    } else {
      Endpoint = CloudXInterface.NEOS_API + resource
    }
    let request = new HttpRequestMessage(
      method,
      Endpoint
    );
    if (this.CurrentSession != null) {
      request.Headers.Authorization = this._currentAuthenticationHeader;
    }
    request.Headers.UserAgent = this.UserAgent.Value();
    return request;
  }
  /**
   *
   *
   * @param {HttpResponseMessage} message
   * @param {*} entity
   * @memberof CloudXInterface
   */
  AddBody(message, entity) {
    message.Headers["Content-Type"] =
      CloudXInterface.JSON_MEDIA_TYPE["Content-Type"];
    if (entity) message.Content = JSON.stringify(entity);
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
    let request = null;
    /** @type {HttpResponseMessage} */
    let result = null;
    let exception = null;
    let remainingRetries = CloudXInterface.DEFAULT_RETRIES;
    let delay = 0;
    do {
      request = requestSource();
      let cancellationToken = new CancellationTokenSource(
        timeout ? timeout : TimeSpan.fromSeconds(30.0)
      );
      result = await this.HttpClient.SendAsync(
        request,
        cancellationToken.Token
      );
      if (result == null) {
        console.error(`Exception running `);
        request = null;
        await TimeSpan.Delay(new TimeSpan(delay));
        delay += 250;
      }
      return result; //BYPASS
    } while (result == null && remainingRetries-- > 0);
    if (result == null) {
      if (exception == null)
        throw new Error("Failed to get response. Exception is null");
      throw new Error(exception);
    }
    let entity;
    let content = null;
    if (result.IsSuccessStatusCode) {
      if (typeof result.Content == "string") {
        content = await result.Content.toString();
        entity = content;
      } else {
        try {
          let contentLength = result.Headers["content-length"];
          let num = 0;
          if (contentLength > num && contentLength != null) {
            let responseStream = await result.Content.toString();
            entity = await JSON.parse(responseStream);
          }
        } catch (error) {
          console.error("Exception deserializing ");
        } finally {}
      }
    } else {
      content = await result.Content;
      return new CloudResult(entity, result.StatusCode, content);
    }
  }
  /**
   * 
   * @param {string} credential 
   * @param {string} token 
   */
  async PolyLogiXOAuthLogin(token) {
    this.Logout(false);
    this.OAuth.IsOAUTH = true
    let credentials = new LoginCredentials();
    credentials.userId = "OAuth"
    credentials.sessionToken = token
    credentials.secretMachineId = uuidv4();
    credentials.rememberMe = true;

    var result = await this.POST(
      "api/userSessions",
      credentials,
      new TimeSpan()
    );
    if (result.IsOK) {
      this.CurrentSession = new UserSession(result.Content);
      this.CurrentUser = new User();
      this.CurrentUser.Id = this.CurrentSession.UserId;
      this.CurrentUser.Username = credentials.Username;
      await this.UpdateCurrentUserInfo();
      this.UpdateCurrentUserMemberships();
      this.Friends.Update();
      this.OnLogin();
    } else
      throw new Error(
        "Error loging in: " + result.State + "\n" + result.Content
      );
    return result;


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
  async Login(
    credential,
    password,
    sessionToken,
    secretMachineId,
    rememberMe,
    recoverCode
  ) {
    this.Logout(false);
    this.OAuth.IsOAUTH = false
    let credentials = new LoginCredentials();
    credentials.password = password;
    credentials.recoverCode = recoverCode;
    credentials.sessionToken = sessionToken;
    credentials.secretMachineId = secretMachineId;
    credentials.rememberMe = rememberMe;
    if (credential.startsWith("U-")) credentials.ownerId = credential;
    else if (credential.includes("@")) credentials.email = credential;
    else credentials.username = credential;
    var result = await this.POST(
      "api/userSessions",
      credentials,
      new TimeSpan()
    );
    if (result.IsOK) {
      this.CurrentSession = new UserSession(result.Content);
      this.CurrentUser = new User();
      this.CurrentUser.Id = this.CurrentSession.UserId;
      this.CurrentUser.Username = credentials.Username;
      await this.UpdateCurrentUserInfo();
      await this.UpdateCurrentUserMemberships();
      this.Friends.Update();
      this.OnLogin({
        CurrentUser: this.CurrentUser,
        CurrentSession: this.CurrentSession
      });
    } else
      throw new Error(
        "Error loging in: " + result.State + "\n" + result.Content
      );
    return result;
  }
  async ExtendSession() {
    return await this.PATCH("api/userSessions", {}, new TimeSpan());
  }

  /**
   * Register a new Neos Account
   *
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @returns {Promise<CloudResult<User>>}
   * @memberof CloudXInterface
   */
  async Register(username, email, password) {
    this.Logout(false);
    return await this.POST(
      "/api/users",
      new User({
        username,
        email,
        password
      }),
      new TimeSpan()
    );
  }
  /**
   *
   *
   * @param {*} email
   * @returns {Promise<CloudResult>}
   * @memberof CloudXInterface
   */
  async RequestRecoveryCode(email) {
    return await this.POST(
      "/api/users/requestlostpassword",
      new User({
        email
      }),
      new TimeSpan()
    );
  }
  async UpdateCurrentUserInfo() {
    switch (this.CurrentUser.Id) {
      case null:
        throw new Error("No current user!");
      default:
        let user = await this.GetUser(this.CurrentUser.Id);
        let entity = user.Entity;
        if (
          user.IsOK &&
          this.CurrentUser != null &&
          this.CurrentUser.Id == entity.id
        ) {
          this.CurrentUser = entity;
          let patreonData = this.CurrentUser.PatreonData;
          let num = new Number();
          if (
            (patreonData != null ?
              patreonData.IsPatreonSupporter ?
              1 :
              0 :
              0) == 0
          ) {
            let tags = this.CurrentUser.Tags;
            if (tags.size > 0)
              num = tags != null ? (tags.includes(UserTags.NeosTeam) ? 1 : 0) : 0;
            else num = 0;
          } else num = 1;
          CloudXInterface.USE_CDN = num != 0;
        }
        return user;
    }
  }
  async GetUser(userId) {
    return await this.GET("api/users/" + userId, new TimeSpan());
  }
  async GetUserByName(username) {
    return await this.GET(
      "api/users/" + username + "?byUsername=true",
      new TimeSpan()
    );
  }
  async GetUsers(searchName) {
    return await this.GET(
      "api/users?name=" + Uri.EscapeDataString(searchName),
      new TimeSpan()
    );
  }
  async GetUserCached(userId) {
    return await this.GetUser(userId);
  }
  Logout(manualLogOut) {
    if (
      this.CurrentSession != null &&
      !this.CurrentSession.RememberMe | manualLogOut
    ) {
      let _userId = this.CurrentSession.UserId;
      let _sessionToken = this.CurrentSession.SessionToken;
      (async () => {
        await this.DELETE(
          "api/userSessions/" + _userId + "/" + _sessionToken,
          new TimeSpan()
        );
      })();
    }
    this._cryptoProvider = null;
    this.PublicKey; // TODO RSAParameters
    this.CurrentSession = null;
    this.CurrentUser = null;
    this.ClearMemberships();
    this.Friends = new FriendManager(this);
    CloudXInterface.USE_CDN = false;

    this.OnLogout();
  }
  SignHash(hash) {
    return this._cryptoProvider; //TODO Cryptography
  }
  /**
   * @template R
   *
   * @param {Uri} recordUri
   * @param {R} type
   * @memberof CloudXInterface
   */
  async FetchRecordCached(recordUri, type) {
    /** @type Dictionary<Uri, CloudResult> */
    let dictionary = new Out();
    if (!this.cachedRecords.TryGetValue(type, dictionary)) {
      dictionary = new Dictionary();
      this.cachedRecords.Add(type, dictionary);
    }
    let cloudResult = new Out();
    if (dictionary.TryGetValue(recordUri, cloudResult)) return cloudResult.Out;
    let cloudResult1 = await this.FetchRecord(recordUri);
    let out = new Out();
    this.cachedRecords.Get(type, out);
    /** @type Dictionary<Uri, CloudResult> */
    let cachedRecord = out.Out;
    cachedRecord.Remove(recordUri);
    cachedRecord.Add(recordUri, cloudResult1);
    return cloudResult1;
  }
  FetchRecord(ownerId, recordId) {
    if (!recordId) {
      let recordUri = ownerId;
      ownerId = new Out();
      let recordId = new Out();
      if (RecordUtil.ExtractRecordID(recordUri, ownerId, recordId))
        return this.FetchRecord(ownerId.Out, recordId.Out);
      let recordPath = new Out();
      if (RecordUtil.ExtractRecordPath(recordUri, ownerId, recordPath))
        return this.FetchRecordAtPath(ownerId.Out, recordPath.Out);
      throw new Error("Uri is not a record URI");
    } else {
      return this.GET(
        "api/" +
        CloudXInterface.GetOwnerPath(ownerId) +
        "/" +
        ownerId +
        "/records/" +
        recordId,
        new TimeSpan()
      );
    }
  }
  FetchRecordIRecord(recordUri) {
    var ownerId = [];
    var recordId = [];
    if (RecordUtil.ExtractRecordID(recordUri, ownerId, recordId))
      return this.FetchRecord(ownerId.Out, recordId.Out);
    var recordPath = [];
    if (RecordUtil.ExtractRecordPath(recordUri, ownerId, recordPath))
      return this.FetchRecordAtPath(ownerId.Out, recordPath.Out);
    throw new Error("Uri is not a record URI");
  }
  FetchRecordAtPath(ownerId, path) {
    return this.GET(
      "api/" +
      CloudXInterface.GetOwnerPath(ownerId) +
      "/" +
      ownerId +
      "/records/root/" +
      path,
      new TimeSpan()
    );
  }
  GetRecords(ownerId, tag = null, path = null) {
    let ownerPath = CloudXInterface.GetOwnerPath(ownerId);
    let str = "";
    if (tag != null) str = "?tag=" + Uri.EscapeDataString(tag);
    if (path != null) str = "?path=" + Uri.EscapeDataString(path);
    return this.GET("api/" + ownerPath + "/" + ownerId + "/records" + str);
  }
  /**
   *
   *
   * @param {SearchParameters} search
   * @returns
   * @memberof CloudXInterface
   */
  FindRecords(search) {
    return this.POST("/api/records/search", search, new TimeSpan());
  }
  UpsertRecord(record) {
    let resource;
    switch (IdUtil.GetOwnerType(record.OwnerId)) {
      case OwnerType.User:
        resource =
          "api/users/" + record.OwnerId + "/records/" + record.RecordId;
        break;
      case OwnerType.Group:
        resource =
          "api/groups/" + record.OwnerId + "/records/" + record.RecordId;
        break;
      default:
        throw new Error("Invalid record owner");
    }
    return this.PUT(resource, record, new TimeSpan());
  }
  PreprocessRecord(record) {
    let resource;
    switch (IdUtil.GetOwnerType(record.OwnerId)) {
      case OwnerType.User:
        resource =
          "api/users/" +
          record.OwnerId +
          "/records/" +
          record.RecordId +
          "/preprocess";
        break;
      case OwnerType.Group:
        resource =
          "api/groups/" +
          record.OwnerId +
          "/records/" +
          record.RecordId +
          "/preprocess";
        break;
      default:
        throw new Error("Invalid record owner");
    }
    return this.POST(resource, record, new TimeSpan());
  }
  GetPreprocessStatus(ownerId, recordId, id) {
    if (!recordId) {
      recordId = ownerId.RecordId;
      id = ownerId.PreprocessId;
      ownerId = ownerId.OwnerId;
    }
    let resource;
    switch (IdUtil.GetOwnerType(record.OwnerId)) {
      case OwnerType.User:
        resource =
          "api/users/" +
          record.OwnerId +
          "/records/" +
          record.RecordId +
          "/preprocess/" +
          id;
        break;
      case OwnerType.Group:
        resource =
          "api/groups/" +
          record.OwnerId +
          "/records/" +
          record.RecordId +
          "/preprocess/" +
          id;
        break;
      default:
        throw new Error("Invalid record owner");
    }
    return this.GET(resource, record, new TimeSpan());
  }
  async DeleteRecord(ownerId, recordId) {
    if (!recordId) {
      recordid = ownerId.RecordId;
      ownerId = ownerId.OwnerId;
    }
    let result = await this.DELETE(
      "api/users/" + ownerId + "/records/" + recordId,
      new TimeSpan()
    );
    await this.UpdateStorage(ownerId);
    return result;
  }
  AddTag(ownerId, recordId, tag) {
    switch (IdUtil.GetOwnerType(ownerId)) {
      case OwnerType.User:
        return this.PUT(
          "api/users/" + ownerId + "/records/" + recordId + "/tags",
          tag,
          new TimeSpan()
        );
      case OwnerType.Group:
        return this.PUT(
          "api/groups/" + ownerId + "/records/" + recordId + "/tags",
          tag,
          new TimeSpan()
        );
      default:
        throw new Error("Invalid record owner");
    }
  }
  async UpdateStorage(ownerId) {
    if (this.CurrentUser == null) return;
    let ownerType = IdUtil.GetOwnerType(ownerId);
    let _signedUserId = this.CurrentUser.Id;
    let numArray = CloudXInterface.storageUpdateDelays;
    for (index = 0; index < numArray.length; index++) {
      await TimeSpan.Delay(TimeSpan.fromSeconds(numArray[index]));
      if (this.CurrentUser.Id != _signedUserId) return;
      if (ownerType == OwnerType.User) {
        cloudResult = await this.UpdateCurrentUserInfo();
      } else {
        await this.UpdateGroupInfo(ownerId);
      }
    }
    numArray = null;
  }
  async FetchGlobalAssetInfo(hash) {
    return await this.GET("api/assets/" + hash.toLowerCase(), new TimeSpan());
  }
  async FetchUserAssetInfo(hash) {
    return await this.FetchAssetInfo(this.CurrentUser.Id, hash);
  }
  async FetchAssetInfo(ownerId, hash) {
    switch (IdUtil.GetOwnerType(ownerId)) {
      case OwnerType.User:
        return await this.GET(
          "api/users/" + ownerId + "/assets/" + hash,
          new TimeSpan()
        );
      case OwnerType.Group:
        return await this.GET(
          "api/groups/" + ownerId + "/assets/" + hash,
          new TimeSpan()
        );
      default:
        throw new Error("Invalid ownerId");
    }
  }
  async RegisterAssetInfo(assetInfo) {
    switch (IdUtil.GetOwnerType(assetInfo.OwnerId)) {
      case OwnerType.User:
        return await this.PUT(
          "api/users/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash,
          assetInfo,
          new TimeSpan()
        );
      case OwnerType.Group:
        return await this.PUT(
          "api/groups/" + assetInfo.OwnerId + "/assets/" + assetInfo.AssetHash,
          assetInfo,
          new TimeSpan()
        );
      default:
        throw new Error("Invalid ownerId");
    }
  }
  GetAssetBaseURL(ownerId, hash, variant) {
    hash = hash.toLowerCase();
    let str = hash;
    if (variant != null) str += "&" + variant;
    switch (IdUtil.GetOwnerType(ownerId)) {
      case OwnerType.User:
        return "api/users/" + ownerId + "/assets/" + str;
      case OwnerType.Group:
        return "api/groups/" + ownerId + "/assets/" + str;
      default:
        throw new Error("Invalid ownerId");
    }
  }
  async UploadAsset(
    ownerId,
    signature,
    variant,
    assetPath,
    retries = 5,
    progressIndicator = null
  ) {
    let cloudResult = await this.BeginUploadAsset(
      ownerId,
      signature,
      variant,
      assetPath,
      retries,
      progressIndicator,
      new Number()
    );
    if (!cloudResult.isOK) return cloudResult;
    return await this.WaitForAssetFinishProcessing(cloudResult.Entity);
  }
  EnqueueChunk(baseUrl, fileName, buffer, processingBuffers) {
    buffer.task = this.RunRequest(() => {}); //TODO Wtf is this
  }
  async TakeFinishedBuffer(buffers) {
    //TODO TakeFinishedBuffer
  }
  async BeginUploadAsset(
    ownerId,
    signature,
    variant,
    assetPath,
    retries = 5,
    progressIndicator = null,
    bytes = null
  ) {
    let fileName = Path.GetFileName(assetPath);
    //TODO finish
  }
  async WaitForAssetFinishProcessing(assetUpload) {
    let baseUrl =
      this.GetAssetBaseURL(
        assetUpload.OwnerId,
        assetUpload.Signature,
        assetUpload.Variant
      ) + "/chunks";
    let cloudResult;
    while (true) {
      cloudResult = await this.GET(baseUrl, new TimeSpan());
      if (
        !cloudResult.IsError &&
        cloudResult.Entity.UploadState != UploadState.Uploaded &&
        cloudResult.Entity.UploadState != UploadState.Failed
      )
        await TimeSpan.Delay(new TimeSpan(250));
      else break;
    }
    return cloudResult;
  }
  /**
   *
   *
   * @param {string} path
   * @returns {Promise<CloudResult<ThumbnailInfo>>}
   * @memberof CloudXInterface
   */
  UploadThumbnail(path) {
    return this.POST_File("api/thumbnails", path, "image/webp", null);
  }
  ExtendThumbnailLifetime(thumbnail) {
    return this.PATCH("api/thumbnails", thumbnail, new TimeSpan());
  }
  DeleteThumbnail(thumbnail) {
    return this.DELETE(
      "api/thumbnails/" + thumbnail.Id + "/" + thumbnail.Key,
      new TimeSpan()
    );
  }
  async GetGroup(groupId) {
    return await this.GET("api/groups/" + groupId, new TimeSpan());
  }
  async GetGroupCaches(groupId) {
    return await this.GetGroup(groupId);
  }
  async CreateGroup(group) {
    return await this.POST("api/groups", group, new TimeSpan());
  }
  async AddGroupMember(member) {
    return await this.POST(
      "api/groups/" + member.GroupId + "/members",
      member,
      new TimeSpan()
    );
  }
  async DeleteGroupMember(member) {
    return await this.DELETE(
      "api/groups/" + member.GroupId + "/members/" + member.UserId,
      new TimeSpan()
    );
  }
  async GetGroupMember(groupId, userId) {
    return await this.GET(
      "api/groups/" + groupId + "/members/" + userId,
      new TimeSpan()
    );
  }
  async GetGroupMembers(groupId) {
    return await this.GET("api/groups/" + groupId + "/members", new TimeSpan());
  }
  async UpdateCurrentUserMemberships() {
    let groupMemberships = await this.GetUserGroupMemberships();
    if (groupMemberships.isOK) this.SetMemberships(groupMemberships.Entity);
    return groupMemberships;
  }
  async GetUserGroupMemberships(userId) {
    if (!userId) return await this.GetUserGroupMemberships(this.CurrentUser.Id);
    return await this.GET(
      "api/users/" + userId + "/memberships",
      new TimeSpan()
    );
  }
  /**
   *
   * @returns {Task}
   * @param {string} groupId
   * @memberof CloudXInterface
   */
  async UpdateGroupInfo(groupId) {
    /** @type {Task<CloudResult<Group>>>} */
    let group = this.GetGroup(groupId);
    /** @type {Task<CloudResult<Member>>>} */
    let memberTask = this.GetGroupMember(groupId, this.CurrentUser.Id);
    /** @type {CloudResult<Group>>} */
    let groupResult = await group;
    /** @type {CloudResult<Member>>} */
    let cloudResult = await memberTask;
    if (groupResult.IsOK) {
      this._groups.Remove(groupId);
      this._groups.Add(groupId, new Group(groupResult.Entity));
      let groupUpdated = this.GroupUpdated;
      if (groupUpdated != null) groupUpdated(groupResult.Entity);
    }
    if (!cloudResult.IsOK) return;
    this._groupMemberInfos.Remove(groupId);
    this._groupMemberInfos.Add(groupId, new Member(cloudResult.Entity));
    let groupMemberUpdated = this.GroupMemberUpdated;
    if (groupMemberUpdated == null) return;
    groupMemberUpdated(cloudResult.Entity);
  }
  async UpsertSubmission(groupId, ownerId, recordId, feature = false) {
    return await this.PUT(
      "api/groups/" + groupId + "/submissions",
      new Submission({
          groupId,
          feature,
          targetRecordId: new RecordId(ownerId, recordId)
        },
        new TimeSpan()
      )
    );
  }
  async DeleteSubmission(groupId, submissionId) {
    return await this.DELETE(
      "api/groups/" + groupId + "/submissions/" + submissionId,
      new TimeSpan()
    );
  }
  static GetOwnerPath(ownerId) {
    switch (IdUtil.GetOwnerType(ownerId)) {
      case OwnerType.User:
        return "users";
      case OwnerType.Group:
        return "groups";
      default:
        throw new Error("Invalid Owner Type: " + ownerId);
    }
  }
  /**
   *
   *
   * @param {CloudVariableDefinition} definition
   * @returns
   * @memberof CloudXInterface
   */
  async UpsertVariableDefinition(definition) {
    return await this.PUT(
      "api/" +
      CloudXInterface.GetOwnerPath(definition.DefinitionOwnerId) +
      "/" +
      definition.DefinitionOwnerId +
      "/vardefs/" +
      definition.Subpath,
      definition,
      new TimeSpan()
    ).then(b => {
      b.COntent = new CloudVariableDefinition(b.Entity);
    });
  }
  async ReadGlobalVariable(path) {
    return await this.ReadVariable("GLOBAL", path);
  }
  async ReadVariable(ownerId, path) {
    if (!path) return await this.ReadVariable(this.CurrentUser.Id, ownerId);
    let cloudXInterface = this;
    let resource;
    if (ownerId == "GLOBAL") resource = "api/globalvars/" + path;
    else
      resource =
      "api/" +
      CloudXInterface.GetOwnerPath(ownerId) +
      "/" +
      ownerId +
      "/vars/" +
      path;
    let cloudResult = await cloudXInterface.GET(resource, new TimeSpan());
    if (cloudResult.IsOK) {
      switch (cloudResult.Entity.Value) {
        case null:
          break;
        default:
          return new CloudResult(
            "error",
            cloudResult.State,
            cloudResult.Content
          );
          //TODO Deserialize
      }
    }
    return new CloudResult("default", cloudResult.State, cloudResult.Content);
  }
  SerializationErrorHandeler() {}
  /**
   * Write a Variable
   * - If ownerId is Omitted and arguments are shifter, CurrentUser will be used
   * @template T
   * @param {string | string} ownerId OwnerID | Path
   * @param {string | T} path Path or T
   * @param {T} [value]
   * @memberof CloudXInterface
   */
  async WriteVariable(ownerId, path, value) {
    if (!value)
      return await this.WriteVariable(this.CurrentUser.Id, ownerId, path);
    return await this.PUT(
      "api/" +
      CloudXInterface.GetOwnerPath(ownerId) +
      "/" +
      ownerId +
      "/vars/" +
      path,
      new CloudVariable({
        value: JSON.stringify(value)
      }, new TimeSpan())
    );
  }
  async DeleteVariable(ownerId, path) {
    if (!path) return await this.DeleteVariable(this.CurrentUser.Id, ownerId);
    return await this.DELETE(
      "api/" + CloudXInterface.GetOwnerPath(ownerId) + "/vars/" + path,
      new TimeSpan()
    );
  }
  /**
   *
   * @returns {Promise<CloudResult>}
   * @param {Visit} visit
   * @memberof CloudXInterface
   */
  async LogVisit(visit) {
    return await this.POST("api/visits", visit, new TimeSpan());
  }
  /**
   *
   * @returns {Promise<CloudResult<NeosSession>>}
   * @param {NeosSession} session
   * @memberof CloudXInterface
   */
  async CreateNeosSession(session) {
    return await this.POST("api/neosSessions", session, new TimeSpan()).then(
      b => {
        b.Content = new NeosSession(b.Entity);
        return b;
      }
    );
  }
  /**
   *
   * @param {NeosSession} session
   * @returns {Promise<CloudResult<NeosSession>>}
   * @memberof CloudXInterface
   */
  async PatchNeosSession(session) {
    return await this.PATCH("api/neosSessions", session, new TimeSpan()).then(
      b => {
        b.Content = new NeosSession(b.Entity);
        return b;
      }
    );
  }
  /**
   * Get User Status
   *
   * @param {string} userId
   * @returns {Promise<CloudResult<UserStatus>>}
   * @memberof CloudXInterface
   */
  async GetStatus(userId) {
    return await this.GET(
      "api/users/" + userId + "/status",
      new TimeSpan()
    ).then(b => {
      b.Content = new UserStatus(b.Entity);
      return b;
    });
  }
  /**
   * Update the User Status
   * -If not userId is supplied, uses Current User, Refer to Examples
   *
   * @param {string | UserStatus} userId
   * @param {UserStatus} [status]
   * @returns {Promise<CloudResult>}
   * @memberof CloudXInterface
   * @example
   * await UpdateStatus(userId, UserStatus)
   * await UpdateStatus(UserStatus)
   */
  async UpdateStatus(userId, status) {
    if (!status) return await this.UpdateStatus(this.CurrentUser.Id, userId);
    return await this.PUT(
      "api/users/" + userId + "/status",
      status,
      new TimeSpan()
    );
  }
  /**
   * Update the User Profile
   *
   * @param {string | UserProfile} userId
   * @param {UserProfile} [profile]
   * @memberof CloudXInterface
   * @returns {Promise<CloudResult>}
   * @example
   * await UpdateProfile(userId, UserProfile)
   * await UpdateProfile(UserProfile)
   */
  async UpdateProfile(userId, profile) {
    if (!profile) {
      this.CurrentUser.Profile = userId;
      return await this.UpdateProfile(this.CurrentUser.Id);
    }
    return await this.PUT(
      "api/users/" + userId + "/profile",
      profile,
      new TimeSpan()
    );
  }
  /**
   *
   *
   * @param {string | Date} userId
   * @param {Date} [lastStatusUpdate = null]
   * @memberof CloudXInterface
   * @returns {Promise<CloudResult<List<Friend>>>>}
   */
  async GetFriends(userId, lastStatusUpdate = null, count = 0) {
    if (count > 10) return new List();
    if (typeof userId != "string")
      return await this.GetFriends(this.CurrentUser.Id, userId, ++count);
    let str = "";
    if (lastStatusUpdate)
      str += "?lastStatusUpdate=" + encodeURI(lastStatusUpdate.toUTCString());
    return await this.GET(
      "api/users/" + userId + "/friends" + str,
      new TimeSpan()
    ).then(b => {
      let a = new List();
      for (let item of b.Entity) a.Add(new Friend(item));
      b.Content = a;
      return b;
    });
  }
  /**
   * Add a Friend Record
   *
   * @param {Friend} friend
   * @returns {Promise<CloudResult>}
   * @memberof CloudXInterface
   */
  async UpsertFriend(friend) {
    if (String.IsNullOrWhiteSpace(friend.OwnerId))
      throw new Error("Argument Acception: friend.OwnerId");
    if (String.IsNullOrWhiteSpace(friend.FriendUserId))
      throw new Error("Argument Acception: friend.FriendUserId");
    return await this.PUT(
      "api/users/" + friend.OwnerId + "/friends/" + friend.FriendUserId,
      friend,
      new TimeSpan()
    );
  }
  /**
   * Remove a Friend
   *
   * @param {Friend} friend
   * @returns {Promise<CloudResult>}
   * @memberof CloudXInterface
   */
  async DeleteFriend(friend) {
    if (String.IsNullOrWhiteSpace(friend.OwnerId))
      throw new Error("Argument Acception: friend.OwnerId");
    if (String.IsNullOrWhiteSpace(friend.FriendUserId))
      throw new Error("Argument Acception: friend.FriendUserId");
    return await this.DELETE(
      "api/users/" + friend.OwnerId + "/friends/" + friend.FriendUserId,
      friend,
      new TimeSpan()
    );
  }
  /**
   * Send a Message Object
   * - Requires Sender be friends with Recipient
   * @param {Message} message
   * @returns {Promise<CloudResult<Message>>}
   * @memberof CloudXInterface
   */
  async SendMessage(message) {
    return await this.POST(
      "api/users/" + message.RecipientId + "/messages",
      message,
      new TimeSpan()
    );
  }
  /**
   * Return all unread messages
   * @returns {Promise<CloudResult<List<Message>>>}
   * @param {Date} [fromTime=null]
   * @memberof CloudXInterface
   */
  async GetUnreadMessages(fromTime = null) {
    return await this.GetMessages(fromTime, -1, null, true);
  }
  /**
   * Get message history with `user`
   *
   * @param {string} user
   * @param {number} [maxItems=100]
   * @returns {Promise<CloudResult<List<Message>>>}
   * @memberof CloudXInterface
   */
  async GetMessageHistory(user, maxItems = 100) {
    return await this.GetMessages(new Date(), maxItems, user, false);
  }
  /**
   * Get messages
   *
   * @param {Date} [fromTime]
   * @param {Number} maxItems
   * @param {String} user
   * @param {Boolean} unreadOnly
   * @returns {Promise<CloudResult<List<Message>>>}
   * @memberof CloudXInterface
   */
  async GetMessages(fromTime, maxItems, user, unreadOnly) {
    let stringBuilder = new StringBuilder();
    stringBuilder.Append(`?maxItems=${maxItems}`);
    if (fromTime)
      stringBuilder.Append(
        `&fromTime=${Uri.EscapeDataString(fromTime.toUTCString())}`
      );
    if (user != null)
      stringBuilder.Append(`&user=${Uri.EscapeDataString(user)}`);
    if (unreadOnly) stringBuilder.Append("&unread=true");
    return await this.GET(
      `api/users/${this.CurrentUser.Id}/messages${stringBuilder.toString()}`,
      new TimeSpan()
    ).then(b => {
      let a = new List();
      for (let item of b.Entity) a.Add(new Message(item));
      b.Content = a;
      return b;
    });
  }
  /**
   * Mark Messages as Read
   *
   * @param {List<String>} messageIds
   * @returns {Promise<CloudResult>}
   * @memberof CloudXInterface
   */
  async MarkMessagesRead(messageIds) {
    switch (messageIds[0].constructor.name) {
      case "String":
        return await this.PATCH(
          "api/users/" + this.CurrentUser.Id + "/messages",
          messageIds,
          new TimeSpan()
        );
      case "Message":
        return await this.MarkMessagesRead(messageIds.map(m => m.Id));
    }
  }
  /**
   *
   *
   * @param {SessionUpdate} update
   * @returns {Promise<CloudResult>}
   * @memberof CloudXInterface
   */
  async UpdateSessions(update) {
    return await this.PUT("api/sessions/", update, new TimeSpan());
  }
  /**
   *
   *
   * @param {string} sessionId Session Id
   * @returns {Promise<CloudResult<SessionInfo>>}
   * @memberof CloudXInterface
   */
  async GetSession(sessionId) {
    return await this.GET("api/sessions/" + sessionId, new TimeSpan()).then(
      b => new SessionInfo(b.Entity)
    );
  }
  /**
   *
   *
   * @returns {Promise<CloudResult>}
   * @memberof CloudXInterface
   */
  async Ping() {
    return await this.GET("api/testing/ping", new TimeSpan());
  }
  NotifyOnlineInstance(machineId) {
    return this.POST(
      "api/stats/instanceOnline/" + machineId, {},
      new TimeSpan()
    );
  }
  async GetOnlineInstanceCount(machineId) {
    let cloudResult = await this.GET(
      "api/stats/onlineInstances/",
      new TimeSpan()
    );
    let result = new Out();
    return !cloudResult.IsOK() ||
      Number.TryParseInt(cloudResult.Content, result) ?
      -1 :
      result.Out;
  }
  /**
   * Fetch Neos Server Statistics
   *
   * @returns {Promise<CloudResult<ServerStatistics>>}
   * @memberof CloudXInterface
   */
  async GetServerStatistics() {
    try {
      var request = new HttpRequestMessage(
        HttpMethod.Get,
        "https://cloudxstorage.blob.core.windows.net/install/ServerResponse"
      );
      return await this.HttpClient.SendAsync(request).then(
        httpResponseMessage => {
          if (!httpResponseMessage.IsSuccessStatusCode)
            return new CloudResult(null, httpResponseMessage.StatusCode, null);
          let contentLength = httpResponseMessage.Headers["content-length"];
          let num = 0;
          if (!(contentLength > num)) return null;
          return new CloudResult(
            undefined,
            200,
            new ServerStatistics(httpResponseMessage.Content)
          );
        }
      );
    } catch (error) {
      console.error(error)
      return null;
    }
  }

  /**
   *
   * @returns {Promise<Number>}
   * @memberof CloudXInterface
   */
  async GetOnlineUserCount() {
    let cloudResult = await this.GET("api/stats/onlineUsers", new TimeSpan());
    return !cloudResult.IsOK || !Number.parseInt(cloudResult.Content) ?
      -1 :
      Number.parseInt(cloudResult.Content);
  }
}
module.exports = {
  CloudXInterface
}