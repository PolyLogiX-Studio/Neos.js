export class RecordInfo {
	RecordId: string;
	OwnerId: string;
	Name: string;
	AssetUri: string;
	ThumbnailUri: string;
	Globalversion: number;
	constructor($b: RecordInfoJSON) {
		this.RecordId = $b.recordId;
		this.OwnerId = $b.ownerId;
		this.Name = $b.name;
		this.AssetUri = $b.assetUri;
		this.ThumbnailUri = $b.thumbnailUri;
		this.Globalversion = $b.globalVersion;
	}
	toJSON(): RecordInfoJSON {
		return {
			recordId: this.RecordId,
			ownerId: this.OwnerId,
			name: this.Name,
			assetUri: this.AssetUri,
			thumbnailUri: this.ThumbnailUri,
			globalVersion: this.Globalversion,
		};
	}
}
export interface RecordInfoJSON {
	recordId: string;
	ownerId: string;
	name: string;
	assetUri: string;
	thumbnailUri: string;
	globalVersion: number;
}
