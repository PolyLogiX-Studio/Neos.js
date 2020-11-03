class UserSession {
	constructor($b) {
		if (!$b) $b = {};
		this.UserId = $b.userId || new String();
		this.SessionToken = $b.token || new String();
		this.SessionCreated = $b.created || new Date();
		this.SessionExpire = $b.expire || new Date();
		this.SecretMachineId = $b.secretMachineId || new String();
		this.RememberMe = $b.rememberMe || new Boolean();
	}
	get IsExpired() {
		return new Date() > this.SessionExpire;
	}
}
module.exports = {
	UserSession,
};
