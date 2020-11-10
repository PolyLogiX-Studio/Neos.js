/**
 * @fileoverview NeosVR CloudX.Shared Library in NodeJS
 *
 * @author Bitman
 */
const { CloudX } = require("./API");
const config = require("./package.json");
const EventEmitter = require("events").EventEmitter;
class Events extends EventEmitter {
	constructor() {
		super();
	}
}
/**
 *Creates an instance of Neos.
 * @param {{AutoReadMessages:true, OnlineStateL:Online, StatusInterval:60,NeosVersion:"Neos.js <Version>", CompatabilityHash:"Neos.js <Version>",UpdateInterval:1000,Update:true,MultiMessageDelay:1100}} options
 * @memberof Neos
 */
class Neos extends EventEmitter {
	/**
   * CloudX
   * @readonly
   * @static
   * @memberof NeosJS
   */
	static get CloudX() {
		return CloudX;
	}
	constructor(options) {
		super();
		//Setup Options

		if (!options) options = {};
		if (options.OAuth == null) options.OAuth = false;
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
		this.Options = options;
		this.Events = new Events();
		this.CloudX = CloudX;
		this.CloudXInterface = new CloudX.Shared.CloudXInterface(
			this.Events,
			config.main,
			config.version
		);
		this.CloudXInterface.NeosJS = this;
		this._UserMessage = new CloudX.Shared.MessageManager.UserMessages();
		this._UserMessage.Cloud = this.CloudXInterface;
		this.CloudXInterface.OnLogin = (obj) => {
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
       */
			this.Events.emit("login", obj);
		};
		this.CloudXInterface.OnLogout = () => {
			/**
       * Logout Event
       *
       * @event Neos#logout
       */
			this.Events.emit("logout");
		};
		this.CloudXInterface.OnError = (error) => {
			/**
       * Error Event
       * @example Neos.on("error", (err)=>{console.error(err)})
       * @event Neos#error
       * @type {Error}
       */
			this.Events.emit("error", error);
		};
		this.CloudXInterface.OnSessionUpdated = () => {
			/**
       * Session Updated
       *
       * @event Neos#sessionUpdated
       */
			this.Events.emit("sessionUpdated");
		};
		this.CloudXInterface.SessionChanged = (session) => {
			/**
       * Session Changed
       *
       * @event Neos#sessionChanged
       * @type {CloudXInterface.CurrentSession}
       *
       */
			this.Events.emit("sessionChanged", session);
		};
		this.CloudXInterface.UserUpdated = (user) => {
			/**
       * User Updated
       *
       * @event Neos#userUpdated
       * @type {CloudXInterface.CurrentUser}
       */
			this.Events.emit("userUpdated", user);
		};
		this.CloudXInterface.MembershipsUpdated = (memberships) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#membershipsUpdated
       */
			this.Events.emit("membershipsUpdated", memberships);
		};
		this.CloudXInterface.GroupUpdated = (group) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#groupUpdated
       */
			this.Events.emit("groupUpdated", group);
		};
		this.CloudXInterface.GroupMemberUpdated = (groupMember) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#groupMemberUpdated
       */
			this.Events.emit("groupMemberUpdated", groupMember);
		};
		this.CloudXInterface.Messages.onMessageReceived = (message) => {
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
       */
			this.Events.emit("messageReceived", message);
		};
		this.CloudXInterface.Messages.messageCountChanged = (count) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#messageCountChanged
       */
			this.Events.emit("messageCountChanged", count);
		};
		this.CloudXInterface.Friends.FriendAdded = (friend) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#friendAdded
       */
			this.Events.emit("friendAdded", friend);
		};
		this.CloudXInterface.Friends.FriendUpdated = (friend) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#friendUpdated
       */
			this.Events.emit("friendUpdated", friend);
		};
		this.CloudXInterface.Friends.FriendRemoved = (friend) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#friendRemoved
       */
			this.Events.emit("friendRemoved", friend);
		};
		this.CloudXInterface.Friends.FriendRequestCountChanged = (count) => {
			/**
       * membershipsUpdated
       *
       * @event Neos#friendRequestCountChanged
       */
			this.Events.emit("friendRequestCountChanged", count);
		};
		this.CloudXInterface.Friends.FriendsChanged = () => {
			/**
       * membershipsUpdated
       *
       * @event Neos#friendsChanged
       */
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
   *
   * @param {*} interval
   * @memberof Neos
   */
	startInterval(interval) {
		this.clearInterval(this.Interval);
		this.Interval = setInterval(this.Update.bind(this), interval);
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
   *
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
   * @returns {Promise<CloudX.Shared.CloudResult<CloudX.Shared.UserSession>>}
   * @memberof Neos
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
   *
   * @param {boolean} [manual=true]
   * @memberof Neos
   */
	Logout(manual = true) {
		this.CloudXInterface.Logout(manual);
	}
	/**
   *
   * Get the Current User
   * @readonly
   * @memberof Neos
   */
	get CurrentUser() {
		return this.CloudXInterface.CurrentUser;
	}
	/**
   * Get the Current Session
   *
   * @readonly
   * @memberof Neos
   */
	get CurrentSession() {
		return this.CloudXInterface.CurrentSession;
	}
	/**
   *Get User Memberships
   *
   * @readonly
   * @memberof Neos
   */
	get CurrentUserMemberships() {
		return this.CloudXInterface.CurrentUserMemberships;
	}

	/**
   *
   *
   * @readonly
   * @memberof Neos
   */
	get CurrentUserGroupInfos() {
		return this.CloudXInterface.CurrentUserGroupInfos;
	}
	/**
   *Search neos for username
   *
   * @param {string} username
   * @returns
   * @memberof Neos
   */
	async GetUsers(username) {
		return await this.CloudXInterface.GetUsers(username);
	}
	/**
   *Get a specific User by their UserId
   *
   * @param {string} userId
   * @returns {User} User Object
   * @memberof Neos
   */
	async GetUser(userId) {
		let response = await this.CloudXInterface.GetUser(userId);
		return new this.CloudX.Shared.User(response.Entity);
	}
	/**
   *
   * get a specific User by their username
   * @param {string} username
   * @returns
   * @memberof Neos
   */
	async GetUserByName(username) {
		return await this.CloudXInterface.GetUserByName(username);
	}
	/**
   * Get the friends list of a user
   *
   * @param {string} userId
   * @returns
   * @memberof Neos
   */
	async GetFriends(userId) {
		return await this.CloudXInterface.GetFriends(userId);
	}
	/**
   * get a user from your friend list
   *
   * @param {string} friendId
   * @returns
   * @memberof Neos
   */
	GetFriend(friendId) {
		return this.CloudXInterface.Friends.GetFriend(friendId);
	}
	/**
   * Check if a user is friends
   *
   * @param {string} friendId
   * @returns {Boolean}
   * @memberof Neos
   */
	IsFriend(friendId) {
		return this.CloudXInterface.Friends.IsFriend(friendId);
	}
	/**
   * Send or Accept a friend request
   * - pass the Friend Object
   * @param {String | CloudX.Shared.Friend} friend
   * @returns
   * @memberof Neos
   */
	AddFriend(friend) {
		return this.CloudXInterface.Friends.AddFriend(friend);
	}
	/**
   * Remove a user from your friends list
   * - pass the Friend Object
   *
   * @param {*} friend
   * @returns
   * @memberof Neos
   */
	RemoveFriend(friend) {
		return this.CloudXInterface.Friends.RemoveFriend(friend);
	}
	/**
   * Ignore a Friend Request
   *  - pass the Friend Object
   *
   * @param {*} friend
   * @returns
   * @memberof Neos
   */
	IgnoreRequest(friend) {
		return this.CloudXInterface.Friends.IgnoreRequest(friend);
	}
	/**
   *Get a Neos Group
   *
   * @param {*} groupId
   * @returns
   * @memberof Neos
   */
	async GetGroup(groupId) {
		return await this.CloudXInterface.GetGroup(groupId);
	}
	/**
   *Get a Member from a Group
   *
   * @param {String} groupId
   * @param {String} userId
   * @returns
   * @memberof Neos
   */
	async GetGroupMember(groupId, userId) {
		return await this.CloudXInterface.GetGroupMember(groupId, userId);
	}
	/**
   *Get the Members of a group
   *
   * @param {String} groupId
   * @returns
   * @memberof Neos
   */
	async GetGroupMembers(groupId) {
		return await this.CloudXInterface.GetGroupMembers(groupId);
	}
	/**
   *
   * Get cached messages with a user
   * @param {String} UserId
   * @returns
   * @memberof Neos
   */
	async GetUserMessages(UserId) {
		return await this.CloudXInterface.GetUserMessages(UserId);
	}
	/**
   *Get all Cached messages
   *
   * @returns
   * @memberof Neos
   */
	GetAllUserMessages() {
		let messages = new this.CloudX.Util.List();
		this.CloudXInterface.Friends.GetAllUserMessages(messages);
		return messages;
	}
	/**
   *Get messages and add them to the cache
   *
   * @param {Date} [fromTime=new Date]
   * @param {Number} [maxItems=100]
   * @param {*} [user=null]
   * @param {boolean} [unreadOnly=false]
   * @returns
   * @memberof Neos
   */
	async GetMessages(
		fromTime = new Date(0),
		maxItems = 100,
		user = null,
		unreadOnly = false
	) {
		return await this.CloudXInterface.GetMessages(
			fromTime,
			maxItems,
			user,
			unreadOnly
		);
	}
	/**
   * Send a Read Reciept, Messages will not show in UnreadMessages query
   *
   * @param {*} messageIds
   * @returns
   * @memberof Neos
   */
	MarkMessagesRead(messageIds) {
		if (this.CloudX.Util.Type.Get(messageIds) === "string")
			messageIds = [messageIds];
		return this.MarkMessagesRead(messageIds);
	}
	/**
   *Get History of messages with a user
   *
   * @param {*} user
   * @param {number} [maxItems=100]
   * @returns
   * @memberof Neos
   */
	GetMessageHistory(userId, maxItems = 100) {
		return this.CloudXInterface.GetMessageHistory(userId, maxItems);
	}
	/**
   *Get the status of a user
   *
   * @param {*} userId
   * @returns
   * @memberof Neos
   */
	async GetStatus(userId) {
		return await this.CloudXInterface.GetStatus(userId);
	}
	/**
   *
   * Not Yet Implimented
   * @param {CloudX.Shared.SearchParameters} record
   * @memberof Neos
   */
	// eslint-disable-next-line no-unused-vars
	FindRecords(record) {}
	/**
   *Not yet Implimented
   *
   * @param {*} ownerId
   * @param {*} recordId
   * @memberof Neos
   */

	// eslint-disable-next-line no-unused-vars
	FetchRecord(ownerId, recordId) {}
	/**
   *
   *
   * @param {String} UserId Neos User Id to send
   * @param {String} Message Text to Send
   * @memberof Neos
   */
	async SendTextMessage(UserId, Message) {
		let Messages = [];
		if (typeof Message === "string") {
			Messages = chunkSubstr(Message, 120);
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
   *
   * @param {String} neosdb neosdb:///URL
   * @param {Number} endpoint Options:
   * - 0 - Default
   * - 1 - Blob
   * - 2 - CDN
   * - 3 - VideoCDN
   * - null - Default
   * @returns {String} http address to neosdb asset
   * @memberof Neos
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
   *
   * @param {*} UserId
   * @param {*} Message
   * @returns
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
 *@private
 *
 * @param {*} str
 * @param {*} size
 * @returns
 */
function chunkSubstr(str, size) {
	const numChunks = Math.ceil(str.length / size);
	const chunks = new Array(numChunks);

	for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
		chunks[i] = str.substr(o, size);
	}

	return chunks;
}
module.exports = Neos;
