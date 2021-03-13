const { List } = require("./List");
const { BuildReporter } = require("./BuildReporter");
/**
 * @class BuildChange
 *
 * @param {Object} $b
 * @param {string} $b.description
 * @param {BuildChangeType} $b.type
 * @param {boolean} $b.workInProgress
 * @param {List<string>} $b.knownIssues
 * @param {List<string>} $b.notes
 */
class Build {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.Description = $b.description;
		/**@type {BuildChangeType} */
		this.Type = $b.type;
		/**@type {boolean} */
		this.WorkInProgress = $b.workInProgress;
		/**@type {List<number>} */
		this.GithubIssueNumbers =
			$b.githubIssueNumbers instanceof List
				? $b.githubIssueNumbers
				: List.ToList($b.githubIssueNumbers);
		/**@type {List<BuildReporter>} */
		this.Reporters =
			$b.reporters instanceof List
				? $b.reporters
				: (() => {
					let ch = new List();
					for (let reporter of $b.reporters) {
						ch.Add(new BuildReporter(reporter));
					}
					return ch;
				  })();
	}
}
module.exports = {
	Build,
};
