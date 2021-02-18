/**
 * @file NeosVR CloudX.Shared Library for Node. Entry: {@link Neos Neos}
 * @name Neos.js
 * @author {@link https://github.com/bombitmanbomb @bombitmanbomb } - Library Main Developer
 * @author {@link https://github.com/Frooxius @Frooxius } - C# Library Dev
 * @license {@link https://opensource.org/licenses/MIT MIT License}
 * @returns {Neos}
 * @see Neos
 * @example const NEOS = require("@bombitmanbomb/neosjs");
 * const Neos = new NEOS();
 * const { CommandManager } = require("neosjs-commands")
 * const Command = CommandManager.CreateCommands(Neos));
 * Neos.on("error", (err)=>throw new Error(err));
 * Neos.on("messageReceived", (Message)=>{
 * 	switch(Message.MessageType){
 * 	case "Text":
 * 		Command.Run(Message)
 * 	break
 * 	default:
 * 		Neos.SendTextMessage(Message.SenderId,"Message could not be handled.");
 * 	}
 * })
 * Command.Add("ping", (Handler)=>{
 * 	Handler.Reply("Pong!");
 * },
 * {
 * 	index:"Ping Pong!"
 * 	usage: Command.Options.Prefix + "ping"
 * });
 * Neos.Login(Credentials...)
 */

/**
 * Passed to the Neos contructor to setup the client. See {@link Neos Neos} for Default Values.
 * @typedef {NeosGeneratorOptions} NeosGeneratorOptions
 * @property {boolean} [AutoReadMessages] - Auto Mark messages as Read in the API when handled by the {@link #neoseventneosmessagereceived Neos#messageReceived} event
 * @property {OnlineStatus} [OnlineState] - Online User Status, Displayed in User List.
 * @property {number} [StatusInterval] - How Frequent to update the user status. Will trigger {@link #neoseventneosstatusUpdated Neos#statusUpdated}.
 * @property {string} [NeosVersion] - Defaults to the Library version. Use to display a custom "Neos Version"
 * @property {string} [CompatabilityHash] - Determines Version Compatability Hash, Used by clients to determing if a session is the same version.
 * @property {number} [UpdateInterval] - Internal Update interval in `ms`. Reccomended: 1000
 * @property {boolean} [Update] - Enable State of the Internal Update loop. Only reccomend setting this to `false` if you know what you are doing.
 * @property {number} [MultiMessageDelay] - MultiMessage Delay for sending messages in `ms`. Reccomend over `1000ms`
 */
const { CloudX } = require("./API");
const config = require("./package.json");
const { v4: uuidv4 } = require("uuid");
const EventEmitter = require("events").EventEmitter;
class Events extends EventEmitter {
	constructor() {
		super();
	}
}

/**
 * Creates an instance of the NeosJS Client.
 * @class Neos
 * @extends {EventEmitter}
 * @param {NeosGeneratorOptions} [options]
 * @param {boolean} [options.AutoReadMessages=true] - Auto Mark messages as Read in the API when handled by the {@link #neoseventneosmessagereceived Neos#messageReceived} event
 * @param {OnlineStatus} [options.OnlineState="Online"] - Online User Status, Displayed in User List.
 * @param {number} [options.StatusInterval=60] - How Frequent to update the user status. Will trigger {@link #neoseventneosstatusUpdated Neos#statusUpdated}.
 * @param {string} [options.NeosVersion="Neos.js ${PackageVersion}"] - Defaults to the Library version. Use to display a custom "Neos Version"
 * @param {string} [options.CompatabilityHash="Neos.js ${PackageVersion}"] - Determines Version Compatability Hash, Used by clients to determing if a session is the same version.
 * @param {number} [options.UpdateInterval=1000] - Internal Update interval in `ms`. Reccomended: 1000
 * @param {boolean} [options.Update=true] - Enable State of the Internal Update loop. Only reccomend setting this to `false` if you know what you are doing.
 * @param {number} [options.MultiMessageDelay=1100] - MultiMessage Delay for sending messages in `ms`. Reccomend over `1000ms`
 * @classdesc Neos
 */
