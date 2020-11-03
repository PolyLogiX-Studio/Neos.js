const { UserStatus } = require("./UserStatus");
const { UserProfile } = require("./UserProfile");
class Friend {
	/**
   *Creates an instance of Friend.
   * @param {*} $b
   * @memberof Friend
   */
	constructor($b) {
		if (!$b) $b = {};
		this.FriendUserId = $b.id;
		this.OwnerId = $b.ownerId;
		this.FriendUsername = $b.friendUsername;
		this.FriendStatus = $b.friendStatus;
		this.IsAccepted = $b.isAccepted;
		this.UserStatus = new UserStatus($b.userStatus);
		this.LatestMessageTime = $b.latestMessageTime;
		this.Profile = new UserProfile($b.profile);
	}
	/**
   *
   *
   * @param {Friend} other
   * @memberof Friend
   */
	IsSame(other) {
		if (
			this.FriendUserId === other.FriendUserId &&
      this.OwnerId === other.OwnerId &&
      this.FriendUsername === other.FriendUsername &&
      this.IsAccepted === other.IsAccepted &&
      this.FriendStatus === other.FriendStatus &&
      this.LatestMessageTime === other.LatestMessageTime &&
      this.UserStatus.IsSame(other.UserStatus)
		)
			return true;
		return false;
	}
}
module.exports = {
	Friend,
};
