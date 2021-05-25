import type { UploadState } from "./UploadState";
export class AssetUploadData {
	public Signature: string;
	public Variant: string;
	public OwnerId: string;
	public TotalBytes: number;
	public ChunkSize: number;
	public TotalChunks: number;
	public UploadState: UploadState;
	constructor($b: AssetUploadDataJSON) {
		this.Signature = $b.signature;
		this.Variant = $b.variant;
		this.OwnerId = $b.ownerId;
		this.TotalBytes = $b.totalBytes;
		this.ChunkSize = $b.chunkSize;
		this.TotalChunks = $b.totalChunks;
		this.UploadState = $b.uploadState;
	}
	toJSON(): AssetUploadDataJSON {
		return {
			signature: this.Signature,
			variant: this.Variant,
			ownerId: this.OwnerId,
			totalBytes: this.TotalBytes,
			chunkSize: this.ChunkSize,
			totalChunks: this.TotalChunks,
			uploadState: this.UploadState,
		};
	}
}
export interface AssetUploadDataJSON {
	signature: string;
	variant: string;
	ownerId: string;
	totalBytes: number;
	chunkSize: number;
	totalChunks: number;
	uploadState: UploadState;
}
