class AssetUploadData {
	/**
	 *Creates an instance of AssetUploadData.
	 * @param {{
	 * signature: string,
	 * variant: string,
	 * ownerId: string
	 * totalBytes: Number,
	 * chunkSIze: Number,
	 * totalChunks: Number,
	 * uploadState: (UploadState)
	 * }} $b
	 * @memberof AssetUploadData
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.Signature = $b.signature;
		this.Variant = $b.variant;
		this.OwnerId = $b.ownerId;
		this.TotalBytes = $b.totalBytes;
		this.ChunkSIze = $b.chunkSIze;
		this.TotalChunks = $b.totalChunks;
		/** @template UploadState*/
		this.UploadState = $b.uploadState;
	}
}
module.exports = {
	AssetUploadData,
};
