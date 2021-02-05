const { ComputationLock } = require("./ComputationLock");
/**
 * Asset Entry Object
 * Generic
 * @public
 * @class AssetEntry
 * @param {Object} $b
 * @param {string} $b.id
 * @param {string} $b.ownerId
 * @param {T} $b.entry
 * @param {ComputationLock} $b.computeLock
 * @property {string} Id
 * @property {string} OwnerId
 * @property {T} Entry
 * @property {ComputationLock} ComputeLock
 * @template T
 */
class AssetEntry {
	constructor($b) {
		if (!$b) $b = {};
		/** Asset ID
		 * @type {string} */
		this.Id = $b.id || new String();
		/** Owner ID - Hash
		 * @type {string} */
		this.OwnerId = $b.ownerId || new String();
		/** Entry
		 * @type {T} */
		this.Entry = $b.entry || null;
		/** Computation Lock
		 * @type {ComputationLock} */
		this.ComputeLock;
		if ($b.computeLock instanceof ComputationLock)
			this.ComputeLock = $b.computeLock;
		else this.ComputeLock = new ComputationLock($b.computeLock);
	}
	/**
	 * Asset hash.
	 * Setting a new value will override OwnerId
	 * @public
	 * @memberof AssetEntry
	 * @type {string}
	 * @instance
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
