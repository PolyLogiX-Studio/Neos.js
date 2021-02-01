const { Out } = require("./Out");
const { Dictionary } = require("./Dictionary");
const { SessionAccessLevel } = require("./SessionAccessLevel");
const { Friend } = require("./Friend");
/**
 * @class FriendManager
 */
class FriendManager {
	static get UPDATE_PERIOD_SECONDS() {
		return 5;
	}
	constructor(cloud) {
		this.Cloud = cloud;
		/** @type Dictionary<string, Friend> */
		this.friends = new Dictionary();
		/**
		 * @private
		 * @type Dictionary<string, SessionInfo> */
		this._friendSessions;
		/** @type Date */
		this.lastStatusUpdate = new Date(0);
		this.initialFetch = false;
		/** @type Date */
		this.lastRequest = new Date(0);
		/**
		 * @private
		 * @type boolean */
		this._friendsChanged;
		/** @type CloudXInterface */
		this.Cloud;
		/** @type Number */
		this.FriendRequestCount;
		Object.defineProperties(this, {
			_friendSessions: {
				value: new Dictionary(),
				writable: true,
			},
			_lock: {
				value: new Object(),
				writable: false,
			},
			_friendsChanged: {
				value: new Boolean(),
				writable: true,
			},
		});
	}

	/**
	 *
	 *
	 * @param {CloudXInterface} cloud
	 * @memberof FriendManager
	 */
	FriendManager(cloud) {
		this.Cloud = cloud;
	}
	/**
	 *
	 * @returns {Boolean}
	 * @readonly
	 * @memberof FriendManager
	 */
	get FriendCount() {
		return this.friends.Count;
	}
	/**
	 *
	 *
	 * @param {List<Friend>} list
	 * @memberof FriendManager
	 */
	GetFriends(friendId) {
		var friend = new Out();
		switch (friendId.constructor.name) {
		case "List":
			for (let friend of this.friends) {
				friendId.Add(friend.Value);
			}
			break;
		case "String":
			if (this.friends.TryGetValue(friendId, friend)) return friend.Out;
			return null;
		}
	}

	/**
	 *
	 *
	 * @param {Action<Friend>} action
	 * @memberof FriendManager
	 */
	ForeachFriend(action) {
		for (let friend of this.friends) {
			action(friend.Value);
		}
	}
	/**
	 *
	 *
	 * @param {List<SessionInfo>} sessions
	 *
	 * @memberof FriendManager
	 */
	GetFriendSessions(sessions) {
		for (let friendSession of this._friendSessions) {
			sessions.Add(friendSession.Value);
		}
		return this._friendSessions.Count;
	}
	ForeachFriendSession(action) {
		for (let friendSession of this._friendSessions) {
			action(friendSession.Value);
		}
	}
	/**
	 *
	 *
	 * @param {string} friendId
	 * @returns {(Friend | Friend<Null>)}
	 * @memberof FriendManager
	 */
	GetFriend(friendId) {
		let friend = new Out();
		if (this.friends.TryGetValue(friendId, friend)) return friend.Out;
		return null;
	}
	FindFriend(predicate) {
		for (let friend of this.friends) {
			if (predicate(friend.Value)) return friend.Value;
		}
		return null;
	}
	IsFriend(userId) {
		let friend = new Out();
		if (this.friends.TryGetValue(userId, friend))
			return friend.Out.FriendStatus === "Accepted";
		return false;
	}

	/**
	 *	Get the number of friends in a session
	 *
	 * @param {SessionInfo} session
	 * @returns {Number} Friends in Session
	 * @memberof FriendManager
	 */
	CountPresentFriends(session) {
		if (session.SessionUsers == null || session.SessionUsers.length === 0)
			return 0;
		var num = 0;
		for (let sessionUser of session.SessionUsers) {
			if (
				sessionUser.IsPresent &&
				sessionUser.UserId != null &&
				this.friends.ContainsKey(sessionUser.UserId)
			)
				num++;
		}
		return num;
	}

