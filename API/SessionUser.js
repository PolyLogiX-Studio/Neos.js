class SessionUser {
	constructor($b) {
		if (!$b) $b = {};
		this.Username = $b.username;
		this.UserID = $b.userID;
		this.IsPresent = $b.isPresent;
		this.OutputDevice = $b.outputDevice;
	}
	Equals(other) {
		if (
			this.Username === other.Username &&
			this.UserID === other.UserID &&
			this.OutputDevice === other.OutputDevice
		)
			return this.IsPresent === other.IsPresent;
		return false;
	}
}
module.exports = {
	SessionUser,
};
