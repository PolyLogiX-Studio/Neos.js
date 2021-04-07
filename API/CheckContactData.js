const { List } = require("./List");
/**.
 * Object Used in checking if a user is friends with a list of users
 *
 * @class CheckContactData
 * @property {Object} $b
 * @property {string} $b.ownerId
 * @property {string} $b.verificationKey
 * @property {List<string>} $b.contacts
 */
class CheckContactData {
	constructor($b) {
		/**@type {String}*/
		this.OwnerId = $b.ownerId;
		/** @type {string} */
		this.VerificationKey = $b.verificationKey;
		if (!($b.contacts instanceof List)) $b.contacts = List.ToList($b.contacts);
		/**@type {List<String>}*/
		this.Contacts = $b.contacts;
	}
}
module.exports = { CheckContactData };
