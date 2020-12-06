const { List } = require("./List");
class CheckContactData {
	constructor($b) {
		/**@type {String}*/
		this.OwnerId = $b.ownerId;
		/** @type {String} */
		this.VerificationKey = $b.verificationKey;
		if (!($b.contacts instanceof List)) $b.contacts = List.ToList($b.contacts);
		/**@type {List<String>}*/
		this.Contacts = $b.contacts;
	}
}
module.exports = { CheckContactData };
