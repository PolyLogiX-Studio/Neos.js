const { BuildChange } = require("./BuildChange");
const { List } = require("./List");

/**
 * @class Build
 *
 * @param {Object} $b
 * @param {string} $b.versionNumber
 * @param {string} $b.alternateVersionNumber
 * @param {List<BuildChange>} $b.changes
 * @param {List<string>} $b.knownIssues
 * @param {List<string>} $b.notes
 */
class Build {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.VersionNumber = $b.versionNumber;
		/**@type {string} */
		this.AlternateVersionNumber = $b.alternateVersionNumber;
		/**@type {List<BuildChange>} */
		this.Changes =
			$b.changes instanceof List
				? $b.changes
				: (() => {
					let ch = new List();
					for (let change of $b.changes) {
						ch.Add(new BuildChange(change));
					}
					return ch;
				  })();
		/**@type {List<string>} */
		this.KnownIssues =
			$b.knownIssues instanceof List
				? $b.knownIssues
				: List.ToList($b.knownIssues);
		/**@type {List<string>} */
		this.Notes = $b.notes instanceof List ? $b.notes : List.ToList($b.notes);
	}
}
module.exports = {
	Build,
};
