const { CloudX } = require("./API.js")
const config = require("./package.json")
const EventEmitter = require("events").EventEmitter
class Events extends EventEmitter {
    constructor() { super() }
}
class Neos extends EventEmitter {
    /**
     *Creates an instance of Neos.
     * @param {*} options
     * @memberof Neos
     */
    
    constructor(options) {
        super()
        //Setup Options
        if (!options) options = {}
        if (options.AutoReadMessages == null) options.AutoReadMessages = true
        if (!options.OnlineState) options.OnlineState = "Online"
        if (!options.NeosVersion) options.NeosVersion = config.main + " " + config.version
        if (!options.CompatabilityHash) options.CompatabilityHash = config.main + " " + config.version
        if (!options.UpdateInterval) options.UpdateInterval = 1000

        this.Events = new Events()
        this.CloudX = CloudX
        this.CloudXInterface = new CloudX.Shared.CloudXInterface(this.Events, config.main, config.version)
        this._UserMessage = new CloudX.Shared.MessageManager.UserMessages()
        this._UserMessage.Cloud = this.CloudXInterface
        this.CloudXInterface.OnLogin = () => { this.Events.emit('login') }
        this.CloudXInterface.OnLogout = () => { this.Events.emit("logout") }
        this.CloudXInterface.OnSessionUpdated = () => { this.Events.emit("sessionUpdated") }
        this.CloudXInterface.SessionChanged = (session) => { this.Events.emit("sessionChanged", session) }
        this.CloudXInterface.UserUpdated = (user) => { this.Events.emit("userUpdated", user) }
        this.CloudXInterface.MembershipsUpdated = (memberships) => { this.Events.emit("membershipsUpdated", memberships) }
        this.CloudXInterface.GroupUpdated = (group) => { this.Events.emit("groupUpdated", group) }
        this.CloudXInterface.GroupMemberUpdated = (groupMember) => { this.Events.emit("groupMemberUpdated", groupMember) }
        this.CloudXInterface.Messages.onMessageReceived = (message) => { this.Events.emit("messageReceived", message) }
        this.CloudXInterface.Messages.messageCountChanged = (count) => { this.Events.emit("messageCountChanged", count) }
        this.CloudXInterface.Friends.FriendAdded = (friend) => { this.Events.emit("friendAdded", friend) }
        this.CloudXInterface.Friends.FriendUpdated = (friend) => { this.Events.emit("friendUpdated", friend) }
        this.CloudXInterface.Friends.FriendRemoved = (friend) => { this.Events.emit("friendRemoved", friend) }
        this.CloudXInterface.Friends.FriendRequestCountChanged = (count) => { this.Events.emit("friendRequestCountChanged", count) }
        this.CloudXInterface.Friends.FriendsChanged = () => { this.Events.emit("friendsChanged") }
        //this.Interval = setInterval(this.CloudXInterface.Update,1000)
        this.lastStatusUpdate = null
        this.Status = new CloudX.Shared.UserStatus({ onlineStatus: options.OnlineState, compatabilityHash: options.CompatabilityHash, neosVersion: options.NeosVersion })
        this.Events.on("login", () => {
            this.startInterval(options.UpdateInterval)
            this.emit("login")
        })
        this.Events.on("logout", () => {
            this.CloudXInterface.Friends.FriendAdded = (friend) => { this.Events.emit("friendAdded", friend) }
            this.CloudXInterface.Friends.FriendUpdated = (friend) => { this.Events.emit("friendUpdated", friend) }
            this.CloudXInterface.Friends.FriendRemoved = (friend) => { this.Events.emit("friendRemoved", friend) }
            this.CloudXInterface.Friends.FriendRequestCountChanged = (count) => { this.Events.emit("friendRequestCountChanged", count) }
            this.CloudXInterface.Friends.FriendsChanged = () => { this.Events.emit("friendsChanged") }
            this.emit("logout")
        })

        this.Events.on("sessionUpdated", (session) => {
            this.emit("sessionUpdated", session)
        })
        this.Events.on("sessionChanged", (session) => {
            this.emit("sessionChanged", session)
        })
        this.Events.on("membershipsUpdated", (membership) => {
            this.emit("membershipsUpdated", membership)
        })
        this.Events.on("groupUpdated", (group) => {
            this.emit("groupUpdated", group)
        })
        this.Events.on("groupMemberUpdated", (member) => {
            this.emit("groupMemberUpdated", member)
        })
        this.Events.on("messageReceived", (message) => {
            this.emit("messageReceived", message)
            if (options.AutoReadMessages)
                this.CloudXInterface.MarkMessagesRead([message])
            //console.log(message.SenderId + ":" + message.Content)
        })
        this.Events.on("messageCountChanged", (count) => {
            this.emit("messageCountChanged", count)
        })
        this.Events.on("friendAdded", (friend) => {
            this.emit("friendAdded", friend)
        })
        this.Events.on("friendUpdated", (friend) => {
            this.emit('friendUpdated', friend)
        })
        this.Events.on("friendRemoved", () => {
            this.emit("friendRemoved", friend)
        })
        this.Events.on("friendRequestCountChanged", (count) => {
            this.emit("friendRequestCountChanged", count)
        })
        this.Events.on("friendsChanged", () => {
            this.emit("FriendsChanged")
        })
        this.Events.on("userUpdated", (user) => {
            this.emit("userUpdated", user)
        })


    }
    startInterval(interval) {
        clearInterval(this.Interval)
        this.Interval = setInterval(this.Update.bind(this), interval)
    }
    /**
     *
     * @private
     * @returns void
     * @memberof Neos
     */
    Update() {
        this.CloudXInterface.Update()
        if (!this.CloudXInterface.CurrentUser.Id) return;
        if (!this.lastStatusUpdate) return this.UpdateStatus();
        if (this.lastStatusUpdate.getSeconds() > 30) return this.UpdateStatus()
    }
    /**
     * Update the Neos Account status
     * 
     * @memberof Neos
     */
    UpdateStatus() {
        this.CloudXInterface.UpdateStatus(this.Status);
        this.lastStatusUpdate = new Date()
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
    async Login(credential, password, sessionToken, machineId, rememberMe, recoverCode) {
        return await this.CloudXInterface.Login(credential, password, sessionToken, machineId, rememberMe, recoverCode)
    }
    /**
     *
     * Get the Current User
     * @readonly
     * @memberof Neos
     */
    get CurrentUser() {
        return this.CloudXInterface.CurrentUser
    }
    /**
     * Get the Current Session
     *
     * @readonly
     * @memberof Neos
     */
    get CurrentSession() {
        return this.CloudXInterface.CurrentSession
    }
    /**
     *Get User Memberships
     *
     * @readonly
     * @memberof Neos
     */
    get CurrentUserMemberships() {
        return this.CloudXInterface.CurrentUserMemberships
    }
    /**Get User Groups */
    get CurrentUserGroupInfos() {
        return this.CloudXInterface.CurrentUserGroupInfos
    }
    get CurrentUserMemberInfos() {
        return this.CloudXInterface.CurrentUserMemberInfos
    }
    /**
     *Search neos for username
     *
     * @param {string} username
     * @returns 
     * @memberof Neos
     */
    GetUsers(username) {
        return this.CloudXInterface.GetUsers(username)
    }
    /**
     *Get a specific User by their UserId
     *
     * @param {string} userId
     * @returns
     * @memberof Neos
     */
    GetUser(userId) {
        return this.CloudXInterface.GetUser(userId)
    }
    /**
     *
     * get a specific User by their username
     * @param {string} username
     * @returns
     * @memberof Neos
     */
    GetUserByName(username) {
        return this.CloudXInterface.GetUserByName(username)
    }
    /**
     * Get the friends list of a user
     *
     * @param {string} userId
     * @returns
     * @memberof Neos
     */
    GetFriends(userId) {
        return this.CloudXInterface.GetFriends(userId)
    }
    /**
     * get a user from your friend list
     *
     * @param {string} friendId
     * @returns
     * @memberof Neos
     */
    GetFriend(friendId) {
        return this.CloudXInterface.Friends.GetFriend(friendId)
    }
    /**
     * Check if a user is friends
     *
     * @param {string} friendId
     * @returns
     * @memberof Neos
     */
    IsFriend(friendId) {
        return this.CloudXInterface.Friends.IsFriend(friendId)
    }
    /**
     * Send or Accept a friend request
     * - pass the Friend Object
     * @param {String | CloudX.Shared.Friend} friend
     * @returns
     * @memberof Neos
     */
    AddFriend(friend) {
        return this.CloudXInterface.Friends.AddFriend(friend)
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
        return this.CloudXInterface.Friends.RemoveFriend(friend)
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
        return this.CloudXInterface.Friends.IgnoreRequest(friend)
    }
    /**
     *Get a Neos Group
     *
     * @param {*} groupId
     * @returns
     * @memberof Neos
     */
    GetGroup(groupId) {
        return this.CloudXInterface.GetGroup(groupId)
    }
    /**
     *Get a Member from a Group
     *
     * @param {*} groupId
     * @param {*} userId
     * @returns
     * @memberof Neos
     */
    GetGroupMember(groupId, userId) {
        return this.CloudXInterface.GetGroupMember(groupId, userId)
    }
    /**
     *Get the Members of a group
     *
     * @param {*} groupId
     * @returns
     * @memberof Neos
     */
    GetGroupMembers(groupId) {
        return this.CloudXInterface.GetGroupMembers(groupId)
    }
    /**
     *
     * Get cached messages with a user
     * @param {*} UserId
     * @returns
     * @memberof Neos
     */
    GetUserMessages(UserId) {
        return this.CloudXInterface.GetUserMessages(UserId)
    }
    /**
     *Get all Cached messages
     *
     * @returns
     * @memberof Neos
     */
    GetAllUserMessages() {
        let messages = new this.CloudX.Util.List()
        this.CloudXInterface.Friends.GetAllUserMessages(messages)
        return messages
    }
    /**
     *Get messages and add them to the cache
     *
     * @param {*} [fromTime=Date]
     * @param {number} [maxItems=100]
     * @param {*} [user=null]
     * @param {boolean} [unreadOnly=false]
     * @returns
     * @memberof Neos
     */
    GetMessages(fromTime = new Date(0), maxItems = 100, user = null, unreadOnly = false) {
        return this.CloudXInterface.GetMessages(fromTime, maxItems, user, unreadOnly)
    }
    /**
     * Send a Read Reciept, Messages will not show in UnreadMessages query
     *
     * @param {*} messageIds
     * @returns
     * @memberof Neos
     */
    MarkMessagesRead(messageIds) {
        if (this.CloudX.Util.Type.Get(messageIds) == 'string')
            messageIds = [messageIds]
        return this.MarkMessagesRead(messageIds)
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
        return this.CloudXInterface.GetMessageHistory(userId, maxItems)
    }
    /**
     *Get the status of a user
     *
     * @param {*} userId
     * @returns
     * @memberof Neos
     */
    GetStatus(userId) {
        return this.CloudXInterface.GetStatus(userId)
    }
    /**
     *
     * Not Yet Implimented
     * @param {CloudX.Shared.SearchParameters} record
     * @memberof Neos
     */
    FindRecords(record) { }
    /**
     *Not yet Implimented
     *
     * @param {*} ownerId
     * @param {*} recordId
     * @memberof Neos
     */
    FetchRecord(ownerId, recordId) { }
    /**
     *
     *
     * @param {String} UserId Neos User Id to send
     * @param {String} Message Text to Send
     * @memberof Neos
     */
    SendTextMessage(UserId, Message) {
        this._UserMessage.UserMessages(UserId, this.CloudXInterface.Messages)
        this._UserMessage.SendTextMessage(Message)
    }
}
module.exports = Neos