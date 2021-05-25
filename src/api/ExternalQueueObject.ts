export class ExternalQueueObject<T> {
	Id: string;
	PopReceipt: string;
	Object: T;
	constructor($b: ExternalQueueObjectJSON) {
		this.Id = $b.id;
		this.PopReceipt = $b.popReceipt;
		this.Object = $b.object;
	}
	toJSON(): ExternalQueueObjectJSON {
		return {
			id: this.Id,
			popReceipt: this.PopReceipt,
			object: this.Object,
		};
	}
}
export interface ExternalQueueObjectJSON {
	id: string;
	popReceipt: string;
	object: any;
}
