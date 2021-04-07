/**
 *
 * @template T.
 * @class CloudResult
 * @param {Class} entity
 * @param {HttpStatusCode<number>} state
 * @param {string} content
 * @param {Object} resHeaders
 */
class CloudResult {
	constructor(entity, state, content, resHeaders) {
		this.CloudResult(state, content, resHeaders, entity);
	}
	/**@private */
	toJSON() {
		return this.toString();
	}
	/**@private */
	toString() {
		return "CloudResult - State: " + this.State + " Content: " + this.Content;
	}
	/**
	 * @instance
	 * @param {HttpStatusCode<number>} state
	 * @param {string} content
	 * @param {Object} headers - Internal Use.
	 * @memberof CloudResult
	 */
	CloudResult(state, content, headers) {
		/**@type {HttpStatusCode<number>} */
		this.State = state;
		/**@type {string} */
		this.Content = content;
		/**@type {Object} */
		this.Headers = {};
		if (headers != null && Object.keys(headers).length) {
			for (let item of headers) {
				this.Headers[item[0]] = item[1];
			}
		}
		if (!this.IsError) return;
		if (content == null) return;
		try {
			this.Content = JSON.parse(content).Message;
		} catch (error) {
			this.Content = content;
		}
	}
	/**.
	 * Get the Result Content Entity
	 *
	 * @readonly
	 * @instance
	 * @returns {string}
	 * @memberof CloudResult
	 */
	get Entity() {
		return this.Content;
	}
	/**
	 * Is Valid?
	 *
	 * @instance
	 * @readonly
	 * @returns {boolean}
	 * @memberof CloudResult
	 */
	get IsOK() {
		if (this.State !== 200) return this.State === 204;
		return true;
	}
	/**
	 * Is Invalid?
	 *
	 * @instance
	 * @returns {boolean}
	 * @readonly
	 * @memberof CloudResult
	 */
	get IsError() {
		return !this.IsOK;
	}
	/**.
	 * Get the Status Code
	 *
	 * @instance
	 * @returns {number}
	 * @readonly
	 * @memberof CloudResult
	 */
	get StatusCode() {
		return this.State;
	}
	/**.
	 * Is the status code successfull
	 *
	 * @instance
	 * @memberof CloudResult
	 * @readonly
	 * @returns {boolean}
	 */
	get IsSuccessStatusCode() {
		return this.IsOK;
	}
}
module.exports = {
	CloudResult,
};
