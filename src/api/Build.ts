import type { List } from "@bombitmanbomb/utils";
import type { BuildChange } from "./BuildChange";
export class Build {
	public VersionNumber: string;
	public AlternateVersionNumber: string;
	public Changes: List<BuildChange>;
	public KnownIssues: List<string>;
	public Notes: List<string>;
	constructor($b: BuildJSON) {
		this.VersionNumber = $b.versionNumber;
		this.AlternateVersionNumber = $b.alternateVersionNumber;
		this.Changes = $b.changes;
		this.KnownIssues = $b.knownIssues;
		this.Notes = $b.notes;
	}
	toJSON(): BuildJSON {
		return {
			versionNumber: this.VersionNumber,
			alternateVersionNumber: this.AlternateVersionNumber,
			changes: this.Changes,
			knownIssues: this.KnownIssues,
			notes: this.Notes,
		};
	}
}
interface BuildJSON {
	versionNumber: string;
	alternateVersionNumber: string;
	changes: List<BuildChange>;
	knownIssues: List<string>;
	notes: List<string>;
}
