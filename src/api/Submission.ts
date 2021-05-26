import { RecordId } from "./RecordId";
import type { RecordIdJSON } from "./RecordId";
export class Submission {
	public Id: string;
	public GroupId: string;
	public TargetRecordId: RecordId;
	public SubmissionTime: Date;
	public SubmittedById: string;
	public SubmittedByName: string;
	public Featured: boolean;
	public FeaturedByUserId: string;
	public FeaturedTimestamp?: Date;
	constructor($b: SubmissionJSON) {
		this.Id = $b.id;
		this.GroupId = $b.ownerId;
		this.TargetRecordId =
			$b.targetRecordId instanceof RecordId
				? $b.targetRecordId
				: new RecordId($b.targetRecordId);
		this.SubmissionTime = $b.submissionTime;
		this.SubmittedById = $b.submittedById;
		this.SubmittedByName = $b.submittedByName;
		this.Featured = $b.featured;
		this.FeaturedByUserId = $b.featuredByUserId;
		this.FeaturedTimestamp = $b.featuredTimestamp;
	}
	toJSON(): SubmissionJSON {
		return {
			id: this.Id,
			ownerId: this.GroupId,
			targetRecordId: this.TargetRecordId.toJSON(),
			submissionTime: this.SubmissionTime,
			submittedById: this.SubmittedById,
			submittedByName: this.SubmittedByName,
			featured: this.Featured,
			featuredByUserId: this.FeaturedByUserId,
			featuredTimestamp: this.FeaturedTimestamp,
		};
	}
}
export interface SubmissionJSON {
	id: string;
	ownerId: string;
	targetRecordId: RecordIdJSON;
	submissionTime: Date;
	submittedById: string;
	submittedByName: string;
	featured: boolean;
	featuredByUserId: string;
	featuredTimestamp?: Date;
}
