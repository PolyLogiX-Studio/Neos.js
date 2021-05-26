import { v4 as uuidv4 } from "uuid";
export class ThumbnailInfo {
	public static VERSION_KEY = "-v2";
	public static VERSION = 1;
	public get IsVersion2(): boolean {
		return ThumbnailInfo.IsIdVersion2(this.Id);
	}
	public static GenerateID(version: number): string {
		return uuidv4() + (version > 0 ? "-v2" : "") + ".webp";
	}
	public static IsIdVersion2(id: string): boolean {
		return id != null && id.includes("-v2");
	}
	public Id: string;
	public Key?: string;
	public UploaderIP?: string;
	public SessionId?: string;
	public UploaderOwnerId?: string;
	constructor($b: ThumbnailInfoJSON) {
		this.Id = $b.id;
		this.Key = $b.key;
		this.UploaderIP = $b.uploaderIP;
		this.SessionId = $b.sessionId;
		this.UploaderOwnerId = $b.uploaderOwnerId;
	}
	toJSON(): ThumbnailInfoJSON {
		return {
			id: this.Id,
			key: this.Key,
			uploaderIP: this.UploaderIP,
			sessionId: this.SessionId,
			uploaderOwnerId: this.UploaderOwnerId,
		};
	}
}
export interface ThumbnailInfoJSON {
	id: string;
	key?: string;
	uploaderIP?: string;
	sessionId?: string;
	uploaderOwnerId?: string;
}
