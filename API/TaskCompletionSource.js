/**
 * @template T.
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
		Object.defineProperties(this, {
			Resolve: { value: Resolve, enumerable: false },
			Reject: { value: Reject, enumerable: false },
		});
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
	SetResult(value) {
		this.Resolve(value);
		this.State = 1;
		return true;
	}
	TrySetResult(value) {
		if (this.isCompleated) return false;
		try {
			this.SetResult(value);
			return true;
		} catch (error) {
			return false;
		}
	}
}
module.exports = { TaskCompletionSource };
