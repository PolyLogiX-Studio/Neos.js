export class CloudMessage {
	public Message: string;
	constructor($b: CloudMessageJSON) {
		this.Message = $b.Message;
	}
	public static ExtractMessage(content: CloudMessage | string): string {
		if (content instanceof CloudMessage) return content.Message;
		return content;
	}
	toJSON(): CloudMessageJSON {
		return { Message: this.Message };
	}
}
interface CloudMessageJSON {
	Message: string;
}
