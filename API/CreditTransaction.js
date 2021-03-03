const { TransactionType } = require("./TransactionType");
/**
 * Credit Transaction Object
 * @class CreditTransaction
 * @param {object} $b
 * @param {string} $b.token
 * @param {string} $b.fromUserId
 * @param {string} $b.toUserId
 * @param {number} $b.amount
 * @param {string} $b.comment
 * @param {TransactionType} $b.transactionType
 * @param {boolean} $b.anonymous
 */
class CreditTransaction {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.Token = $b.token;
		/**@type {string} */
		this.FromUserId = $b.fromUserId;
		/**@type {string} */
		this.ToUserId = $b.toUserId;
		/**@type {number} */
		this.Amount = $b.amount;
		/**@type {string} */
		this.Comment = $b.comment;
		/**@type {TransactionType<string>} */
		this.TransactionType =
			typeof $b.transactionType === "string"
				? $b.transactionType
				: TransactionType.FromNumber($b.transactionType);
		/**@type {string} */
		this.Anonymous = $b.anonymous;
	}
}
module.exports = {
	CreditTransaction,
};