	/**
	 *
	 * @param {(String | Friend)} friend
	 * @memberof FriendManager
	 */
	AddFriend(friend) {
		switch (friend.constructor.name) {
		case "String":
			this.AddFriend(
				new Friend({
					id: friend,
					friendUsername: friend.substr(2),
					friendStatus: "Accepted",
				})
			);
			break;
		case "Friend":
			friend.OwnerId = this.Cloud.CurrentUser.Id;
			friend.FriendStatus = "Accepted";
			this.Cloud.UpsertFriend(friend);
			this.AddedOrUpdated(friend);
			break;
		}
	}
	RemoveFriend(friend) {
		friend.OwnerId = this.Cloud.CurrentUser.Id;
		friend.FriendStatus = "Ignored";
		this.Cloud.DeleteFriend(friend);
		this.Removed(friend);
	}
	IgnoreRequest(friend) {
		friend.OwnerId = this.Cloud.CurrentSession.UserId;
		friend.FriendStatus = "Ignored";
		this.Cloud.UpsertFriend(friend);
		this.AddedOrUpdated(friend);
	}
	/**
	 *
	 *
	 * @param {Friend} friend
	 * @memberof FriendManager
	 */
	AddedOrUpdated(friend) {
		let old = new Out();
		if (!this.friends.TryGetValue(friend.FriendUserId, old)) {
			this.friends.Add(friend.FriendUserId, friend);
			let friendAdded = this.FriendAdded;
			if (friendAdded != null) {
				friendAdded(friend);
			}
			this._friendsChanged = true;
		} else {
			if (!friend.IsSame(old.Out)) {
				this.friends.Replace(friend.FriendUserId, friend);
				let friendUpdated = this.FriendUpdated;
				if (friendUpdated != null) friendUpdated(friend, old.Out);
				this._friendsChanged = true;
			}
		}
	}
	/**
	 *
	 *
	 * @param {Friend} friend
	 * @memberof FriendManager
	 */
	Removed(friend) {
		this.friends.Remove(friend.FriendUserId);
		let friendRemoved = this.FriendRemoved;
		if (friendRemoved != null) friendRemoved(friend);
		this._friendsChanged = true;
	}
	Reset() {
		for (let friend of this.friends) {
			let friendRemoved = this.FriendRemoved;
			if (friendRemoved != null) {
				friendRemoved(friend.Value);
			}
		}
		this.friends.Clear();
		this.lastStatusUpdate = new Date(0);
		this.lastRequest = new Date(0);
	}
	Update() {
		if (this._friendsChanged) {
			this._friendsChanged = false;
			let num;
			num = this.friends.filter((f) => {
				if (f.Value.FriendStatus === "Requested")
					return f.Value.FriendUserId !== this.Cloud.CurrentUser.Id;
				return false;
			}).length;
			this._friendSessions.Clear();
			for (let friend of this.friends) {
				if (!friend.Value.UserStatus) friend.Value.UserStatus = {};
				if (friend.Value.UserStatus.ActiveSessions != null) {
					for (let activeSession in friend.Value.UserStatus.ActiveSessions) {
						if (
							activeSession.AccessLevel === SessionAccessLevel.Friends &&
							!this._friendSessions.ContainsKey(activeSession.SessionId)
						)
							this._friendSessions.Add(activeSession.SessionId, activeSession);
					}
				}
			}
			if (num !== this.FriendRequestCount) {
				this.FriendRequestCount = num;
				let requestCountChanged = this.FriendRequestCountChanged;
				if (requestCountChanged != null)
					requestCountChanged(this.FriendRequestCount);
			}
			let friendsChanged = this.FriendsChanged;
			if (friendsChanged != null) friendsChanged();
		}
		if (
			this.Cloud.CurrentUser == null ||
			new Date(new Date() - this.lastRequest).getTime() <
				FriendManager.UPDATE_PERIOD_SECONDS * 1000
		) {
			return;
		}
		this.lastRequest = new Date();
		if (!this.initialFetch) {
			this.lastStatusUpdate = null;
			this.initialFetch = true;
		}
		this.Cloud.GetFriends(this.lastStatusUpdate).then((friends) => {
			if (friends.IsError) {
				return;
			}
			for (let friend of friends.Entity) {
				if (friend.UserStatus != null) {
					this.lastStatusUpdate = new Date();
				}
				this.AddedOrUpdated(friend);
			}
		});
	}
}
module.exports = {
	FriendManager,
};
