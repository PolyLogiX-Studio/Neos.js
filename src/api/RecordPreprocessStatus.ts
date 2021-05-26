import type { RecordPreprocessState } from "./RecordPreprocessState";
import { AssetDiff, AssetDiffJSON } from "./AssetDiff";
import { List } from "@bombitmanbomb/utils";
export class RecordPreprocessStatus {
	PreprocessId: string;
	OwnerId: string;
	RecordId: string;
	State: RecordPreprocessState;
	Progress: number;
	FailReason: string;
	ResultDiffs: List<AssetDiff>;
	constructor($b: RecordPreprocessStatusJSON) {
		this.PreprocessId = $b.id;
		this.OwnerId = $b.ownerId;
		this.RecordId = $b.recordId;
		this.State = $b.state;
		this.Progress = $b.progress;
		this.FailReason = $b.failReason;
		this.ResultDiffs =
			$b.resultDiffs instanceof List
				? $b.resultDiffs
				: List.ToListAs($b.resultDiffs, AssetDiff);
	}
	toJSON(): RecordPreprocessStatusJSON {
		return {
			id: this.PreprocessId,
			ownerId: this.OwnerId,
			recordId: this.RecordId,
			state: this.State,
			progress: this.Progress,
			failReason: this.FailReason,
			resultDiffs: (this.ResultDiffs.toJSON() as unknown) as AssetDiffJSON[],
		};
	}
}
export interface RecordPreprocessStatusJSON {
	id: string;
	ownerId: string;
	recordId: string;
	state: RecordPreprocessState;
	progress: number;
	failReason: string;
	resultDiffs: AssetDiffJSON[];
}
