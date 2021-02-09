/**
 * @template T
 * @class TaskCompletionSource
 */
class TaskCompletionSource {
	constructor() {
		var Resolve;
		var Reject;
		this.State = 0;
		/**@type Priomise<T> */
		this.Task = new Promise((res, rej) => {
			Resolve = res;
			Reject = rej;
		});
		/**@protected */
		this.Resolve = Resolve;
		/**@protected */
		this.Reject = Reject;
	}
	get isResolved() {
		return this.State === 1;
	}
	get isRejected() {
		return this.State === 2;
	}
	get isCompleated() {
		return this.State !== 0;
	}
	TrySetResult(value) {
		try {
			this.Resolve(value);
			this.State = 1;
			return true;
		} catch (error) {
			return false;
		}
	}
}
module.exports = { TaskCompletionSource };
