import { RecordId, RecordIdJSON } from "./RecordId";
import type { RecordInfoJSON } from "./RecordInfo";
import { RecordInfo } from "./RecordInfo";
export class ChildRecordDiff {
	public Operation: RecordInfoOperation;
	public Created: Date;
	public ParentRecord: RecordId;
	public RecordInfo: RecordInfo;
	constructor($b: ChildRecordDiffJSON) {
		this.Operation = $b.operation;
		this.Created = $b.created;
		this.ParentRecord =
			$b.parentRecord instanceof RecordId
				? $b.parentRecord
				: new RecordId($b.parentRecord);
		this.RecordInfo =
			$b.recordInfo instanceof RecordInfo
				? $b.recordInfo
				: new RecordInfo($b.recordInfo);
	}
	toJSON(): ChildRecordDiffJSON {
		return {
			operation: this.Operation,
			created: this.Created,
			parentRecord: this.ParentRecord.toJSON() as RecordIdJSON,
			recordInfo: this.RecordInfo.toJSON() as RecordInfoJSON,
		};
	}
}
export interface ChildRecordDiffJSON {
	operation: RecordInfoOperation;
	created: Date;
	parentRecord: RecordIdJSON;
	recordInfo: RecordInfoJSON;
}
enum RecordInfoOperation {
	Upsert = "Upsert",
	Remove = "Remove",
}
