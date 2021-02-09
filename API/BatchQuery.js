const { Dictionary } = require("./Dictionary");
const { Out } = require("./Out");
const { TaskCompletionSource } = require("./TaskCompletionSource");
const { TimeSpan } = require("./TimeSpan");
const { List } = require("./List");
/**
 * Work in Progress
 * @template Query, Result
 * @class BatchQuery
 * @param {number} [maxBatchSize=32]
 * @param {number} [delaySeconds=0.25]
 * @borrows QueryResult
 */
class BatchQuery {
	constructor(maxBatchSize = 32, delaySeconds = 0.25) {
		this.BatchQuery(maxBatchSize, delaySeconds);
		this.queue = new Dictionary();
		/**
		 * @private
		 * @type {TaskCompletionSource<boolean>}
		 */
		this.immidiateDispatch;
		/** @private */
		this.dispatchScheduled = false;
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
	/**
	 *
	 * @param {Query} query
	 * @returns Promise<any>
	 * @memberof BatchQuery
	 */
	async Request(query) {
		let batchQuery = this;
		/**
		 * @private
		 * @type {Out<TaskCompletionSource<Result>>}
		 */
		let completionSource = new Out();
		if (!batchQuery.queue.TryGetValue(query, completionSource)) {
			completionSource = new TaskCompletionSource();
			batchQuery.queue.Add(query, completionSource);
			batchQuery.SendBatch();
		} else if (batchQuery.queue.Count >= batchQuery.MaxBatchSize)
			batchQuery.immidiateDispatch.TrySetResult(true);
		return await completionSource.Task;
	}

	async SendBatch() {
		let batchQuery = this;
		/**@type {List<BatchQuery.QueryResult>} */
		let toSend = new List();
		let awaiter1 = await Promise.any([
			batchQuery.immidiateDispatch.Task,
			TimeSpan.Delay(TimeSpan.fromSeconds(batchQuery.DelaySeconds)),
		]);
		console.log(awaiter1);
		var enumerator = batchQuery.queue.GetEnumerator();

		while (enumerator.MoveNext()) {
			toSend.Add(new BatchQuery.QueryResult(enumerator.Current.Key));
			if (toSend.Count == batchQuery.MaxBatchSize) break;
		}
		if (toSend.Count > 0) {
			var awaiter2 = await batchQuery.RunBatch(toSend);
			console.log(awaiter2);
		}
		enumerator = toSend.GetEnumerator();
		while (enumerator.MoveNext()) {
			let current = enumerator.Current;
			batchQuery.queue[current.query].SetResult(current.result);
			batchQuery.queue.Remove(current.query);
		}
		if (batchQuery.queue.Count > 0) {
			if (batchQuery.queue.Count >= batchQuery.MaxBatchSize)
				batchQuery.immidiateDispatch.TrySetResult(true);
			else batchQuery.immidiateDispatch = new TaskCompletionSource();
			batchQuery.SendBatch();
		} else {
			batchQuery.dispatchScheduled = false;
		}
	}
	/**
	 * @protected
	 * @abstract
	 * @returns {Promise}
	 * @memberof BatchQuery
	 * @param {BatchQuery.QueryResult} batch
	 */
	RunBatch() {}
	/**
	 * @private
	 * @readonly
	 * @memberof BatchQuery
	 * @static
	 * @returns {BatchQuery.QueryResult}
	 */
	static get QueryResult() {
		return QueryResult;
	}
}
/**
 * @protected
 * @class QueryResult
 */
class QueryResult {
	constructor($b) {
		if ($b == null) $b = {};
		/**@type {Query} */
		this.query;
		/**@type {Result} */
		this.result;
		this.QueryResult($b.query);
	}
	QueryResult(query) {
		this.query = query;
	}
}
module.exports = { BatchQuery };
