/**
 * Rebuild of the C# StringBuilder
 *
 * @class StringBuilder
 */
class StringBuilder {
	constructor() {
		/**
		 * Workspace of the class, Can be manually modified
		 * @property {string[]} String
		 * @instance
		 * @memberof StringBuilder
		 */
		this.String = [];
	}
	/**
	 * Add a character
	 * @param {string} str Char
	 * @instance
	 * @memberof StringBuilder
	 */
	Append(str) {
		for (let char of str) this.String.push(char);
	}
	/**
	 * Insert a character to the string
	 * @param {number} pos Position in string
	 * @param {string} str Character to add
	 * @instance
	 * @memberof StringBuilder
	 */
	Insert(pos, str) {
		this.String.splice(pos, 0, str);
	}
	/**
	 * Set Index pos to char
	 * @param {number} pos Position in string
	 * @param {string} char Character to add
	 * @instance
	 * @memberof StringBuilder
	 */
	Set(pos, char) {
		this.String[pos] = char;
	}
	/**
	 * Convert to a String
	 * @returns {string} Compiled String
	 * @instance
	 * @memberof StringBuilder
	 */
	ToString() {
		return this.toString();
	}
	/**@private Internal */
	toString() {
		return this.String.join("");
	}
	/**
	 * Get the String Length
	 * @returns {number} String Length
	 * @instance
	 * @readonly
	 * @memberof StringBuilder
	 */
	get Length() {
		return this.String.length;
	}
	/**
	 * Remove a chunk of the string
	 * @param {number} startIndex Starting Index
	 * @param {number} length Length
	 * @instance
	 * @memberof StringBuilder
	 */
	Remove(startIndex, length) {
		this.String.splice(startIndex, length);
	}
	/**
	 * Clear the string, Allows to be used elsewhere
	 * @instance
	 * @memberof StringBuilder
	 */
	Clear() {
		this.String = [];
	}
}
module.exports = {
	StringBuilder,
};
