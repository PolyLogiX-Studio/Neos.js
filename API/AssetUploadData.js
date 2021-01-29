/**
 * Asset Upload Data Object
 * @class AssetUploadData
 * @template UploadState
 * @param {Object} $b
 * @param {string} $b.signature - Asset Signature
 * @param {string} $b.variant - Asset Variant
 * @param {string} $b.ownerId - Owner Id
 * @param {Number} $b.totalBytes - Asset Size
 * @param {Number} $b.chunkSize - Chunk Size
 * @param {Number} $b.totalChunks - Number of Chunks
 * @param {UploadState} $b.uploadState - Upload State, See {@link #uploadstate UploadState}
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
