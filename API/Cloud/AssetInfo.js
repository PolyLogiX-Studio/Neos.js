class AssetInfo {
    constructor(){
        this.ownerId = new String()
        this.assetHash = new String()
        this.Bytes = new BigInt()
        this.Free = new Boolean()
        this.isUploaded = new Boolean()
        this.UploaderUserId = new String()
        this.CountsAgainstMemberQuota = new Boolean()
    }
}
module.exports = {AssetInfo}