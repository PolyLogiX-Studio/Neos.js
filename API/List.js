//eslint-disable-next-line no-unused-vars
const { Out } = require("./Out"); //lgtm [js/unused-local-variable] JSDoc Type Def
/**
 * Unordered List
 *
 * @class List
 * @template T
 * @param {T} props
 * @returns {List<T>}
 */
class List extends Array {
	constructor(props) {
		if (!props) {
			super();
			return;
		}
		super(props);
	}
	/**
	 *Add a Value to the List
	 * @param {T} value
	 * @instance
	 * @memberof List
	 */
	Add(value) {
		this.push(value);
	}
	/**
	 * Not Yet Implimented
	 * @param {Function} action
	 */
	Any(action) {
		return this.some(action);
	}
	/**
	 *Convert Array to List
	 *
	 * @static
	 * @param {Array<T>} array
	 * @returns {List<T>}
	 * @memberof List
	 */
	static ToList(array) {
		let t = new List();
		if (!array || array instanceof List) return t;
		for (let item of array) {
			t.Add(item);
		}
		return t;
	}
	/**
	 * Concat 2 Lists
	 * @param {List<T>} list
	 * @instance
	 * @memberof List=
	 */
	AddRange(list) {
		if (list == null) throw new Error("ArgumentNullException");
		if (!(list instanceof List))
			throw new Error("AddRange: Expected type List");
		for (var item of list) {
			this.Add(item);
		}
	}
	/**
	 * Clear the List
	 * @instance
	 * @memberof List
	 */
	Clear() {
		this.splice(0, this.length);
	}
	/**
	 * Does the List contain a given item
	 * @param {T} item
	 * @instance
	 * @returns {Boolean} Contains
	 * @memberof List
	 */
	Contains(item) {
		return this.includes(item);
	}
	/**
	 * Get the Number of items in the list
	 * @instance
	 * @readonly
	 * @returns {Number} Count
	 * @memberof List
	 */
	get Count() {
		return this.length;
	}
	/**
	 * Not Yet Implimented
	 * @instance
	 * @memberof List
	 */
	Exists() {
		//TODO
	}
	/**
	 * Not Properly Implimented
	 * @param {*} match
	 * @instance
	 * @memberof List
	 */
	Find(match) {
		return this.find(match);
	}
	/**
	 *
	 * Not Properly Implimented
	 * @param {*} action
	 * @instance
	 * @memberof List
	 */
	ForEach(action) {
		this.forEach(action);
	}
	/**
	 * Remove an item from the List
	 * @param {T} iValue
	 * @returns {Number} Index Removed From
	 * @instance
	 * @memberof List
	 */
	Remove(iValue) {
		var iIndex = this.indexOf(iValue);
		if (~iIndex) {
			this.RemoveAt(iIndex);
		}
		return iIndex;
	}
	/**
	 * Remove Item at Index
	 *
	 * @param {Number} iIndex
	 * @returns {T} Removed Item
	 * @instance
	 * @memberof List
	 */
	RemoveAt(iIndex) {
		var vItem = this[iIndex];
		if (vItem) {
			this.splice(iIndex, 1);
		}
		return vItem;
	}
	/**
	 * Attempt to get Value
	 * @param {T} value
	 * @param {Out<T>} out
	 * @instance
	 * @memberof List
	 * @returns {Boolean} Value Found
	 */
	TryGetValue(value, out) {
		if (value == null) return false;
		if (!this.includes(value)) return false;
		if (out) out.Out = value;
		return true;
	}
	/**
	 * Not Yet Implimented
	 * @instance
	 * @memberof List
	 */
	ToArray() {
		return; //TODO
	}
	/**
	 * Not Yet Implimented
	 * @instance
	 * @memberof List
	 */
	Sort(compareFn) {
		return this.sort(compareFn);
	}
	/**
	 * Take a random item from the list
	 * @instance
	 * @returns {T} Item
	 * @memberof List
	 */
	TakeRandom() {
		return this.RemoveAt(~~(Math.random() * this.Count));
	}
}
module.exports = {
	List,
};
