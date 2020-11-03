const { v4: uuidv4 } = require("uuid");
class ComputationLock {
	constructor($b) {
		if (!$b) $b = {};
		this.Token = $b.token || new String();
		this.ExpireTimestamp = $b.timestamp || new Date();
	}
	get IsLocked() {
		return (
			!(this.Token === "" || this.Token == null) &&
      new Date() > this.ExpireTimestamp
		);
	}
	TryLock(duration) {
		if (this.IsLocked) return false;
		this.Token = new uuidv4();
		this.ExpireTimestamp = new Date() + duration;
		return true;
	}
	TryExtend(token, duration) {
		if (token !== this.Token) return false;
		this.ExpireTimestamp = new Date() + duration;
		return true;
	}
	TryRelease(token) {
		if (this.Token !== token) return false;
		this.Token = null;
		this.ExpireTimestamp = new Date();
		return true;
	}
}
module.exports = {
	ComputationLock,
};