class Neos extends EventEmitter {
	/**
	 * CloudX Library, Contains all Classes and Files
	 * @readonly
	 * @instance
	 * @returns {CloudX}
	 * @property {Shared} Shared
	 * @property {Util} Util
	 * @memberof Neos
	 */
	static get CloudX() {
		return CloudX;
	}
	constructor(options) {
		super();
		//Setup Options

		if (!options) options = {};
		if (options.AutoReadMessages == null) options.AutoReadMessages = true;
		if (!options.OnlineState) options.OnlineState = "Online";
		if (options.StatusInterval == null) options.StatusInterval = 60;
		if (!options.NeosVersion)
			options.NeosVersion = config.main + " " + config.version;
		if (!options.CompatabilityHash)
			options.CompatabilityHash = config.main + " " + config.version;
		if (!options.UpdateInterval) options.UpdateInterval = 1000;
		if (options.Update == null) options.Update = true;
		if (options.MultiMessageDelay == null) options.MultiMessageDelay = 1100;
		if (options.DeviceId == null) options.DeviceId = uuidv4();
		/**
		 * Instance of {@link CloudXInterface}, Handles most of the API logic and events.
		 * @instance
		 * @type {CloudXInterface}
		 * @memberof Neos
		 */
		this.CloudXInterface;
		this.Options = options;
		Object.defineProperties(this, {
			Events: { value: new Events(), enumerable: false, writable: true },
			CloudX: { value: CloudX, enumerable: false, writable: true },
			CloudXInterface: {
				value: new CloudX.Shared.CloudXInterface(
					this.Events,
					config.main,
					config.version
				),
				enumerable: false,
				writable: true,
			},
			_UserMessage: {
				value: new CloudX.Shared.MessageManager.UserMessages(),
				enumerable: false,
				writable: true,
			},
		});
		this.CloudXInterface.NeosJS = this;
		this.CloudXInterface.OnLogin = (obj) => {
			this.Events.emit("login", obj);
		};
		this.CloudXInterface.OnLogout = () => {
			this.Events.emit("logout");
		};
		this.CloudXInterface.OnError = (error) => {
			this.Events.emit("error", error);
		};
		this.CloudXInterface.OnDebug = (info) => {
			this.Events.emit("debug", info);
		};
		this.CloudXInterface.OnSessionUpdated = () => {
			this.Events.emit("sessionUpdated");
		};
		this.CloudXInterface.SessionChanged = (session) => {
			this.Events.emit("sessionChanged", session);
		};
		this.CloudXInterface.UserUpdated = (user) => {
			this.Events.emit("userUpdated", user);
		};
		this.CloudXInterface.MembershipsUpdated = (memberships) => {
			this.Events.emit("membershipsUpdated", memberships);
		};
		this.CloudXInterface.GroupUpdated = (group) => {
			this.Events.emit("groupUpdated", group);
		};
		this.CloudXInterface.GroupMemberUpdated = (groupMember) => {
			this.Events.emit("groupMemberUpdated", groupMember);
		};
		this.CloudXInterface.Messages.OnMessageReceived = (message) => {
			this.Events.emit("messageReceived", message);
		};
		this.CloudXInterface.Messages.messageCountChanged = (count) => {
			this.Events.emit("messageCountChanged", count);
		};
		this.CloudXInterface.Friends.FriendAdded = (friend) => {
			this.Events.emit("friendAdded", friend);
		};
		this.CloudXInterface.Friends.FriendUpdated = (friend) => {
			this.Events.emit("friendUpdated", friend);
		};
		this.CloudXInterface.Friends.FriendRemoved = (friend) => {
			this.Events.emit("friendRemoved", friend);
		};
		this.CloudXInterface.Friends.FriendRequestCountChanged = (count) => {
			this.Events.emit("friendRequestCountChanged", count);
		};
		this.CloudXInterface.Friends.FriendsChanged = () => {
			this.Events.emit("friendsChanged");
		};
		//this.Interval = setInterval(this.CloudXInterface.Update,1000)
		this.lastStatusUpdate = "No Update";
		this.Status = new CloudX.Shared.UserStatus({
			onlineStatus: this.Options.OnlineState,
			compatibilityHash: this.Options.CompatabilityHash,
			neosVersion: this.Options.NeosVersion,
			lastStatusChange: new Date(),
		});
		this.Events.on("login", (obj) => {
			if (this.Options.Update) {
				this.Update();
				this.startInterval(this.Options.UpdateInterval);
			}
			this.emit("login", obj);
		});
		this.Events.on("logout", () => {
			this.clearInterval();
			this.CloudXInterface.Friends.FriendAdded = (friend) => {
				this.Events.emit("friendAdded", friend);
			};
			this.CloudXInterface.Friends.FriendUpdated = (friend) => {
				this.Events.emit("friendUpdated", friend);
			};
			this.CloudXInterface.Friends.FriendRemoved = (friend) => {
				this.Events.emit("friendRemoved", friend);
			};
			this.CloudXInterface.Friends.FriendRequestCountChanged = (count) => {
				this.Events.emit("friendRequestCountChanged", count);
			};
			this.CloudXInterface.Friends.FriendsChanged = () => {
				this.Events.emit("friendsChanged");
			};
			this.emit("logout");
		});
		this.Events.on("debug", (info) => {
			this.emit("debug", info);
		});
		this.Events.on("error", (error) => {
			this.emit("error", error);
		});
		this.Events.on("sessionUpdated", (session) => {
			this.emit("sessionUpdated", session);
		});
		this.Events.on("sessionChanged", (session) => {
			this.emit("sessionChanged", session);
		});
		this.Events.on("membershipsUpdated", (membership) => {
			this.emit("membershipsUpdated", membership);
		});
		this.Events.on("groupUpdated", (group) => {
			this.emit("groupUpdated", group);
		});
		this.Events.on("groupMemberUpdated", (member) => {
			this.emit("groupMemberUpdated", member);
		});
		this.Events.on("messageReceived", (message) => {
			let read = this.emit("messageReceived", message);
			if (this.Options.AutoReadMessages && read)
				// Auto Mark Read & Was Event Caught and read
				this.CloudXInterface.MarkMessagesRead([message]);
		});
		this.Events.on("messageCountChanged", (count) => {
			this.emit("messageCountChanged", count);
		});
		this.Events.on("friendAdded", (friend) => {
			this.emit("friendAdded", friend);
		});
		this.Events.on("friendUpdated", (friend) => {
			this.emit("friendUpdated", friend);
		});
		this.Events.on("friendRemoved", (friend) => {
			this.emit("friendRemoved", friend);
		});
		this.Events.on("friendRequestCountChanged", (count) => {
			this.emit("friendRequestCountChanged", count);
		});
		this.Events.on("friendsChanged", () => {
			this.emit("FriendsChanged");
		});
		this.Events.on("userUpdated", (user) => {
			this.emit("userUpdated", user);
		});
	}

