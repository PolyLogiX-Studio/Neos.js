class CreditTransaction {
  /**
   *Creates an instance of CreditTransaction.
   * @param {{
   * token: string,
   * fromUserId: string,
   * toUserId: string,
   * amount: number,
   * comment: string,
   * transactionType: TransactionType,
   * anonymous: Boolean
   * }} $b
   * @memberof CreditTransaction
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Token = $b.token;
    this.FromUserId = $b.fromUserId;
    this.ToUserId = $b.toUserId;
    this.Amount = $b.amount;
    this.Comment = $b.comment;
    this.TransactionType = $b.transactionType;
    this.Anonymous = $b.anonymous;
  }
}
module.exports = {
  CreditTransaction
}