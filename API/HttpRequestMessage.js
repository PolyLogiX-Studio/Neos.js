/**.
 * Tst
 *
 * @class HttpRequestMessage
 */
class HttpRequestMessage {
	constructor(method, uri) {
		this.Headers = {
			Accept: "application/json",
		};
		this.Content = {};
		this.Method = method;
		this.RequestUri = uri;
	}
}
module.exports = {
	HttpRequestMessage,
};
