const { v4: uuidv4 } = require("uuid");
/**
 * Generates a Cancelation Token
 * @class CancellationTokenSource
 */
class CancellationTokenSource {
	constructor() {
		/**@type {string} */
		this.Token = uuidv4();
		this._cancel = false;
	}
	Cancel() {
		this._cancel = true;
	}
	IsCancellationRequested() {
		return this._cancel;
	}
}
module.exports = {
	CancellationTokenSource,
};
