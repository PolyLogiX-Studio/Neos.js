class TransactionMessage {
  /**
   *Creates an instance of TransactionMessage.
   * @param {{
   * token: string,
   * recipientId: string,
   * amount:number,
   * comment:string,
   * transactionType: TransactionType
   * }} $b
   * @memberof TransactionMessage
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Token = $b.token;
    this.FromUserId = $b.fromUserId;
    this.ToUserId = $b.toUserId;
    this.Amount = $b.amount;
    this.Comment = $b.comment;
    this.TransactionType = $b.transactionType || null;
    this.Anonymous = $b.anonymous;
  }
}
module.exports = {
  TransactionMessage,
};
