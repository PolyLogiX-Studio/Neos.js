const {
  Type
} = require("./Type")
const {
  List
} = require("./List")
/**
 *
 *
 * @class HashSet
 * @extends {Set}
 * @template T
 */
class HashSet extends List {
  /**
   *Creates an instance of HashSet.
   * @param {*} $b
   * @memberof HashSet
   * @return {T}
   */
  constructor($b) {
    if (!$b) $b = [];
    switch (Type.Get($b)) {
      case "Array":
        $b = $b.ToList();
      case "List":
        super();
        this.AddRange($b);
        break;
      case "Number":
        super($b);
        break;
      default:
        throw new Error("ArgumentException: Expected <Array, List, Number>");
    }
  }
  IsSame(set) {
    for (item of set) {}
  }
}
module.exports = {
  HashSet
}