	/**
	 * @private
	 * @instance
	 * @param {*} interval
	 * @memberof Neos
	 */
	startInterval(interval) {
		this.clearInterval(this.Interval);
		Object.defineProperty(this, "Interval", {
			value: setInterval(this.Update.bind(this), interval),
			enumerable: false,
			writable: true,
		});
	}

	/**
	 * @private
	 * @param {Interval} interval
	 */
	clearInterval(interval = this.Interval) {
		clearInterval(interval);
	}
	/**
	 *
	 * @private
	 * @returns void
	 * @memberof Neos
	 */
	Update() {
		this.CloudXInterface.Update();
		if (!this.CloudXInterface.CurrentUser.Id) return;
		if (
			this.Options.StatusInterval != null &&
			this.Options.StatusInterval !== 0
		) {
			if (
				new Date(new Date() - this.lastStatusUpdate).getTime() / 1000 >
					this.Options.StatusInterval ||
				this.lastStatusUpdate === "No Update"
			)
				return this.UpdateStatus();
		}
	}
	/**
	 * Update the Neos Account status
	 * @instance
	 * @since 1.0.0
	 * @memberof Neos
	 */
	UpdateStatus() {
		this.emit("statusUpdate");
		this.lastStatusUpdate = new Date();
		this.Status.LastStatusChange = new Date();
		this.CloudXInterface.UpdateStatus(this.Status);
	}
	/**
	 *
	 *
	 * @param {string} credential Email, UserId, or Account Username
	 * @param {string} [password]
	 * Not required if sessionToken is set,
	 * - Set as new password if recoverCode is set
	 * @param {string} [sessionToken] Session Token to login without storing the password
	 * @param {string} machineId Unique Machine ID, If another instance is logged in using the same machine id, the new one will replace the old.
	 * @param {boolean} [rememberMe = false] SessionToken will be valid for 7 days
	 * @param {string} [recoverCode] Recovery Code sent via Email, Use to set a new password
	 * @since 1.0.0
	 * @returns {Promise<CloudResult<UserSession>>}
	 * @memberof Neos
	 * @instance
	 */
	async Login(
		credential,
		password,
		sessionToken,
		machineId,
		rememberMe,
		recoverCode
	) {
		return await this.CloudXInterface.Login(
			credential,
			password,
			sessionToken,
			machineId,
			rememberMe,
			recoverCode
		);
	}

