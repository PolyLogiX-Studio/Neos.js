/**
 * @class BuildFile
 *
 * @param {Object} $b
 * @param {string} $b.description
 * @param {string} $b.path
 */
class BuildFile {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.Signature = $b.signature;
		/**@type {string} */
		this.Path = $b.path;
	}
}
module.exports = {
	BuildFile,
};
