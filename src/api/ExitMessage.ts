export class ExitMessage {
	public MessageIndex: number;
	public Message: string;
	public AddedByUserId: string;
	constructor($b: ExitMessageJSON) {
		this.Message = $b.message;
		this.MessageIndex = $b.messageIndex;
		this.AddedByUserId = $b.addedByUserId;
	}
	toJSON(): ExitMessageJSON {
		return {
			message: this.Message,
			messageIndex: this.MessageIndex,
			addedByUserId: this.AddedByUserId,
		};
	}
}
export interface ExitMessageJSON {
	messageIndex: number;
	message: string;
	addedByUserId: string;
}
