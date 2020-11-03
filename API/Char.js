/**
 * Simple class to work with Characters
 *
 * @class Char
 */
class Char {
	static IsLetterOrDigit(char) {
		if (char == null || char === "" || char === " ") return false;
		if (!isNaN(char)) return true;
		if (char.toUpperCase() !== char.toLowerCase()) return true;
		return false;
	}
	static IsWhiteSpace(char) {
		if (!char) return false;
		if (char === " ") return true;
		return false;
	}
}
module.exports = {
	Char,
};
