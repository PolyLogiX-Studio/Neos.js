import type { OutputDevice } from "./OutputDevice";
export class SessionUser {
	public Username: string;
	public UserID: string;
	public IsPresent: boolean;
	public OutputDevice: OutputDevice;
	constructor($b: SessionUserJSON) {
		this.Username = $b.username;
		this.UserID = $b.userID;
		this.IsPresent = $b.isPresent;
		this.OutputDevice = $b.outputDevice;
	}
	public get SanitizedUsername(): string {
		return `<noparse=${this.Username?.length ?? 0}>${this.Username}`; //TODO Switch to CodeX
	}
	public Equals(other: SessionUser): boolean {
		return (
			this.Username == other.Username &&
			this.UserID == other.UserID &&
			this.IsPresent == other.IsPresent &&
			this.OutputDevice == other.OutputDevice
		);
	}
	toJSON(): SessionUserJSON {
		return {
			username: this.Username,
			userID: this.UserID,
			isPresent: this.IsPresent,
			outputDevice: this.OutputDevice,
		};
	}
}
export interface SessionUserJSON {
	username: string;
	userID: string;
	isPresent: boolean;
	outputDevice: OutputDevice;
}
