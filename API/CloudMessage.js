/**
 * Cloud Message Object
 * @class CloudMessage
 * @param {Object} $b
 * @param {string} $b.message
 */
class CloudMessage {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.Message = $b.Message;
	}
	/**
	 * Extract Message Contents from string
	 * @static
	 * @param {string} content
	 * @returns {string} Message
	 * @memberof CloudMessage
	 */
	static ExtractMessage(content) {
		try {
			let c = JSON.parse(content);
			return c.Message != null ? c.Message : c;
		} catch (err) {
			console.log(err);
			return content;
		}
	}
}
module.exports = {
	CloudMessage,
};
