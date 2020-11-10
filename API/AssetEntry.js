/**
 *
 * @public
 * @class AssetEntry
 */
class AssetEntry {
	/**
	 *Creates an instance of AssetEntry.
	 * @param {*} $b
	 * @memberof AssetEntry
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.id = $b.id || new String();
		this.OwnerId = $b.ownerId || new String();
		this.Entry = $b.entry || null;
		this.ComputeLock = $b.computeLock || null;
	}
	/**
	 *
	 * @public
	 * @memberof AssetEntry
	 */
	get AssetHash() {
		if (this.OwnerId == null || !this.OwnerId.startsWith("A-")) {
			throw new Error("OwnerId is invalid, cannot extract asset hash from it");
		}
		return this.OwnerId.substring("A-".length);
	}
	set AssetHash(value) {
		this.OwnerId = "A-" + value;
	}
}
module.exports = {
	AssetEntry,
};
