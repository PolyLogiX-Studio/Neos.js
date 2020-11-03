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
		this.String.push(str);
	}
	Insert(pos, str) {
		this.String.splice(pos, 0, str);
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
