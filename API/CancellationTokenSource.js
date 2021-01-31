const { v4: uuidv4 } = require("uuid");
/**
 * Generates a Cancelation Token
 * @class CancellationTokenSource
 */
class CancellationTokenSource {
	constructor() {
		/**@type {string} */
		this.Token = uuidv4();
	}
}
module.exports = {
	CancellationTokenSource,
};