	/**
	 * Logout
	 * @instance
	 * @param {boolean} [manual=true]
	 * @since 1.0.0
	 * @memberof Neos
	 */
	Logout(manual = true) {
		this.CloudXInterface.Logout(manual);
	}
	/**
	 * Get the Current User
	 * @instance
	 * @readonly
	 * @memberof Neos
	 * @returns {User}
	 */
	get CurrentUser() {
		return this.CloudXInterface.CurrentUser;
	}
	/**
	 * Get the Current Session
	 * @instance
	 * @readonly
	 * @since 1.0.0
	 * @memberof Neos
	 * @returns {UserSession}
	 */
	get CurrentSession() {
		return this.CloudXInterface.CurrentSession;
	}
	/**
	 *Get User Memberships
	 * @instance
	 * @readonly
	 * @since 1.0.0
	 * @memberof Neos
	 * @returns {List<Membership>}
	 */
	get CurrentUserMemberships() {
		return this.CloudXInterface.CurrentUserMemberships;
	}

	/**
	 *
	 * @instance
	 * @readonly
	 * @since 1.0.0
	 * @memberof Neos
	 */
	get CurrentUserGroupInfos() {
		return this.CloudXInterface.CurrentUserGroupInfos;
	}
	/**
	 * Search neos for username
	 * @instance
	 * @param {string} username
	 * @since 1.0.0
	 * @returns {List<User>}
	 * @memberof Neos
	 */
	async GetUsers(username) {
		return (await this.CloudXInterface.GetUsers(username)).Entity;
	}
	/**
	 *Get a specific User by their UserId
	 * @instance
	 * @param {string} userId
	 * @returns {User} User Object
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetUser(userId) {
		return (await this.CloudXInterface.GetUser(userId)).Entity;
	}
	/**
	 * get a specific User by their username
	 * @param {string} username
	 * @instance
	 * @returns {User}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetUserByName(username) {
		return (await this.CloudXInterface.GetUserByName(username)).Entity;
	}
	/**
	 * Get the friends list of a user
	 * @instance
	 * @param {string} userId
	 * @returns {List<Friend>}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetFriends(userId) {
		return (await this.CloudXInterface.GetFriends(userId)).Entity;
	}
	/**
	 * get a user from your friend list
	 * @instance
	 * @param {string} friendId
	 * @returns {User}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	GetFriend(friendId) {
		return this.CloudXInterface.Friends.GetFriend(friendId);
	}
	/**
	 * Check if a user is friends
	 * @instance
	 * @param {string} friendId
	 * @returns {Boolean}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	IsFriend(friendId) {
		return this.CloudXInterface.Friends.IsFriend(friendId);
	}
	/**
	 * Send or Accept a friend request
	 * - pass the Friend Object
	 * @instance
	 * @param {String | Friend} friend
	 * @returns void
	 * @since 1.0.0
	 * @memberof Neos
	 */
	AddFriend(friend) {
		return this.CloudXInterface.Friends.AddFriend(friend);
	}
	/**
	 * Remove a user from your friends list
	 * - pass the Friend Object
	 * @instance
	 * @param {*} friend
	 * @returns void
	 * @since 1.0.0
	 * @memberof Neos
	 */
	RemoveFriend(friend) {
		return this.CloudXInterface.Friends.RemoveFriend(friend);
	}
	/**
	 * Ignore a Friend Request
	 *  - pass the Friend Object
	 * @instance
	 * @param {*} friend
	 * @returns void
	 * @since 1.0.0
	 * @memberof Neos
	 */
	IgnoreRequest(friend) {
		return this.CloudXInterface.Friends.IgnoreRequest(friend);
	}
	/**
	 *Get a Neos Group
	 * @instance
	 * @param {*} groupId
	 * @returns {Group}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetGroup(groupId) {
		(await this.CloudXInterface.GetGroup(groupId)).Entity;
	}
	/**
	 *Get a Member from a Group
	 * @instance
	 * @param {String} groupId
	 * @param {String} userId
	 * @returns {Member}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetGroupMember(groupId, userId) {
		(await this.CloudXInterface.GetGroupMember(groupId, userId)).Entity;
	}
	/**
	 *Get the Members of a group and their Byte Usage
	 * @instance
	 * @param {String} groupId
	 * @returns {List<Member>}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetGroupMembers(groupId) {
		return (await this.CloudXInterface.GetGroupMembers(groupId)).Entity;
	}
	/**
	 * Get cached messages with a user
	 * @instance
	 * @param {String} UserId
	 * @returns {UserMessages}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetUserMessages(UserId) {
		return await this.CloudXInterface.Messages.GetUserMessages(UserId);
	}
	/**
	 *Get all Cached messages
	 * @instance
	 * @returns {List<Message>}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	GetAllUserMessages() {
		let messages = new CloudX.Util.List();
		this.CloudXInterface.Friends.GetAllUserMessages(messages);
		return messages;
	}
	/**
	 *Get messages and add them to the cache
	 * @instance
	 * @param {Date} [fromTime=new Date]
	 * @param {Number} [maxItems=100]
	 * @param {String} [user=null]
	 * @param {boolean} [unreadOnly=false]
	 * @returns {List<Message>}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetMessages(
		fromTime = new Date(0),
		maxItems = 100,
		user = null,
		unreadOnly = false
	) {
		return (
			await this.CloudXInterface.GetMessages(
				fromTime,
				maxItems,
				user,
				unreadOnly
			)
		).Entity;
	}
	/**
	 * Send a Read Reciept, Messages will not show in UnreadMessages query
	 * @instance
	 * @param {Array<String> | List<String> | String} messageIds
	 * @returns *
	 * @since 1.0.0
	 * @memberof Neos
	 */
	MarkMessagesRead(messageIds) {
		if (CloudX.Util.Type.Get(messageIds) === "string")
			messageIds = [messageIds];
		return this.CloudXInterface.MarkMessagesRead(messageIds);
	}
	/**
	 *Get History of messages with a user
	 * @instance
	 * @param {String} userId
	 * @param {number} [maxItems=100]
	 * @returns {List<Message>} Messages
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetMessageHistory(userId, maxItems = 100) {
		return (await this.CloudXInterface.GetMessageHistory(userId, maxItems))
			.Entity;
	}
	/**
	 *Get the status of a user
	 * @instance
	 * @param {String} userId
	 * @returns {UserStatus} UserStatus
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetStatus(userId) {
		return (await this.CloudXInterface.GetStatus(userId)).Entity;
	}
	/**
	 * Not Yet Implimented
	 * @param {SearchParameters} record
	 * @instance
	 * @since 1.0.0
	 * @memberof Neos
	 */
	// eslint-disable-next-line no-unused-vars
	FindRecords(record) {}

