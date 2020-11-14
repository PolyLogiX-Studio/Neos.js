//Dependencies
String.prototype.GetHashCode = function () {
	var hash = 0,
		i,
		chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};
const { RecordUtil } = require("./RecordUtil");
const { OwnerType } = require("./OwnerType");
const { IdUtil } = require("./IdUtil");
//Code

class RecordId {
	/**
	 *Creates an instance of RecordId.
	 * @param {{
	 * recordId: string,
	 * ownerId: string
	 * }} [$b]
	 * @memberof RecordId
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.Id = $b.recordId;
		this.OwnerId = $b.ownerId;
	}
	GetHashCode() {
		return this.Id.GetHashCode() ^ this.OwnerId.GetHashCode();
	}
	/**
	 *
	 *
	 * @param {RecordId} other
	 * @returns {Boolean}
	 * @memberof RecordId
	 */
	Equals(other) {
		if (this.Id === other.Id) return this.OwnerId === other.OwnerId;
		return false;
	}
	/**
	 *
	 *
	 * @param {string} ownerId
	 * @param {string} recordId
	 * @memberof RecordId
	 */
	RecordId(ownerId, recordId) {
		this.OwnerId = ownerId;
		this.Id = recordId;
	}
	get IsValid() {
		return RecordId.IsValidId(this.OwnerId, this.Id);
	}
	static IsValidId(ownerId, id) {
		return RecordUtil.IsValidRecordID(id) && IdUtil.GetOwnerType(ownerId) != OwnerType.INVALID;
	}
}
module.exports = {
	RecordId,
};
