export class NeosDBAsset {
	public Hash: string;
	public Bytes: number;
	constructor($b: NeosDBAssetJSON) {
		this.Hash = $b.hash;
		this.Bytes = $b.bytes;
	}
	toJSON(): NeosDBAssetJSON {
		return {
			hash: this.Hash,
			bytes: this.Bytes,
		};
	}
}
export interface NeosDBAssetJSON {
	hash: string;
	bytes: number;
}