	/**
	 * Get the number of friends in a Session
	 * @instance
	 * @param {SessionInfo} session
	 * @returns {Number} Friends in Session
	 * @since 1.0.0
	 * @memberof Neos
	 */
	CountPresentFriends(session) {
		return this.CloudXInterface.Friends.CountPresentFriends(session);
	}

	/**
	 * Get a random Exit Message
	 * @instance
	 * @returns {ExitMessage}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetRandomExitMessage() {
		return this.CloudXInterface.GetRandomExitMessage();
	}
	/**
	 * Get currency transaction rates
	 * @instance
	 * @param {string} [baseCurrency="USD"]
	 * @returns {CurrencyRates}
	 * @since 1.0.0
	 * @memberof Neos
	 */
	async GetCurrencyRates(baseCurrency = "USD") {
		return this.CloudXInterface.GetCurrencyRates(baseCurrency);
	}
	/**
	 *Not yet Implimented
	 * @instance
	 * @param {*} ownerId
	 * @param {*} recordId
	 * @memberof Neos
	 */

	// eslint-disable-next-line no-unused-vars
	FetchRecord(ownerId, recordId) {}
	/**
	 * Send a Text Message.
	 * If Message is longer than 128 characters it will be chunked as there is a character limit
	 * if a Message element in an Array is longer than 128 characters it will be cut off with "..." by the server
	 * @instance
	 * @since 1.0.0
	 * @param {String} UserId Neos User Id to send
	 * @param {String | Array<String>} Message Message or Array of Messages to Send
	 * @memberof Neos
	 */
	async SendTextMessage(UserId, Message) {
		let Messages = [];
		if (typeof Message === "string") {
			Messages = chunkSubstr(Message, 115);
		} else if (typeof Message === "object") {
			if (Array.isArray(Message)) Messages = Message;
			else
				return this.emit(
					"error",
					"Invalid Message Type, Expected String or Array"
				);
		}

		let index = 0;
		if (Messages.length > 1) {
			return new Promise((resolve) => {
				var context = this;
				for (let message of Messages) {
					index++;
					setTimeout(
						(index) => {
							context._UserMessage.UserMessages(
								UserId,
								context.CloudXInterface.Messages
							);
							let LastMessage = context._UserMessage.SendTextMessage(
								message +
									(Messages.length > 1 && typeof Message === "string"
										? `<br>${index}/${Messages.length}`
										: "")
							);
							if (index === Messages.length) return resolve(LastMessage);
						},
						index * context.Options.MultiMessageDelay,
						index
					);
				}
			});
		} else {
			this._UserMessage.UserMessages(UserId, this.CloudXInterface.Messages);
			return this._UserMessage.SendTextMessage(Messages[0]);
		}
	}

