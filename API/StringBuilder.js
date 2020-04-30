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
  toString() {
    return this.String.join("");
  }
  get Length() {
    return this.String.length;
  }
}
module.exports = {
  StringBuilder
}