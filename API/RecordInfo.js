class RecordInfo {
  /**
   *Creates an instance of RecordInfo.
   * @param {{
   * recordId: string,
   * ownerId: string,
   * name: string,
   * assetUri: string,
   * thumbnailUri: string,
   * globalVersion: Number
   * }} $b
   * @memberof RecordInfo
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Id = $b.recordId;
    this.OwnerId = $b.ownerId;
    this.Name = $b.name;
    this.AssetURI = $b.assetUri;
    this.ThumbnailURI = $b.thumbnailUri;
    this.GlobalVersion = $b.globalVersion;
  }
}
module.exports = {
  RecordInfo,
};
