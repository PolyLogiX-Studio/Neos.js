const { List } = require("./List");
/**
 *
 * @class HashSet
 * @extends {List}
 * @throws {Error<ArgumentException>} - Expected <Array, List, Number>
 */
class HashSet extends List {
	/**
	 *Creates an instance of HashSet.
	 * @param {*} $b
	 * @memberof HashSet
	 *
	 */
	constructor($b) {
		if (!$b) $b = [];
		switch ($b.constructor.name) {
		case "Array":
			$b = List.ToList($b);
			// eslint-disable-next-line no-fallthrough
		case "List":
			super();
			this.AddRange($b);
			break;
		case "Number":
			super($b);
			break;
		default:
			throw new Error("ArgumentException: Expected Array, List, Number");
		}
	}
	IsSame() {}
}
module.exports = {
	HashSet,
};
