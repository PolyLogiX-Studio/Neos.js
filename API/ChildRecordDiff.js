const { Enumerable } = require("./Enumerable");
const { RecordId } = require("./RecordId");
const { RecordInfo } = require("./RecordInfo");
/**
 * @class ChildRecordDiff
 * @param {Object} $b
 * @param {RecordInfoOperation}
 */
class ChildRecordDiff {
	constructor($b) {
		if (!$b) $b = {};

		/**@type {ChildRecordDiff.RecordInfoOperation} */
		this.Operation =
			typeof $b.operation === "string"
				? $b.operation
				: this.RecordInfoOperation.FromNumber($b.operation);
		/**@type {Date} */
		this.Created = new Date($b.created);
		/**@type {RecordId} */
		this.ParentRecord =
			$b.parentRecord instanceof RecordId
				? $b.parentRecord
				: new RecordId($b.parentRecord);
		/**@type {RecordInfo} */
		this.RecordInfo =
			$b.recordInfo instanceof RecordInfo
				? $b.parentRecord
				: new RecordInfo($b.recordInfo);
	}
	/**
	 * @static
	 * @memberof ChildRecordDiff
	 * @typedef {ChildRecordDiff.RecordInfoOperation} RecordInfoOperation
	 * @enum {Enumerable<string>} AssetDiffEnum
	 * @property {"Upsert"} Upsert
	 * @property {"Remove"} Remove
	 */
	static get RecordInfoOperation() {
		return new Enumerable(["Upsert", "Remove"]);
	}
}
module.exports = {
	ChildRecordDiff,
};
