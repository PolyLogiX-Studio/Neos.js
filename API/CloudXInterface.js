const { Uri } = require("./Uri");
const { StringBuilder } = require("./StringBuilder");
const { RecordUtil } = require("./RecordUtil");
const { List } = require("./List");
const { SessionInfo } = require("./SessionInfo");
const { Dictionary } = require("./Dictionary");
const { Type } = require("./Type");
const { IdUtil } = require("./IdUtil");
const { OwnerType } = require("./OwnerType");
const { TimeSpan } = require("./TimeSpan");
const { HttpMethod } = require("./HttpMethod");
const { HttpRequestMessage } = require("./HttpRequestMessage");
// eslint-disable-next-line no-unused-vars
const { HttpResponseMessage } = require("./HttpResponseMessage"); //lgtm [js/unused-local-variable]
const { CancellationTokenSource } = require("./CancellationTokenSource");
const { CloudResult } = require("./CloudResult");
const { LoginCredentials } = require("./LoginCredentials");
const { AuthenticationHeaderValue } = require("./AuthenticationHeaderValue");
const { User } = require("./User");
const { Friend } = require("./Friend");
const { Message } = require("./Message");
const { ServerStatistics } = require("./ServerStatistics");
const { UserTags } = require("./UserTags");
const { Out } = require("./Out");
const { Enumerable } = require("./Enumerable");
//const { v4: uuidv4 } = require("uuid");
const { HTTP_CLIENT } = require("./HTTP_CLIENT");
const { FriendManager } = require("./FriendManager");
const { MessageManager } = require("./MessageManager");
const { TransactionManager } = require("./TransactionManager");
//const { SearchResults } = require("./SearchResults");
const { ProductInfoHeaderValue } = require("./ProductInfoHeaderValue");
const { UserSession } = require("./UserSession");
const { ServerStatus } = require("./ServerStatus");
const { Group } = require("./Group");
const { Member } = require("./Member");
const { CloudVariableDefinition } = require("./CloudVariableDefinition");
const { NeosSession } = require("./NeosSession");
const { UserStatus } = require("./UserStatus");
////const Path = require("path");
////const fs = require("fs");
const { UploadState } = require("./UploadState");
const { Submission } = require("./Submission");
const { RecordId } = require("./RecordId");
const { CloudVariable } = require("./CloudVariable");
const { NeosDB_Endpoint } = require("./NeosDB_Endpoint");
const { CloudX } = require("../Neos");
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
			Permissions: 0,
		};
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
		/** @type Function */
		this.SessionChanged;
		/** @type Function */
		this.UserUpdated;
		/** @type Function */
		this.MembershipsUpdated;
		/** @type Function */
		this.GroupUpdated;
		/** @type Function */
		this.GroupMemberUpdated;
		//Setup Private Properties
		//this.CloudXInterface()
		this.Events = BUS;
		Object.defineProperties(this, {
			_groupMemberships: {
				value: new List(),
				writable: true,
			},
			_groupMemberInfos: {
				value: new Dictionary(),
				writable: true,
			},
			_USE_CDN: {
				value: false,
				writable: true,
			},
			_groups: {
				value: new Dictionary(),
				writable: true,
			},
			_currentSession: {
				value: new UserSession(),
				configurable: true,
			},
			_currentUser: {
				writable: true,
			},
			_cryptoProvider: {
				writable: true,
			},
			_storageDirty: {
				value: new Dictionary(),
				writable: true,
			},
			_updatingStorage: {
				value: new Dictionary(),
				writable: true,
			},
			_currentAuthenticationHeader: {
				value: null,
				writable: true,
			},
			_lastSessionUpdate: {
				value: new Date(0),
				writable: true,
			},
			_lastServerStatsUpdate: {
				value: new Date(0),
				writable: true,
			},
			lockobj: {
				value: "CloudXLockObj",
			},
		});
	}

	static get CloudEndpoint() {
		return new Enumerable(["Production", "Staging", "Local", "PolyLogiXOAUTH"]);
	}

	static get DEFAULT_RETRIES() {
		return 5;
	}
	static get UPLOAD_DEGREE_OF_PARALLELISM() {
		return 16;
	}
	static get DEBUG_UPLOAD() {
		return false;
	}
	static get storageUpdateDelays() {
		return [1, 5, 15, 30];
	}
	static get JSON_MEDIA_TYPE() {
		return {
			"Content-Type": "application/json",
		};
	}
	static get SESSION_EXTEND_INTERVAL() {
		return 3600;
	}
	/** @type Action<string> */
	static get ProfilerBeginSampleCallback() {
		return null;
	}
	/** @type Action */
	static get ProfilerEndSampleCallback() {
		return null;
	}
	/** @type Func<MemoryStream> */
	static get MemoryStreamAllocator() {
		return null;
	}
	static get USE_CDN() {
		return false;
	}
	static get CLOUDX_PRODUCTION_NEOS_API() {
		return "https://www.neosvr-api.com/";
	}
	static get CLOUDX_STAGING_NEOS_API() {
		return "https://cloudx-staging.azurewebsites.net/";
	}
	static get POLYLOGIX_OAUTH_API() {
		return "https://www.polylogix.studio/api/_NeosOAuth/";
	}
	static get CLOUDX_NEOS_BLOB() {
		return "https://cloudxstorage.blob.core.windows.net/";
	}
	static get CLOUDX_NEOS_CDN() {
		return "https://cloudx.azureedge.net/";
	}
	static get LOCAL_NEOS_API() {
		return "http://localhost:60612/";
	}
	static get LOCAL_NEOS_BLOB() {
		return "http://127.0.0.1:10000/devstoreaccount1/";
	}
	static get CLOUDX_NEOS_VIDEO_CDN() {
		return "https://cloudx-video.azureedge.net/";
	}
	ProfilerBeginSample() {
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
			return "https://oauth.neosdb.net/"; // Custom Server
		default:
			return new Error(
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
		case CloudXInterface.CloudEndpoint.Production:
		case CloudXInterface.CloudEndpoint.Staging:
		case CloudXInterface.CloudEndpoint.Local:
			return CloudXInterface.NEOS_CLOUD_BLOB;
		default:
			return new Error(
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
	static get NEOS_ASSETS_VIDEO_CDN() {
		return "https://cloudx-video.azureedge.net/assets/";
	}
	static get NEOS_CLOUD_BLOB() {
		return !CloudXInterface.USE_CDN
			? "https://cloudxstorage.blob.core.windows.net/"
			: "https://cloudx.azureedge.net/";
	}
	/**
	 * Recalculate Server Ping and Response Time
	 *
	 * @readonly
	 * @memberof CloudXInterface
	 */
	get ServerStatus() {
		if (
			new Date(new Date() - this.LastServerStateFetch).getTime() / 1000 >=
			60.0
		)
			return ServerStatus.NoInternet;
		if (new Date(new Date() - this.LastServerUpdate).getTime() / 1000 >= 60.0) {
			return ServerStatus.Down;
		}
		return this.ServerResponseTime > 500
			? ServerStatus.Slow
			: ServerStatus.Good;
	}
	/**
	 * The Current User Object
	 *
	 * @memberof CloudXInterface
	 */
	get CurrentUser() {
		return this._currentUser;
	}

	OnError(error) {
		//Overridable Error Output
		throw new Error(error);
	}
	set CurrentUser(value) {
		if (value === this._currentUser) return;
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
					configurable: true,
				},
			});
			return;
		}
		if (value === this._currentSession) return;
		if (!this._currentSession)
			Object.defineProperties(this, {
				_currentSession: {
					value: new UserSession(),
					configurable: true,
				},
			});
		if (this._currentSession.SessionToken !== value.SessionToken)
			this._lastSessionUpdate = new Date();
		Object.defineProperties(this, {
			_currentSession: {
				value,
				configurable: true,
			},
		});
		//Use the Neos Schema
		this._currentAuthenticationHeader = new AuthenticationHeaderValue(
			"neos", //lgtm [js/hardcoded-credentials]
			value.UserId + ":" + value.SessionToken
		).Authorization;

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
		return this.TryGetCurrentUserGroupMemberInfo(groupId) != null;
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
				new Date(new Date() - this._lastSessionUpdate).getTime() / 1000 >=
				3600.0
			) {
				this.ExtendSession();
				this._lastSessionUpdate = new Date();
			}
		}
		if (
			new Date(new Date() - this._lastServerStatsUpdate).getTime() / 1000 >=
			10.0
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
		for (let keyValuePair of this._storageDirty) {
			if (this._updatingStorage.TryAdd(keyValuePair.Key, true)) {
				let _ownerId = keyValuePair.Key(async () => {
					await this.UpdateStorage(_ownerId);
				})();
			}
		}
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
			return ownerId === this.CurrentUser.Id;
		case OwnerType.Group:
			return this.CurrentUserMemberships.Any((m) => m.GroupId === ownerId);
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
		if (this._groupMemberships.length === 0) return;
		this._groupMemberships = new List();
		this.RunMembershipsUpdated();
	}
	async RunMembershipsUpdated() {
		for (let groupMembership of this._groupMemberships) {
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
	 * @param {NeosDB_Endpoint} forceCDN
	 * @returns
	 * @memberof CloudXInterface
	 */
	static NeosDBToHttp(neosdb, endpoint) {
		if (!(neosdb instanceof Uri)) neosdb = new Uri(neosdb);
		let str1 = CloudXInterface.NeosDBSignature(neosdb);
		let str2 = CloudXInterface.NeosDBQuery(neosdb);
		let str3 = str1;
		if (str2 != null) str3 = str3 + "/" + str2;
		if (CloudXInterface.IsLegacyNeosDB(neosdb))
			return new Uri("https://neoscloud.blob.core.windows.net/assets/" + str3);
		let str4 = new String(); //lgtm [js/useless-assignment-to-local] Error Avoidance
		switch (endpoint) {
		case NeosDB_Endpoint.Blob:
			str4 = CloudXInterface.NEOS_ASSETS_BLOB;
			break;
		case NeosDB_Endpoint.CDN:
			str4 = CloudXInterface.NEOS_ASSETS_CDN;
			break;
		case NeosDB_Endpoint.VideoCDN:
			str4 = CloudXInterface.NEOS_ASSETS_VIDEO_CDN;
			break;
		default:
			str4 = CloudXInterface.NEOS_ASSETS;
			break;
		}
		return new Uri(str4 + str3);
	}
	static FilterNeosURL(assetURL) {
		if (
			assetURL.Scheme === "neosdb" &&
			assetURL.Segments.length >= 2 &&
			assetURL.Segments.includes(".")
		)
			assetURL = new Uri(
				"neosdb:///" + assetURL.Segments[1].noExtension() + assetURL.Query
			);
		return assetURL;
	}
	static NeosDBFilename(neosdb) {
		return neosdb.Segments[1] + neosdb.Query;
	}
	static NeosDBSignature(neosdb) {
		return neosdb.Segments[1].noExtension();
	}
	static NeosDBQuery(neosdb) {
		if (neosdb.Query == null || neosdb.Query === "") return null;
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
		if (uri.Scheme !== "neosdb") return false;
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
	/*
	AddFileToRequest(request, filePath, mime = null, progressIndicator = null) {
		////let fileStream = fs.readFile(filePath);
		//TODO Multi Part Form Content
		//if (mime != null)
	}
*/
	/**
	 *
	 * @param {string} resource
	 * @param {HttpMethod} method
	 * @returns {HttpRequestMessage}
	 */
	CreateRequest(resource, method) {
		let Endpoint;
		if (this.OAuth) {
			if (this.OAuth.IsOAUTH)
				Endpoint = CloudXInterface.POLYLOGIX_OAUTH_API + resource;
			else Endpoint = CloudXInterface.NEOS_API + resource;
		} else {
			Endpoint = CloudXInterface.NEOS_API + resource;
		}
		let request = new HttpRequestMessage(method, Endpoint);
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
		////let exception = null;
		let remainingRetries = CloudXInterface.DEFAULT_RETRIES; //lgtm [js/useless-assignment-to-local] False Positive
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
				//TODO Error
				request = null;
				await TimeSpan.Delay(new TimeSpan(delay));
				delay += 250;
			}
			return result; //BYPASS
		} while (result == null && remainingRetries-- > 0);
		/*
    if (result == null) {
      if (exception == null)
        return this.OnError("Failed to get response. Exception is null");
      return this.OnError(exception);
    }
    let entity;
    let content = null;
    if (result.IsSuccessStatusCode) {
      if (typeof result.Content === "string") {
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
        } finally {
        }
      }
    } else {
      content = await result.Content;
      return new CloudResult(entity, result.StatusCode, content);
    }
    */
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
		this.OAuth.IsOAUTH = false;
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
				CurrentSession: this.CurrentSession,
			});
		} else
			return this.OnError(
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
				password,
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
				email,
			}),
			new TimeSpan()
		);
	}
	async UpdateCurrentUserInfo() {
		var user;
		var entity;
		switch (this.CurrentUser.Id) {
		case null:
			return this.OnError("No current user!");
		default:
			user = await this.GetUser(this.CurrentUser.Id);
			entity = user.Entity;
			if (
				user.IsOK &&
					this.CurrentUser != null &&
					this.CurrentUser.Id === entity.id
			) {
				this.CurrentUser = entity;
				let patreonData = this.CurrentUser.PatreonData;
				let num = new Number(0); //lgtm [js/useless-assignment-to-local] False Positive
				if (
					(patreonData != null
						? patreonData.IsPatreonSupporter
							? 1
							: 0
						: 0) === 0
				) {
					let tags = this.CurrentUser.Tags;
					if (tags.size > 0)
						num =
								tags != null ? (tags.includes(UserTags.NeosTeam) ? 1 : 0) : 0;
					else num = 0;
				} else num = 1;
				this._USE_CDN = num !== 0;
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
		this.PublicKey = null; // TODO RSAParameters
		this.CurrentSession = null;
		this.CurrentUser = null;
		this.ClearMemberships();
		this.Friends = new FriendManager(this);
		this._USE_CDN = false;

		this.OnLogout();
	}
	/*
	SignHash(hash) {
		return this._cryptoProvider; //TODO Cryptography
	}
	*/
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
			return this.OnError("Uri is not a record URI");
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
		return this.OnError("Uri is not a record URI");
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
	GetRecordsList() {}
	GetRecordsFull(ownerId, tag = null, path = null) {
		let ownerPath = CloudXInterface.GetOwnerPath(ownerId);
		let str = "";
		if (tag != null) str = "?tag=" + Uri.EscapeDataString(tag);
		if (path != null) str = "?path=" + Uri.EscapeDataString(path);
		return this.GET("api/" + ownerPath + "/" + ownerId + "/records" + str);
	}
	GetRecords(a, b, c) {
		let type = Type.Get(a);
		if (type === "Array") return this.GetRecordsList(List.ToList(a));
		if (type === "List") return this.GetRecordsList(a);
		return this.GetRecordsFull(a, b, c);
	}
	/**
	 *
	 *
	 * @param {SearchParameters} search
	 * @returns
	 * @memberof CloudXInterface
	 */
	FindRecords(search) {
		return this.POST("/api/records/pagedSearch", search, new TimeSpan());
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
			return this.OnError("Invalid record owner");
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
			return this.OnError("Invalid record owner");
		}
		return this.POST(resource, record, new TimeSpan());
	}
	/*
	GetPreprocessStatus(ownerId, recordId, id) {
		return this.OnError("Not Implimented");
		
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
        return this.OnError("Invalid record owner");
    }
    return this.GET(resource, record, new TimeSpan());
    
	}
	*/
	async DeleteRecord(ownerId, recordId) {
		if (!recordId) {
			recordId = ownerId.RecordId;
			ownerId = ownerId.OwnerId;
		}
		let result = await this.DELETE(
			"api/users/" + ownerId + "/records/" + recordId,
			new TimeSpan()
		);
		this.MarkStorageDirty(ownerId);
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
			return this.OnError("Invalid record owner");
		}
	}
	MarkStorageDirty(ownerId) {
		this._storageDirty.TryAdd(ownerId, true);
	}
	async UpdateStorage(ownerId) {
		if (this.CurrentUser != null) {
			let ownerType = IdUtil.GetOwnerType(ownerId);
			let _signedUserId = this.CurrentUser.Id;
			let numArray = CloudXInterface.storageUpdateDelays;
			for (let index = 0; index < numArray.length; index++) {
				await TimeSpan.Delay(TimeSpan.fromSeconds(numArray[index]));
				if (!(this.CurrentUser.Id !== _signedUserId)) {
					if (ownerType === OwnerType.User) {
						await this.UpdateCurrentUserInfo();
					} else {
						await this.UpdateGroupInfo(ownerId);
					}
				} else break;
			}
			numArray = null;
			_signedUserId = null;
		}
		this._updatingStorage.TryRemove(ownerId, []);
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
			return this.OnError("Invalid ownerId");
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
			return this.OnError("Invalid ownerId");
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
			return this.OnError("Invalid ownerId");
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
	/*
	EnqueueChunk(baseUrl, fileName, buffer, processingBuffers) {
		buffer.task = this.RunRequest(() => {}); //TODO Wtf is this
	}
	*/
	async TakeFinishedBuffer() {
		//TODO TakeFinishedBuffer
	}
	/*
	async BeginUploadAsset(
		ownerId,
		signature,
		variant,
		assetPath,
		retries = 5,
		progressIndicator = null,
		bytes = null //TODO
	) {
		//	let fileName = Path.GetFileName(assetPath);
		//TODO finish
	}
	*/
	async WaitForAssetFinishProcessing(assetUpload) {
		let baseUrl =
			this.GetAssetBaseURL(
				assetUpload.OwnerId,
				assetUpload.Signature,
				assetUpload.Variant
			) + "/chunks";
		let cloudResult;
		let condition = true;
		while (condition) {
			cloudResult = await this.GET(baseUrl, new TimeSpan());
			if (
				!cloudResult.IsError &&
				cloudResult.Entity.UploadState !== UploadState.Uploaded &&
				cloudResult.Entity.UploadState !== UploadState.Failed
			)
				await TimeSpan.Delay(new TimeSpan(250));
			else condition = false;
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
		var res = await this.GET("api/groups/" + groupId, new TimeSpan());
		res.Content = new CloudX.Shared.Group(res.Entity);
		return res;
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

	/**
	 *
	 *
	 * @param {*} member
	 * @returns {Promise<CloudResult<Member>>}
	 * @memberof CloudXInterface
	 */
	async DeleteGroupMember(member) {
		return await this.DELETE(
			"api/groups/" + member.GroupId + "/members/" + member.UserId,
			new TimeSpan()
		);
	}

	/**
	 *
	 *
	 * @param {*} groupId
	 * @param {*} userId
	 * @returns {Promise<CloudResult<Member>>}
	 * @memberof CloudXInterface
	 */
	async GetGroupMember(groupId, userId) {
		var res = await this.GET(
			"api/groups/" + groupId + "/members/" + userId,
			new TimeSpan()
		);
		res.Content = new CloudX.Shared.Member(res.Entity);
		return res;
	}

	/**
	 *
	 *
	 * @param {*} groupId
	 * @returns{Promise<CloudResult<List<Member>>>}
	 * @memberof CloudXInterface
	 */
	async GetGroupMembers(groupId) {
		var res = await this.GET(
			"api/groups/" + groupId + "/members",
			new TimeSpan()
		);
		let MemberList = new CloudX.Util.List();
		for (let Member of res) {
			MemberList.Add(Member);
		}
		res.Content = MemberList;
		return res;
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
			new Submission(
				{
					groupId,
					feature,
					targetRecordId: new RecordId(ownerId, recordId),
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
			return new Error("Invalid Owner Type: " + ownerId);
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
		).then((b) => {
			b.Content = new CloudVariableDefinition(b.Entity);
		});
	}
	async ReadGlobalVariable(path) {
		return await this.ReadVariable("GLOBAL", path);
	}
	async ReadVariable(ownerId, path) {
		if (!path) return await this.ReadVariable(this.CurrentUser.Id, ownerId);
		let cloudXInterface = this;
		let resource;
		if (ownerId === "GLOBAL") resource = "api/globalvars/" + path;
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
	SerializatiOnErrorHandeler() {}
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
			new CloudVariable(
				{
					value: JSON.stringify(value),
				},
				new TimeSpan()
			)
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
			(b) => {
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
			(b) => {
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
		).then((b) => {
			b.Content = new UserStatus(b.Entity);
			return b;
		});
	}
	async GetRandomExitMessage() {
		return await this.GET("api/exitMessage", new TimeSpan()).Entity;
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
		if (typeof userId !== "string")
			return await this.GetFriends(this.CurrentUser.Id, userId, ++count);
		let str = "";
		if (lastStatusUpdate)
			str += "?lastStatusUpdate=" + encodeURI(lastStatusUpdate.toUTCString());
		return await this.GET(
			"api/users/" + userId + "/friends" + str,
			new TimeSpan()
		).then((b) => {
			if (b.IsError) return b;
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
			return this.OnError("Argument Acception: friend.OwnerId");
		if (String.IsNullOrWhiteSpace(friend.FriendUserId))
			return this.OnError("Argument Acception: friend.FriendUserId");
		return await this.PUT(
			"api/users/" + friend.OwnerId + "/friends/" + friend.FriendUserId,
			friend,
			new TimeSpan()
		);
	}
	/**
	 * Remove a Friend
	 *
	 * @param {Friend|string} friend
	 * @returns {Promise<CloudResult>}
	 * @memberof CloudXInterface
	 */
	async DeleteFriend(friend) {
		if (typeof friend === "string") friend = this.Friends.GetFriend(friend);
		if (String.IsNullOrWhiteSpace(friend.OwnerId))
			return this.OnError("Argument Acception: friend.OwnerId");
		if (String.IsNullOrWhiteSpace(friend.FriendUserId))
			return this.OnError("Argument Acception: friend.FriendUserId");

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
	async SendTransaction(transaction) {
		return this.POST(
			"api/transactions/" + transaction.Token,
			transaction,
			new TimeSpan()
		);
	}
	async RequestDepositAddress() {
		return this.GET(
			"api/users/" + this.CurrentUser.Id + "/despositAddress",
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
		return await this.GetMessages(new Date(0), maxItems, user, false);
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
		).then((b) => {
			if (b.IsError) return b;
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
			return await this.MarkMessagesRead(messageIds.map((m) => m.Id));
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
			(b) => {
				let Entity = new SessionInfo(b.Entity);
				b.Content = Entity;
				return b;
			}
		);
	}

	/**
	 * Get a list of sessions
	 * @param {Date} updateSince
	 * @param {Boolean} includeEnded
	 * @param {String} compatibilityHash
	 * @param {String} name
	 * @param {String} universeId
	 * @param {String} hostName
	 * @param {String} hostId
	 * @param {Number} minActiveUsers
	 * @param {Boolean} includeEmptyHeadless
	 * @returns {Promise<CloudResult<List<Sessioninfo>>>}
	 */
	async GetSessions(
		updateSince = null,
		includeEnded = false,
		compatibilityHash = null,
		name = null,
		universeId = null,
		hostName = null,
		hostId = null,
		minActiveUsers = null,
		includeEmptyHeadless = true
	) {
		let stringBuilder1 = new StringBuilder();
		if (updateSince) {
			let str =
				"&updatedSince=" + Uri.EscapeDataString(updateSince.toISOString());
			stringBuilder1.Append(str);
		}
		if (includeEnded) stringBuilder1.Append("&includeEnded=true");
		if (!String.IsNullOrWhiteSpace(compatibilityHash))
			stringBuilder1.Append(
				"&compatibilityHash=" + Uri.EscapeDataString(compatibilityHash)
			);
		if (!String.IsNullOrWhiteSpace(name))
			stringBuilder1.Append("&name=" + Uri.EscapeDataString(name));
		if (!String.IsNullOrWhiteSpace(universeId))
			stringBuilder1.Append("&universeId=" + Uri.EscapeDataString(universeId));
		if (!String.IsNullOrWhiteSpace(hostName))
			stringBuilder1.Append("&hostName=" + Uri.EscapeDataString(hostName));
		if (!String.IsNullOrWhiteSpace(hostId))
			stringBuilder1.Append("&hostId=" + Uri.EscapeDataString(hostId));
		if (minActiveUsers != null)
			stringBuilder1.Append("&minActiveUsers=" + minActiveUsers);
		stringBuilder1.Append(
			"&includeEmptyHeadless=" + (includeEmptyHeadless ? "true" : "false")
		);
		if (stringBuilder1.Length > 0) stringBuilder1.String[0] = "?";
		let str1 = stringBuilder1.ToString();
		return await this.GET("api/sessions" + str1).then((res) => {
			let Content = new List();
			for (let item of res.Content) Content.Add(new SessionInfo(item));
			res.Content = Content;
			return res;
		});
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
			"api/stats/instanceOnline/" + machineId,
			{},
			new TimeSpan()
		);
	}
	async GetOnlineInstanceCount() {
		let cloudResult = await this.GET(
			"api/stats/onlineInstances/",
			new TimeSpan()
		);
		let result = new Out();
		return !cloudResult.IsOK() ||
			Number.TryParseInt(cloudResult.Content, result)
			? -1
			: result.Out;
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
				(httpResponseMessage) => {
					if (!httpResponseMessage.IsSuccessStatusCode)
						return new CloudResult(null, httpResponseMessage.StatusCode, null);
					let contentLength = httpResponseMessage.Headers["content-length"];
					let num = 0;
					if (!(contentLength > num)) return null;
					return new CloudResult(
						null,
						200,
						new ServerStatistics(httpResponseMessage.Content)
					);
				}
			);
		} catch (error) {
			this.OnError(error);
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
		return !cloudResult.IsOK || !Number.parseInt(cloudResult.Content)
			? -1
			: Number.parseInt(cloudResult.Content);
	}
}
module.exports = {
	CloudXInterface,
};
