import { IRecord } from "./IRecord";
import type { SearchParameters } from "./SearchParameters";
import type { CloudXInterface } from "./CloudXInterface";
import { List } from "@bombitmanbomb/utils";
export class RecordSearch<R extends IRecord> {
	public static DEFAULT_BATCH_SIZE = 100;
	public BatchSize = 100;
	private searchParameters!: SearchParameters;
	private cloud: CloudXInterface;
	private Records!: List<R>;
	public HasMoreResults!: boolean;

	public EqualsParameters(other: SearchParameters): boolean {
		return this.searchParameters.Equals(other, true);
	}
	constructor(searchParameters: SearchParameters, cloud: CloudXInterface) {
		this.RecordSearch(searchParameters, cloud);
	}
	public RecordSearch(
		searchParameters: SearchParameters,
		cloud: CloudXInterface
	): void {
		this.searchParameters = searchParameters;
		this.cloud = cloud;
		this.Records = new List();
		this.HasMoreResults = true;
	}
	public async GetResultsSlice(
		offset: number,
		count: number,
		results: List<R>
	): Promise<void> {
		let endIndex = offset + count;
		await this.EnsureResults(endIndex);
		endIndex = Math.min(endIndex, this.Records.Count);
		for (let index = offset; index < endIndex; index++)
			results.Add(this.Records[index]);
	}
	public async EnsureResults(count: number): Promise<boolean> {
		let fetchedNew = false;
		while (this.HasMoreResults && this.Records.Count < count) {
			this.searchParameters.Offset = this.Records.Count;
			this.searchParameters.Count = this.BatchSize;
			const cloudResult = await this.cloud.FindRecords<R>(
				this.searchParameters
			);
			if (cloudResult.IsOK) {
				if (cloudResult.Entity.Records.Count > 0) fetchedNew = true;
				this.Records.AddRange(cloudResult.Entity.Records);
				this.HasMoreResults = cloudResult.Entity.HasMoreResults;
			} else this.HasMoreResults = false;
		}
		return fetchedNew;
	}
}
