const {CloudX} = require("./API.js")
const EventEmitter = require("events").EventEmitter
class Neos extends EventEmitter {
    constructor(options){
        super()
        this.CloudX = CloudX
        this.CloudXInterface = new CloudX.Shared.CloudXInterface(this)
        console.log(this.CloudXInterface.Update())
        this.CloudXInterface.OnLogin = function(){this.Events.emit('login')}
        this.CloudXInterface.OnLogout = function(){this.Events.emit("logout")}
        this.CloudXInterface.OnSessionUpdated = function(){this.Events.emit("sessionUpdated")}
        this.CloudXInterface.SessionChanged = function(session){this.Events.emit("sessionChanged", session)}
        this.CloudXInterface.UserUpdated = function(user){this.Events.emit("userUpdated", user)}
        this.CloudXInterface.MembershipsUpdated = function(memberships){this.Events.emit("membershipsUpdated", memberships)}
        this.CloudXInterface.GroupUpdated = function(group){this.Events.emit("groupUpdated", group)}
        this.CloudXInterface.GroupMemberUpdated = function(groupMember){this.Events.emit("groupMemberUpdated", groupMember)}
        this.CloudXInterface.Messages.onMessageReceived = function(message){this.Cloud.Events.emit("messageReceived", message)}
        this.CloudXInterface.Messages.messageCountChanged = function(count){this.Cloud.Events.emit("messageCountChanged", count)}
        this.CloudXInterface.Friends.FriendAdded = function(friend){this.Cloud.Events.emit("friendAdded", friend)}
        this.CloudXInterface.Friends.FriendUpdated = function(friend){this.Cloud.Events.emit("friendUpdated", friend)}
        this.CloudXInterface.Friends.FriendRemoved = function(friend){this.Cloud.Events.emit("friendRemoved", friend)}
        this.CloudXInterface.Friends.FriendRequestCountChanged = function(count){this.Cloud.Events.emit("friendRequestCountChanged", count)}
        this.CloudXInterface.Friends.FriendsChanged = function(){this.Cloud.Events.emit("friendsChanged")}
        this.emit("ready")
    }
}
module.exports = {Neos, CloudX}