/**
 *
 *
 * @class AssetInfo
 */
class AssetInfo {
  /**
   *Creates an instance of AssetInfo.
   * @memberof AssetInfo
   */
  constructor($b) {
    if (!$b) $b = {};
    this.OwnerId = $b.ownerId || new String();
    this.AssetHash = $b.assetHash || new String();
    this.Bytes = $b.bytes || new Number();
    this.Free = $b.free || new Boolean();
    this.IsUploaded = $b.isUploaded || new Boolean();
    this.UploaderUserId = $b.uploadUserId || new String();
    this.CountsAgainstMemberQuota = $b.bytes || new Boolean();
  }
}
module.exports = {AssetInfo}