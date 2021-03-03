const { v4: uuidv4 } = require("uuid");
/**
 * Unused
 * @class ComputationLock
 * @param {object} $b
 * @param {string} $b.token
 * @param {Date} $b.ExpireTimestamp
 */
class ComputationLock {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string}*/
		this.Token = $b.token;
		/**@type {Date}*/
		this.ExpireTimestamp = $b.timestamp || new Date();
	}
	/**
	 * Is the lock currently in use
	 * @readonly
	 * @memberof ComputationLock
	 */
	get IsLocked() {
		return (
			!(this.Token === "" || this.Token == null) &&
			new Date() > this.ExpireTimestamp
		);
	}
	/**
	 * Try to Lock
	 * @param {Date} duration
	 * @returns {Boolean}
	 * @memberof ComputationLock
	 */
	TryLock(duration) {
		if (this.IsLocked) return false;
		this.Token = new uuidv4();
		this.ExpireTimestamp = new Date() + duration;
		return true;
	}
	/**
	 *
	 *
	 * @param {*} token
	 * @param {*} duration
	 * @returns {Boolean}
	 * @memberof ComputationLock
	 */
	TryExtend(token, duration) {
		if (token !== this.Token) return false;
		this.ExpireTimestamp = new Date() + duration;
		return true;
	}
	/**
	 *
	 *
	 * @param {*} token
	 * @returns {Boolean}
	 * @memberof ComputationLock
	 */
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
