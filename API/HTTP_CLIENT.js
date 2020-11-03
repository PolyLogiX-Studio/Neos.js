const { CloudResult } = require("./CloudResult");
const fetch = require("node-fetch");
/**
 *
 *
 * @class HTTP_CLIENT
 */
class HTTP_CLIENT {
	constructor() {}
	/**
   *
   * @param {HttpRequestMessage} request
   * @param {TimeSpan} token
   * @returns {Promise<HttpResponseMessage>}
   * @memberof HTTP_CLIENT
   */
	async SendAsync(request) {
		let state;
		let resHeaders;
		let dat = {
			method: request.Method,
		};
		dat.headers = request.Headers;
		if (
			request.Method == "POST" ||
      request.Method == "PATCH" ||
      request.Method == "PUT"
		)
			dat.body = request.Content;
		let response = await fetch(request.RequestUri, dat)
			.then((res) => {
				state = res.status;
				resHeaders = res.headers;
				return res.text().then((body) => {
					try {
						if (
							body == null ||
              body === "" ||
              !~resHeaders.get("content-type").indexOf("application/json")
						)
							return {};
						return JSON.parse(body);
					} catch (error) {
						return {
							response: body,
						};
					}
				});
			})
			.catch((err) => {
				throw new Error(err);
			});
		let cloudResult = new CloudResult("", state, response, resHeaders);
		cloudResult.CloudResult(state, response, resHeaders);
		return cloudResult;
	}
}
module.exports = {
	HTTP_CLIENT,
};
