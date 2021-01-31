/**
 * Test
 * @class HttpResponseMessage
 */
class HttpResponseMessage {
	constructor() {
		/**@type {Object} */
		this.Headers = {};
		/**@type {Object} */
		this.Content = {};
		/**@type {Object} */
		this.Method = new String();
		/**@type {Object} */
		this.RequestUri = new String();
	}
}
module.exports = {
	HttpResponseMessage,
};
