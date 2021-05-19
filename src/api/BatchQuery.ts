/*
import { Dictionary, Out } from "@bombitmanbomb/utils";
export abstract class BatchQuery<Query extends string, Result> {
	private queue: Dictionary<Query, Promise<Result>> = new Dictionary();
	private immidiateDispatch: unknown; //TODO
	private dispatchScheduled = false;
	public MaxBatchSize = 32;
	public DelayedSeconds = 0.25;
	constructor(maxBatchSize = 32, delaySeconds = 0.25) {
		this.BatchQuery(maxBatchSize, delaySeconds);
	}
	public BatchQuery(maxBatchSize = 32, delaySeconds = 0.25) {
		this.MaxBatchSize = maxBatchSize;
		this.DelayedSeconds = delaySeconds;
	}
	public async Request(query: Query) {
		const batchQuery = this;
		const completionSource: Out<Promise<Result>> = new Out();
		if (!batchQuery.queue.TryGetValue(query, completionSource)) {
		}
	}
}
*/
