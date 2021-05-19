import type { List } from "@bombitmanbomb/utils";
export class CheckContactData {
	OwnerId: string;
	Verificationkey: string;
	Contacts: List<string>;
	constructor($b: CheckContactDataJSON) {
		this.OwnerId = $b.ownerId;
		this.Verificationkey = $b.verificationKey;
		this.Contacts = $b.contacts;
	}
	toJSON(): CheckContactDataJSON {
		return {
			ownerId: this.OwnerId,
			verificationKey: this.Verificationkey,
			contacts: this.Contacts,
		};
	}
}
interface CheckContactDataJSON {
	ownerId: string;
	verificationKey: string;
	contacts: List<string>;
}