	/**
	 *
	 * @instance
	 * @param {String} neosdb neosdb:///URL
	 * @param {Number} endpoint Options:
	 * - 0 - Default
	 * - 1 - Blob
	 * - 2 - CDN
	 * - 3 - VideoCDN
	 * - null - Default
	 * @returns {String} http address to neosdb asset
	 * @memberof Neos
	 * @since 1.7.1
	 * @example Neos.GetUser("U-bombitmanbomb").then((User)=>{
	 * 	console.log(Neos.NeosDBToHttp(User.Profile.IconUrl))
	 * 	//Logs https://cloudxstorage.blob.core.windows.net/assets/7c6e1611490cc94005dc76077d2fa8c591f709b61dabc6be726ab65da137c369
	 * })
	 */
	NeosDBToHttp(neosdb, endpoint) {
		return CloudX.Shared.CloudXInterface.NeosDBToHttp(neosdb, endpoint).rawUrl;
	}
	/**
	 *
	 * @instance
	 * @param {*} UserId
	 * @param {*} Message
	 * @returns {Promise<any>}
	 * @memberof Neos
	 */
	async SendTransaction(UserId, Message) {
		this._UserMessage.UserMessages(UserId, this.CloudXInterface.Messages);
		return this._UserMessage.SendTextMessage(Message);
	}
	async SendObject(UserId, Message) {
		this._UserMessage.UserMessages(UserId, this.CloudXInterface.Messages);
		return this._UserMessage.SendTextMessage(Message);
	}

