/**
 * Create an instance of AssetInfo
 * @class AssetInfo
 *
 * @param {Object} $b
 * @param {string} $b.ownerId - Asset Owner Id
 * @param {string} $b.assetHash - Asset Hash
 * @param {number} $b.bytes - Asset Size
 * @param {number} $b.free - Free Space
 * @param {boolean} $b.isUploaded - Is in cloud
 * @param {(string | null)} $b.uploadUserId - User Id of uploader
 * @param {boolean | undefined} [$b.countsAgainstMemberQuota] - Counts against the user storage
 */
class AssetInfo {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.OwnerId = $b.ownerId;
		/**@type {string} */
		this.AssetHash = $b.assetHash;
		/**@type {number} */
		this.Bytes = $b.bytes;
		/**@type {number} */
		this.Free = $b.free;
		/**@type {boolean} */
		this.IsUploaded = $b.isUploaded;
		/**@type {(string | null)} */
		this.UploaderUserId = $b.uploadUserId || null;
		if ($b.countsAgainstMemberQuota != null) {
			/**@type {Boolean | undefined} */
			this.CountsAgainstMemberQuota = $b.countsAgainstMemberQuota;
		}
	}
}
module.exports = {
	AssetInfo,
};
