import type { TransactionType } from "./TransactionType";
export class CreditTransaction {
	public Token: string;
	public FromUserId: string;
	public Amount: number;
	public Comment: string;
	public TransactionType: TransactionType;
	public Anonymous: boolean;
	constructor($b: CreditTransactionJSON) {
		this.Token = $b.token;
		this.FromUserId = $b.fromUserId;
		this.Amount = $b.amount;
		this.Comment = $b.comment;
		this.TransactionType = $b.transactionType;
		this.Anonymous = $b.anonymous;
	}
	toJSON(): CreditTransactionJSON {
		return {
			token: this.Token,
			fromUserId: this.FromUserId,
			amount: this.Amount,
			comment: this.Comment,
			transactionType: this.TransactionType,
			anonymous: this.Anonymous,
		};
	}
}
export interface CreditTransactionJSON {
	token: string;
	fromUserId: string;
	amount: number;
	comment: string;
	transactionType: TransactionType;
	anonymous: boolean;
}
