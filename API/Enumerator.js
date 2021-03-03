const { List } = require("./List");
const { Dictionary } = require("./Dictionary");
/**
 * @template T
 * @class Enumerator
 * @param {List|Dictionary} Struct
 */
class Enumerator {
	constructor(dict) {
		Object.defineProperties(this, {
			Struct: { value: dict, enumerable: false },
			Position: {
				value: -1,
				enumerable: false,
				configurable: true,
				writable: true,
			},
		});

		this.Current = null;
	}
	/**
	 * Move Current to next position
	 * @memberof Enumerator
	 * @returns {boolean}
	 */
	MoveNext() {
		this.Position++;
		if (this.Position >= this.Struct.Count) {
			this.Current = null;
			return false;
		}
		if (this.Struct instanceof List) {
			this.Current = this.Struct[this.Position];
		} else if (this.Struct instanceof Dictionary) {
			this.Current = this.Struct[this.Position].Value;
		} else {
			this.Current = null;
			return false;
		}
		return true;
	}
}
module.exports = { Enumerator };
