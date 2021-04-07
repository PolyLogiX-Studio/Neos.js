/**.
 * Cloud Variable
 *
 * @class CloudVariableDefinition
 * @param {Object} $b
 * @param {string} $b.definitionOwnerId
 * @param {string} $b.subpath
 * @param {string} $b.typeHint
 * @param {string} $b.defaultvalue
 * @param {boolean} $b.variableOwnerCanRead
 * @param {boolean} $b.variableOwnerCanWrite
 * @param {boolean} $b.anyoneCanRead
 * @param {boolean} $b.anyoneCanWrite
 */
class CloudVariableDefinition {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.DefinitionOwnerId = $b.definitionOwnerId;
		/**@type {string} */
		this.Subpath = $b.subpath;
		/**@type {string} */
		this.TypeHint = $b.typeHint;
		/**@type {string} */
		this.DefaultValue = $b.defaultvalue;
		/**@type {boolean} */
		this.VariableOwnerCanRead = $b.variableOwnerCanRead;
		/**@type {boolean} */
		this.VariableOwnerCanWrite = $b.variableOwnerCanWrite;
		/**@type {boolean} */
		this.AnyoneCanRead = $b.anyoneCanRead;
		/**@type {boolean} */
		this.AnyoneCanWrite = $b.anyoneCanWrite;
	}
	/**.
	 * Check if the given user can access variables for a given user
	 *
	 * @instance
	 * @memberof CloudVariableDefinition
	 * @param {string} variableOwnerId - Owner user Id
	 * @param {string} readerId - Who is attempting to access
	 * @returns {boolean}
	 */
	CanRead(variableOwnerId, readerId) {
		return (
			this.AnyoneCanRead ||
			(this.VariableOwnerCanRead && variableOwnerId === readerId) ||
			readerId === this.DefinitionOwnerId
		);
	}
	/**.
	 * Check if the given user can Write to variables for a given user
	 *
	 * @instance
	 * @memberof CloudVariableDefinition
	 * @param writerId
	 * @param {string} variableOwnerId - Owner user Id
	 * @param {string} readerId - Who is attempting to access
	 * @returns {boolean}
	 */
	CanWrite(variableOwnerId, writerId) {
		return (
			this.AnyoneCanWrite ||
			(this.VariableOwnerCanWrite && variableOwnerId === writerId) ||
			writerId === this.DefinitionOwnerId
		);
	}
}
module.exports = {
	CloudVariableDefinition,
};
