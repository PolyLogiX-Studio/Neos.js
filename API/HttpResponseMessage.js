/**.
 * Test
 *
 * @class HttpResponseMessage
 */
class HttpResponseMessage {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {Object} */
		this.Headers = $b.headers || {};
		/**@type {Object} */
		this.Content = $b.content || {};
		/**@type {string} */
		this.Method = $b.method || new String();
		/**@type {Object} */
		this.RequestUri = $b.requestUri || new String();
	}
}
module.exports = {
	HttpResponseMessage,
};