	SendInvite(UserId, Message) {
		this._UserMessage.UserMessages(UserId, this.CloudXInterface.Messages);
		this._UserMessage.SendTextMessage(Message);
	}
	JoinSession() {}
	LeaveSession() {}
}

/**
 * Message Received
 * @example Neos.on("messageReceived", (message)=>{
 * 	switch(message.MessageType){
 * 		case "Text":
 * 			Commands.Run(message)
 * 			break
 * 		default:
 * 		Neos.SendTextMessage(message.SenderId, "I Only can handle Text")
 * 	}
 * })
 * @event Neos#messageReceived
 * @since 1.0.0
 * @type {Message}
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#groupMemberUpdated
 * @since 1.0.0
 * @type {Member}
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#messageCountChanged
 * @type {Number}
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#friendAdded
 * @type {Friend}
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#friendUpdated
 * @type {Friend}
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#friendRemoved
 * @type {Friend}
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#friendRequestCountChanged
 * @type {Number}
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#friendsChanged
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#groupUpdated
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * membershipsUpdated
 *
 * @event Neos#membershipsUpdated
 * @since 1.0.0
 * @memberof Neos
 */

/**
 * User Updated
 *
 * @event Neos#userUpdated
 * @since 1.0.0
 * @type {User}
 * @memberof Neos
 */
/**
 * Session Changed
 *
 * @event Neos#sessionChanged
 * @since 1.0.0
 * @type {UserSession}
 * @memberof Neos
 */
/**
 * Session Updated
 *
 * @event Neos#sessionUpdated
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * Error Event
 * @example Neos.on("error", (err)=>{console.error(err)})
 * @event Neos#error
 * @param {Error} err
 * @type {Error}
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * Console Event
 * @example Neos.on("debug", (info)=>{console.log(info))})
 * @event Neos#debug
 * @param {any} info
 * @type {any}
 * @since 1.13.0
 * @memberof Neos
 */
/**
 * Logout Event
 *
 * @event Neos#logout
 * @since 1.0.0
 * @memberof Neos
 */
/**
 * Login Event
 *
 * @example Neos.on("login", ()=>{
 * 	Neos.SendTestMesssage("U-BotOwner", "Bot Online");
 * ...
 * })
 * @event Neos#login
 * @type {Object}
 * @property {Object} CurrentUser Current User
 * @property {Object} CurrentSession Current Session
 * @since 1.0.0
 * @memberof Neos
 */

/**
 * @private
 *
 * @param {String} str
 * @param {Number} len
 * @returns {Array<String>}
 */
function chunkSubstr(str, len) {
	let input = str.trim().split(" ");
	let index = 0;
	let output = [];
	input.forEach((word) => {
		let temp =
			output[index] == null ? word.trim() : output[index] + " " + word.trim();
		if (temp.length <= len) {
			output[index] = temp;
		} else {
			index++;
			output[index] = word;
		}
	});
	return output;
}

module.exports = Neos;
