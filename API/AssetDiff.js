const { Enumerable } = require("./Enumerable");
/**
 *
 * @class AssetDiff
 */
class AssetDiff {
	/**
   *Creates an instance of AssetDiff.
   * @param {{
   * hash:string,
   * bytes:Number,
   * state: AssetDiff.Diff,
   * isUploaded?: Boolean
   * }} $b
   * @memberof AssetDiff
   */
	constructor($b) {
		if (!$b) $b = {};
		this.Hash = $b.hash;
		this.Bytes = $b.bytes;
		this.State = $b.state;
		this.IsUploaded = $b.isUploaded || new Boolean();
		/**@type {Enumerable<String>} */
		this.Diff = new Enumerable(["Added", "Unchanged", "Removed"]);
	}
}
module.exports = {
	AssetDiff,
};
