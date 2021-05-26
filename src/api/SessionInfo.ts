import { RecordId } from "./RecordId";
export class SessionInfo {}
export interface SessionInfoJSON {
	name: string;
	description: string;
	correspondingWorldId: RecordId;
}
