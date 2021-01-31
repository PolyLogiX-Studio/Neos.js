/**
 * Easy Out Var Generator
 *
 * An Out object is passed in as a parameter that requires the Out type, This is to extract multiple variables via a function. The returned value for that parameter will be in .Out property
 * @class Out
 * @template T
 * @returns {[Out:T]}
 * @param {[Out:T]} Out
 */
class Out {
	constructor() {
		/**
		 * @memberof Out
		 * @instance
		 * @alias Out
		 * @type {T} */
		let self = [];
		self.Out = new Object();
		return self;
	}
}
module.exports = {
	Out,
};
