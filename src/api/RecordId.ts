import { RecordUtil } from "./RecordUtil";
import { IdUtil } from "./IdUtil";
import { OwnerType } from "./OwnerType";
import { Out } from "@bombitmanbomb/utils";
export class RecordId {
	public Id!: string;
	public OwnerId!: string;
	public RecordId(ownerId: string, recordId: string): void {
		this.OwnerId = ownerId;
		this.Id = recordId;
	}
	constructor($b: RecordIdJSON);
	constructor(ownerId: string, recordId: string);
	constructor($b?: RecordIdJSON | string, recordId?: string) {
		if (typeof $b === "string") {
			this.RecordId($b, recordId as string);
		} else if ($b != null) {
			this.RecordId($b.ownerId, $b.recordId);
		} else {
			this.OwnerId = (null as unknown) as string;
			this.Id = (null as unknown) as string;
		}
	}
	public get IsValid(): boolean {
		return RecordId.IsValidId(this.OwnerId, this.Id);
	}
	public Equals(other: RecordId | string): boolean {
		if (other instanceof RecordId) {
			return this.Id == other?.Id && this.OwnerId == other?.OwnerId;
		} else if (typeof other === "string") {
			if (other.trim() == "") return false;
			return (
				other.length == this.OwnerId.length + 1 + this.Id.length &&
				other.startsWith(this.OwnerId) &&
				other[this.OwnerId.length] == ":" &&
				other.endsWith(this.Id)
			);
		}
		return false;
	}
	toString(): string {
		return this.OwnerId + ":" + this.Id;
	}
	public static IsValidId(ownerId: string, id: string): boolean {
		return (
			RecordUtil.IsValidRecordID(id) &&
			IdUtil.GetOwnerType(ownerId) != OwnerType.INVALID
		);
	}
	public static TryParse(compositeId: string): RecordId;
	public static TryParse(
		compositeId: string,
		recordId?: Out<RecordId>
	): boolean;
	public static TryParse(
		compositeId: string,
		recordId?: Out<RecordId>
	): RecordId | boolean {
		if (recordId != null) {
			recordId.Out = RecordId.TryParse(compositeId);
			return recordId.Out != null;
		} else {
			if (compositeId == null || compositeId.trim() == "")
				return (null as unknown) as RecordId;
			const length = compositeId.indexOf(":");
			if (length < 0) return (null as unknown) as RecordId;
			const ownerId = compositeId.substr(0, length);
			const str = compositeId.substr(length + 1);
			return !RecordId.IsValidId(ownerId, str)
				? ((null as unknown) as RecordId)
				: new RecordId(ownerId, str);
		}
	}
	public static Equals(a: RecordId, b: RecordId): boolean {
		return a == null ? b == null : a.Equals(b);
	}
	toJSON(): RecordIdJSON {
		return {
			recordId: this.Id,
			ownerId: this.OwnerId,
		};
	}
}
export interface RecordIdJSON {
	recordId: string;
	ownerId: string;
}
