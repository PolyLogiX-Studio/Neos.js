import { List } from "@bombitmanbomb/utils";
import { IRecord } from "./IRecord";
import { Record } from "./Record";
export class SearchResults<R extends IRecord> {
	public Records: List<R>;
	public HasMoreResults: boolean;
	constructor(records: SearchResultsJSON<R> | List<R>, hasMore?: boolean) {
		if (records instanceof List) {
			this.Records = records;
			this.HasMoreResults = hasMore as boolean;
		} else {
			this.Records =
				records.records instanceof List
					? records.records
					: (List.ToListAs(records.records, Record) as List<Record>);
			this.HasMoreResults = records.hasMoreResults;
		}
	}
	toJSON(): SearchResultsJSON<R> {
		return {
			records: (this.Records.toJSON() as unknown) as R[],
			hasMoreResults: this.HasMoreResults,
		};
	}
}
export interface SearchResultsJSON<R extends IRecord> {
	records: R[];
	hasMoreResults: boolean;
}
