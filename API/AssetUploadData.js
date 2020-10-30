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

class AssetVariantComputationTask {
  /**
   *Creates an instance of AssetVariantComputationTask.
   * @param {{
   * assetSignature: string,
   * variantId: string,
   * entityType: AssetVariantEntityType
   * }} $b
   * @memberof AssetVariantComputationTask
   */
  constructor($b) {
    if (!$b) $b = {};
    this.AssetSignature = $b.assetSignature;
    this.VariantId = $b.variantId;
    this.EntityType = $b.entityType;
  }
}
module.exports = {
  AssetUploadData,
};
