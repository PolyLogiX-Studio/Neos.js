/**
 * Asset Upload Data Object
 * @class AssetUploadData
 * @template UploadState
 * @param {Object} $b
 * @param {string} $b.signature - Bloop
 * @param {string} $b.variant - Bloop
 * @param {string} $b.ownerId - Bloop
 * @param {Number} $b.totalBytes - Bloop
 * @param {Number} $b.chunkSize - Bloop
 * @param {Number} $b.totalChunks - Bloop
 * @param {UploadState} $b.uploadState - Bloop
 */
class AssetUploadData {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.Signature = $b.signature;
		/**@type {string} */
		this.Variant = $b.variant;
		/**@type {string} */
		this.OwnerId = $b.ownerId;
		/**@type {Number} */
		this.TotalBytes = $b.totalBytes;
		/**@type {Number} */
		this.ChunkSize = $b.chunkSize;
		/**@type {Number} */
		this.TotalChunks = $b.totalChunks;
		/**@type {UploadState} */
		this.UploadState = $b.uploadState;
	}
}
module.exports = {
	AssetUploadData,
};
