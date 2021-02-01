/**
 * CloudX Variable Object
 * @class CloudVariable
 * @param {Object} $b
 * @param {string} $b.ownerId -
 * @param {string} $b.path -
 * @param {string} $b.value -
 */
class CloudVariable {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.VariableOwnerId = $b.ownerId;
		/**@type {string} */
		this.Path = $b.path;
		/**@type {string} */
		this.Value = $b.value;
	}
	/**
	 * Get the owner and ID of a variable
	 * @static
	 * @memberof CloudVariable
	 * @param {string} path
	 * @param {Out<string>} ownerid
	 * @param {Out<string>} subpath
	 */
	static GetDefinitionPath(path, ownerId, subpath) {
		let length = path.indexOf(".");
		ownerId.Out = path.substring(0, length);
		subpath.Out = path.substring(length + 1);
	}
	/**
	 * Get the owner and ID of a variable
	 * @instance
	 * @memberof CloudVariable
	 * @param {Out<string>} ownerId
	 * @param {Out<string>} subpath
	 */
	GetDefinitionPath(ownerId, subpath) {
		CloudVariable.GetDefinitionPath(this.Path, ownerId, subpath);
	}
}
module.exports = {
	CloudVariable,
};
