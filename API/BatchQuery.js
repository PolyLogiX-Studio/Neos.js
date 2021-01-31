const { Dictionary } = require("./Dictionary");
const { Out } = require("./Out");
const { TaskCompletionSource } = require("./TaskCompletionSource");
/**
 * Work in Progress
 * @class BatchQuery
 * @param {number} [maxBatchSize=32]
 * @param {number} [delaySeconds=0.25]
 */
class BatchQuery {
	constructor(maxBatchSize = 32, delaySeconds = 0.25) {
		this.BatchQuery(maxBatchSize, delaySeconds);
		this.queue = new Dictionary();
		this.immidiateDispatch;
		this.dispatchScheduled;
	}
	/**
	 * Define Self
	 * @param {number} [maxBatchSize=32]
	 * @param {number} [delaySeconds=0.25]
	 * @memberof BatchQuery
	 */
	BatchQuery(maxBatchSize = 32, delaySeconds = 0.25) {
		this.MaxBatchSize = maxBatchSize;
		this.DelaySeconds = delaySeconds;
	}
	async Request(query) {
		let batchQuery = this;
		let completionSource = new Out();
		if (!batchQuery.queue.TryGetValue(query, completionSource)) {
			completionSource = new TaskCompletionSource();
			batchQuery.queue.Add(query, completionSource);
		}
	}
}
module.exports = { BatchQuery };
