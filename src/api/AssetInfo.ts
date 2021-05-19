/** AssetInfo.
 * @class AssetInfo
 */
export class AssetInfo {
	public OwnerId: string;
	public AssetHash: string;
	public Bytes: number;
	public Free: number;
	public IsUploaded: boolean;
	public UploaderUserId?: string;
	public CountsAgainstMemberQuota?: boolean;
	constructor($b: AssetInfoJSON) {
		this.OwnerId = $b.ownerId;
		this.AssetHash = $b.assetHash;
		this.Bytes = $b.bytes;
		this.Free = $b.free;
		this.IsUploaded = $b.isUploaded;
		this.UploaderUserId = $b.uploaderUserId;
		this.CountsAgainstMemberQuota = $b.countsAgainstMemberQuota;
	}
	toJSON(): AssetInfoJSON {
		return {
			ownerId: this.OwnerId,
			assetHash: this.AssetHash,
			bytes: this.Bytes,
			free: this.Free,
			isUploaded: this.IsUploaded,
			uploaderUserId: this.UploaderUserId,
			countsAgainstMemberQuota: this.CountsAgainstMemberQuota,
		};
	}
}
interface AssetInfoJSON {
	ownerId: string;
	assetHash: string;
	bytes: number;
	free: number;
	isUploaded: boolean;
	uploaderUserId?: string;
	countsAgainstMemberQuota?: boolean;
}
