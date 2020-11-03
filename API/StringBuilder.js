/**
 * Rebuild of the C# StringBuilder
 *
 * @class StringBuilder
 */
class StringBuilder {
	constructor() {
		this.String = [];
	}
	Append(str) {
		for (let char of str) this.String.push(char);
	}
	Insert(pos, str) {
		this.String.splice(pos, 0, str);
	}
	Set(pos, char) {
		this.String[pos] = char;
	}
	ToString() {
		return this.toString();
	}
	toString() {
		return this.String.join("");
	}
	get Length() {
		return this.String.length;
	}
	Remove(startIndex, length) {
		this.String.splice(startIndex, length);
	}
	Clear() {
		this.String = [];
	}
}
module.exports = {
	StringBuilder,
};
