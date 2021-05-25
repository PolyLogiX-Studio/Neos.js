import { List } from "@bombitmanbomb/utils";
import { BuildChange } from "./BuildChange";
export class Build {
	public VersionNumber: string;
	public AlternateVersionNumber: string;
	public Changes: List<BuildChange>;
	public KnownIssues: List<string>;
	public Notes: List<string>;
	constructor($b: BuildJSON) {
		this.VersionNumber = $b.versionNumber;
		this.AlternateVersionNumber = $b.alternateVersionNumber;
		this.Changes =
			$b.changes instanceof List
				? $b.changes
				: List.ToListAs($b.changes, BuildChange);
		this.KnownIssues =
			$b.knownIssues instanceof List
				? $b.knownIssues
				: List.ToList($b.knownIssues);
		this.Notes = $b.notes instanceof List ? $b.notes : List.ToList($b.notes);
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
export interface BuildJSON {
	versionNumber: string;
	alternateVersionNumber: string;
	changes: BuildChange[];
	knownIssues: string[];
	notes: string[];
}
