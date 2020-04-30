const {
  Type
} = require("./Type")
class Enumerable extends Object {
  /**
   *Creates an instance of Enumerable.
   * @param {(string[]|List<String>)} $b
   * @returns {Enumerable<$b>}
   * @memberof Enumerable
   */
  constructor($b) {
    if ($b == null) throw new Error("No Data Given");
    super();
    let keys;
    let i;
    switch (Type.Get($b)) {
      case "Array":
      case "List":
        keys = $b;
        for (i = 0; i < keys.length; i++) {
          this[keys[i]] = i;
        }
        break;
      case "Object":
        keys = Object.keys($b);
        for (i = 0; i < keys.length; i++) {
          this[keys[i]] = $b[[keys[i]]];
        }
        break;
      default:
        throw new Error("Invalid Data, Expected type: <Array, List, Object>");
    }
    Object.freeze(this);
  }
  /**
   *
   *
   * @param {String} key
   * @returns {T}
   * @memberof Enumerable
   */
  GetValue(key) {
    return this[key];
  }

  FromEnum(Enum) {
    let keys = Object.keys(Enum).shift();
    if (Enum > keys.length) throw new Error("Bounds Exceeded");
    for (let i = 0; i < keys.length; i++) {
      if (this[keys[i]] == Enum) return keys[i];
    }
    throw new Error("Value not Found");
  }
}
module.exports = {
  Enumerable
}