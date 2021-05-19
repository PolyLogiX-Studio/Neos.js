import type { List } from "@bombitmanbomb/utils";
import type { BuildChangeType } from "./BuildChangeType";
import type { BuildReporter } from "./BuildReporter";
export class BuildChange {
	public Description: string;
	public Type: BuildChangeType;
	public WorkInProgress: boolean;
	public GithubIssueNumbers: List<number>;
	public Reporters: List<BuildReporter>;
	constructor($b: BuildChangeJSON) {
		this.Description = $b.description;
		this.Type = $b.type;
		this.WorkInProgress = $b.workInProgress;
		this.GithubIssueNumbers = $b.githubIssueNumbers;
		this.Reporters = $b.reporters;
	}
	toJSON(): BuildChangeJSON {
		return {
			description: this.Description,
			type: this.Type,
			workInProgress: this.WorkInProgress,
			githubIssueNumbers: this.GithubIssueNumbers,
			reporters: this.Reporters,
		};
	}
}
interface BuildChangeJSON {
	description: string;
	type: BuildChangeType;
	workInProgress: boolean;
	githubIssueNumbers: List<number>;
	reporters: List<BuildReporter>;
}
