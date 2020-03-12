const {CloudX} = require("./API.js")
const config = require("./package.json")
const EventEmitter = require("events").EventEmitter
class Events extends EventEmitter{
    constructor(){super()}
}
class Neos extends EventEmitter {
    constructor(options){
        super()
        //Setup Options
        if (!options) options = {}
        if (options.AutoReadMessages == null) options.AutoReadMessages = true
        if (!options.OnlineState) options.OnlineState = "Online"
        if (!options.NeosVersion) options.NeosVersion = "Neos.JS"
        if (!options.CompatabilityHash) options.CompatabilityHash = "BOT"


        this.Events = new Events()
        this.CloudX = CloudX
        this.CloudXInterface = new CloudX.Shared.CloudXInterface(this.Events, config.main, config.version)
        this._UserMessage = new CloudX.Shared.MessageManager.UserMessages()
        this._UserMessage.Cloud = this.CloudXInterface
        this.CloudXInterface.OnLogin = ()=>{this.Events.emit('login')}
        this.CloudXInterface.OnLogout = ()=>{this.Events.emit("logout")}
        this.CloudXInterface.OnSessionUpdated = ()=>{this.Events.emit("sessionUpdated")}
        this.CloudXInterface.SessionChanged = (session)=>{this.Events.emit("sessionChanged", session)}
        this.CloudXInterface.UserUpdated = (user)=>{this.Events.emit("userUpdated", user)}
        this.CloudXInterface.MembershipsUpdated = (memberships)=>{this.Events.emit("membershipsUpdated", memberships)}
        this.CloudXInterface.GroupUpdated = (group)=>{this.Events.emit("groupUpdated", group)}
        this.CloudXInterface.GroupMemberUpdated = (groupMember)=>{this.Events.emit("groupMemberUpdated", groupMember)}
        this.CloudXInterface.Messages.onMessageReceived = (message)=>{this.Events.emit("messageReceived", message)}
        this.CloudXInterface.Messages.messageCountChanged = (count)=>{this.Events.emit("messageCountChanged", count)}
        this.CloudXInterface.Friends.FriendAdded = (friend)=>{this.Events.emit("friendAdded", friend)}
        this.CloudXInterface.Friends.FriendUpdated = (friend)=>{this.Events.emit("friendUpdated", friend)}
        this.CloudXInterface.Friends.FriendRemoved = (friend)=>{this.Events.emit("friendRemoved", friend)}
        this.CloudXInterface.Friends.FriendRequestCountChanged = (count)=>{this.Events.emit("friendRequestCountChanged", count)}
        this.CloudXInterface.Friends.FriendsChanged = ()=>{this.Events.emit("friendsChanged")}
        //this.Interval = setInterval(this.CloudXInterface.Update,1000)
        this.lastStatusUpdate = null
        this.Status = new CloudX.Shared.UserStatus({onlineStatus:options.OnlineState, compatabilityHash:options.CompatabilityHash,neosVersion:options.NeosVersion})
        this.Events.on("login",()=>{
            clearInterval(this.Interval)
            this.Interval = setInterval(this.Update.bind(this),1000)
            this.emit("login")
        })
        this.Events.on("logout",()=>{
            this.CloudXInterface.Friends.FriendAdded = (friend)=>{this.Events.emit("friendAdded", friend)}
        this.CloudXInterface.Friends.FriendUpdated = (friend)=>{this.Events.emit("friendUpdated", friend)}
        this.CloudXInterface.Friends.FriendRemoved = (friend)=>{this.Events.emit("friendRemoved", friend)}
        this.CloudXInterface.Friends.FriendRequestCountChanged = (count)=>{this.Events.emit("friendRequestCountChanged", count)}
        this.CloudXInterface.Friends.FriendsChanged = ()=>{this.Events.emit("friendsChanged")}
        this.emit("logout")
        })
        this.Events.on("sessionUpdated",(session)=>{
            this.emit("sessionUpdated",session)
        })
        this.Events.on("sessionChanged",(session)=>{
            this.emit("sessionChanged",session)
        })
        this.Events.on("membershipsUpdated",(membership)=>{
            this.emit("membershipsUpdated",membership)            
        })
        this.Events.on("groupUpdated",(group)=>{
            this.emit("groupUpdated",group)
        })
        this.Events.on("groupMemberUpdated",(member)=>{
            this.emit("groupMemberUpdated",member)
        })
        this.Events.on("messageReceived",(message)=>{
            this.emit("messageReceived", message)
            if (options.AutoReadMessages)
                this.CloudXInterface.MarkMessagesRead([message])
            console.log(message.SenderId + ":" + message.Content)
        })
        this.Events.on("messageCountChanged",(count)=>{
            this.emit("messageCountChanged",count)
        })
        this.Events.on("friendAdded",(friend)=>{
            this.emit("friendAdded",friend)
        })
        this.Events.on("friendUpdated",(friend)=>{
            this.emit('friendUpdated',friend)
        })
        this.Events.on("friendRemoved",()=>{
            this.emit("friendRemoved",friend)
        })
        this.Events.on("friendRequestCountChanged",(count)=>{
            this.emit("friendRequestCountChanged",count)
        })
        this.Events.on("friendsChanged",()=>{
            this.emit("FriendsChanged")
        })
        this.Events.on("userUpdated",(user)=>{
            this.emit("userUpdated",user)
        })
        
        
    }
    Update(){
        this.CloudXInterface.Update()
        if (!this.CloudXInterface.CurrentUser.Id) return;
        if (!this.lastStatusUpdate) return this.UpdateStatus();
        if(this.lastStatusUpdate.getSeconds() > 30) return this.UpdateStatus()
    }
    UpdateStatus(){
        this.CloudXInterface.UpdateStatus(this.Status);
        this.lastStatusUpdate = new Date()
    }
    async Login(credential, password, sessionToken, machineId, rememberMe, recoverCode) {
        return await this.CloudXInterface.Login(credential, password, sessionToken, machineId, rememberMe, recoverCode)
    }
    GetFriends(FriendId){}
    GetFriend(friend){

    }
    IsFriend(friend){

    }
    AddFriend(friend){

    }
    RemoveFriend(friend){
    }
    IgnoreRequest(friend){

    }
    GetUserMessages(UserId){}
    GetAllUserMessages(){}
    /**
     *
     *
     * @param {String} UserId Neos User Id to send
     * @param {String} Message Text to Send
     * @memberof Neos
     */
    SendTextMessage(UserId,Message){
        this._UserMessage.UserMessages(UserId, this.CloudXInterface.Messages)
        this._UserMessage.SendTextMessage(Message)
    }
}
module.exports = Neos