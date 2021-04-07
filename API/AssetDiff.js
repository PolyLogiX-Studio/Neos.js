const { Enumerable } = require("./Enumerable");
/**
 * @typedef {Enumerable} AssetDiffEnum
 * @enum {Enumerable<string>} AssetDiffEnum
 * @readonly
 * @property {"Added"} Added
 * @property {"Unchanged"} Unchanged
 * @property {"Removed"} Removed
 */
/**
 * AssetDiff Object.
 *
 * @class AssetDiff
 *
 * @param {Object} $b
 * @param {string} $b.hash - Asset hash.
 * @param {number} $b.bytes - Size.
 * @param {AssetDiffEnum} $b.state - Asset State.
 * @param {boolean} [$b.isUploaded=false] - Is asset on the Cloud?
 * @property {string} Hash - Asset hash.
 * @property {number} Bytes - Size.
 * @property {AssetDiffEnum} State - Asset State.
 * @property {boolean} [IsUploaded=false] - Is asset on the Cloud?
 * @borrows AssetDiffEnum
 */
class AssetDiff {
	constructor($b) {
		if (!$b) $b = {};
		/** Asset Hash.
		 *
		 * @type {string}
		 * @memberof AssetDiff
		 * @instance
		 */
		this.Hash = $b.hash;
		/** Size of asset.
		 *
		 * @type {number}
		 * @memberof AssetDiff
		 * @instance
		 */
		this.Bytes = $b.bytes;
		/** Asset State.
		 *
		 * @type {AssetDiffEnum}
		 * @memberof AssetDiff
		 * @instance
		 */
		this.State =
			typeof $b.state === "string" ? $b.state : this.Diff.FromNumber($b.state);
		/** Is the asset on the cloud.
		 *
		 * @type {boolean}
		 * @memberof AssetDiff
		 * @instance
		 */
		this.IsUploaded = $b.isUploaded || new Boolean();
		/** Diff Enum.
		 *
		 * @type {AssetDiffEnum}
		 * @memberof AssetDiff
		 * @instance
		 */
		this.Diff = new Enumerable(["Added", "Unchanged", "Removed"]);
	}
}
module.exports = {
	AssetDiff,
};
