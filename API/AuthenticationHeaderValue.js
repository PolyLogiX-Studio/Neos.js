/**.
 * Create an Authentication Header Object
 *
 * @class AuthenticationHeaderValue
 * @param {string} bearer
 * @param {string} token
 */
class AuthenticationHeaderValue {
	constructor(bearer, token) {
		this.Authorization = bearer + " " + token;
	}
}
module.exports = {
	AuthenticationHeaderValue,
};
