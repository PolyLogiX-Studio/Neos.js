import { TimeSpan } from "@bombitmanbomb/utils";
import { v4 as uuidv4 } from "uuid";
export class ComputationLock {
	public Token: string;
	public ExpireTimestamp: Date;
	constructor($b: ComputationLockJSON) {
		this.Token = $b.token;
		this.ExpireTimestamp = $b.timestamp;
	}
	public get IsLocked(): boolean {
		return (
			!(this.Token == null || this.Token.trim() == "") &&
			new Date() > this.ExpireTimestamp
		);
	}
	public TryLock(duration: TimeSpan): boolean {
		if (this.IsLocked) return false;
		this.Token = uuidv4();
		this.ExpireTimestamp = new Date(new Date().getTime() + duration.msecs);
		return true;
	}
	public TryExtend(token: string, duration: TimeSpan): boolean {
		if (token != this.Token) return false;
		this.ExpireTimestamp = new Date(new Date().getTime() + duration.msecs);
		return true;
	}
	public TryRelease(token: string): boolean {
		if (this.Token != token) return false;
		this.Token = "";
		this.ExpireTimestamp = new Date();
		return true;
	}
	toJSON(): ComputationLockJSON {
		return { token: this.Token, timestamp: this.ExpireTimestamp };
	}
}
export interface ComputationLockJSON {
	token: string;
	timestamp: Date;
}
