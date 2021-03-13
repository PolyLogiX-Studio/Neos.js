const { List } = require("./List");
const { BuildFile } = require("./BuildFile");
/**
 * @class BuildVariant
 *
 * @param {Object} $b
 * @param {string} $b.versionNumber
 * @param {BuildPlatform} $b.platform
 * @param {BuildRuntime} $b.runtime
 * @param {string} $b.packageSignature
 * @param {List<string>} $b.notes
 */
class BuildVariant {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.VersionNumber = $b.versionNumber;
		/**@type {BuildPlatform} */
		this.Platform = $b.platform;
		/**@type {BuildRuntime} */
		this.Runtime = $b.runtime;
		/**@type {string} */
		this.PackageSignature = $b.packageSignature;
		/**@type {List<BuildFile>} */
		this.Files =
			$b.files instanceof List
				? $b.files
				: (() => {
					let ch = new List();
					for (let file of $b.files) {
						ch.Add(new BuildFile(file));
					}
					return ch;
				  })();
	}
}
module.exports = {
	BuildVariant,
};
