class ThumbnailInfo {
  /**
   *Creates an instance of ThumbnailInfo.
   * @param {{
   * id: string,
   * key: string
   * }} $b
   * @memberof ThumbnailInfo
   */
  constructor($b) {
    if (!b) $b = {};
    this.MAX_THUMBNAIL_LIFETIME_MINUTES = 10;
    this.Id = $b.id;
    this.Key = $b.key || null;
  }
}
module.exports = {
  ThumbnailInfo,
};
