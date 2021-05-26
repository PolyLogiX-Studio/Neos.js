import { SessionInfo, SessionInfoJSON } from "./SessionInfo";
import { List } from "@bombitmanbomb/utils";
export class SessionUpdate {
	public HostedSessions: List<SessionInfo>;
	public RemovedSessions: List<string>;
	constructor($b: SessionUpdateJSON) {
		this.HostedSessions =
			$b.hostedSessions instanceof List
				? $b.hostedSessions
				: List.ToListAs($b.hostedSessions, SessionInfo);
		this.RemovedSessions =
			$b.removedSessions instanceof List
				? $b.removedSessions
				: List.ToList($b.removedSessions);
	}
	toJSON(): SessionUpdateJSON {
		return {
			hostedSessions: (this.HostedSessions.toJSON() as unknown) as SessionInfoJSON[],
			removedSessions: this.RemovedSessions.toJSON(),
		};
	}
}
export interface SessionUpdateJSON {
	hostedSessions: SessionInfoJSON[];
	removedSessions: string[];
}
