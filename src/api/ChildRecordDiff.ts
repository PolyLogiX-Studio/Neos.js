import type { RecordId } from "./RecordId";
import type { RecordInfo } from "./RecordInfo";
export class ChildRecordDiff {
	public Operation: RecordInfoOperation;
	public Created: Date;
	public ParentRecord: RecordId;
	public RecordInfo: RecordInfo;
	constructor($b: ChildRecordDiffJSON) {
		this.Operation = $b.operation;
		this.Created = $b.created;
		this.ParentRecord = $b.parentRecord;
		this.RecordInfo = $b.recordInfo;
	}
	toJSON(): ChildRecordDiffJSON {
		return {
			operation: this.Operation,
			created: this.Created,
			parentRecord: this.ParentRecord,
			recordInfo: this.RecordInfo,
		};
	}
}
interface ChildRecordDiffJSON {
	operation: RecordInfoOperation;
	created: Date;
	parentRecord: RecordId;
	recordInfo: RecordInfo;
}
enum RecordInfoOperation {
	Upsert = "Upsert",
	Remove = "Remove",
}
