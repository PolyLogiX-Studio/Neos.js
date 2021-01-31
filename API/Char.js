/**
 * Simple Util class to work with Characters
 *
 * @class Char
 */
class Char {
	/**
	 * Is Char a Letter or Digit
	 * @static
	 * @memberof Char
	 * @param {string} char
	 * @returns {boolean} Is Letter or Digit
	 */
	static IsLetterOrDigit(char) {
		if (char == null || char === "" || char === " ") return false;
		if (!isNaN(char)) return true;
		if (char.toUpperCase() !== char.toLowerCase()) return true;
		return false;
	}
	/**
	 * Is Char Whitespace
	 * @static
	 * @memberof Char
	 * @param {string} char
	 * @returns {boolean} - Is Whitespace
	 */
	static IsWhiteSpace(char) {
		if (!char) return false;
		if (char === " ") return true;
		return false;
	}
}
module.exports = {
	Char,
};
