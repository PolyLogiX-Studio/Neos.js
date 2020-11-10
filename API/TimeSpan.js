const { Type } = require("./Type");
/**
 * Work in Miliseconds
 *
 * @class TimeSpan
 */
class TimeSpan {
	constructor(num) {
		this.msecs = num != null ? num : 0;
	}
	static fromSeconds(num) {
		return num * 1000;
	}

	static fromMinutes(num) {
		return num * 60000;
	}

	/**
	 *
	 *  Delay by ms
	 * @param {TimeSpan} timespan
	 * @returns {Promise}
	 */
	static Delay(timespan) {
		if (Type.Get(timespan) !== "TimeSpan") timespan = new TimeSpan(timespan);
		return new Promise((resolve) => setTimeout(resolve, timespan.msecs));
	}
}
module.exports = {
	TimeSpan,
};
