//eslint-disable-next-line no-unused-vars
const { Out } = require("./Out"); //lgtm [js/unused-local-variable] JSDoc Type Def
/**
 * Create a Dictionary Object
 *
 * {@link #out Out} type can be replaced with [] in a var
 * @class Dictionary
 * @template T, A
 */
class Dictionary extends Array {
	constructor() {
		super();
	}
	/**
	 * Add an entry to the Dictionary.
	 *
	 * Will Error if Key already exists.
	 * @param {T} Key - Value
	 * @param {A} Value - Value
	 * @memberof Dictionary
	 * @instance
	 */
	Add(Key, Value) {
		if (this.ContainsKey(Key))
			throw new Error(
				"ArgumentException: An element with the same key already exists"
			);
		this.push({
			Key,
			Value,
		});
	}
	/**
	 * Attempt to add an entry to the Dictionary
	 * @param {T} Key
	 * @param {A} Value
	 * @memberof Dictionary
	 * @instance
	 * @returns {Boolean} - Was the Add command successfull
	 */
	TryAdd(Key, Value) {
		if (this.ContainsKey(Key)) return false;
		this.push({
			Key,
			Value,
		});
		return true;
	}
	/**
	 * Replace Key's value with new Value
	 * @param {T} key
	 * @param {A} Value
	 * @instance
	 * @memberof Dictionary
	 * @returns {boolean} - Was replace successful
	 */
	Replace(key, Value) {
		if (!this.ContainsKey(key)) return false;
		for (let object of this) {
			if (object.Key === key) {
				this[this.indexOf(object)].Value = Value;
				return true;
			}
		}
		return false;
	}
	/**
	 * Clear the Dictionary
	 * @instance
	 * @memberof Dictionary
	 */
	Clear() {
		this.splice(0, this.length);
	}
	CheckCount(func) {
		if (func == null) return this.length;
		return this.filter(func).length;
	}
	/**
	 * Check if a Key exists
	 * @param {T} Key
	 * @instance
	 * @memberof Dictionary
	 * @returns {boolean} - Key Found
	 */
	ContainsKey(Key) {
		for (let object of this) {
			if (object.Key === Key) return true;
		}
		return false;
	}
	/**
	 * Check if a Value exists in the Dictionary
	 * @param {A} Value
	 * @instance
	 * @memberof Dictionary
	 * @returns {boolean} - Value Exists
	 */
	ContainsValue(Value) {
		for (let object of this) {
			if (object.Value === Value) return true;
		}
		return false;
	}
	/**
	 * Get the Capacity
	 * @deprecated
	 * @instance
	 * @memberof Dictionary
	 */
	EnsureCapacity() {
		return this.length;
	}
	/**
	 * Remove an Item at a given Index
	 * @param {number} iIndex
	 * @instance
	 * @memberof Dictionary
	 */
	RemoveAt(iIndex) {
		var vItem = this[iIndex];
		if (vItem) {
			this.splice(iIndex, 1);
		}
		return vItem;
	}
	/**
	 * Remove a Key. Will error if Key does not exist
	 * @param {T} key
	 * @instance
	 * @memberof Dictionary
	 * @returns {boolean} - Key Removed
	 */
	Remove(key) {
		if (!this.ContainsKey(key)) return false;
		for (let object of this) {
			if (object.Key === key) {
				this.RemoveAt(this.indexOf(object));
				return true;
			}
		}
		return false;
	}
	/**
	 * Attempt to remove a Key.
	 * @memberof Dictionary
	 * @instance
	 * @param {T} key
	 * @returns {boolean} - Key Removed
	 */
	TryRemove(key) {
		if (!this.ContainsKey(key)) return false;
		for (let object of this) {
			if (object.Key === key) {
				this.RemoveAt(this.indexOf(object));
				return true;
			}
		}
		return false;
	}
	/**
	 * Get the amount of items
	 * @instance
	 * @readonly
	 * @memberof Dictionary
	 */
	get Count() {
		return this.length;
	}
	/**
	 * Get a key's value
	 * @param {T} key - Key
	 * @param {Out<A>} out - Output Var
	 * @returns {boolean} - Key Exists
	 */
	Get(key, out) {
		if (!this.ContainsKey(key)) return false;
		for (let object of this) {
			if (object.Key === key) {
				out.Out = object.Value;
				return true;
			}
		}
		return false; // How tf you manage that??
	}
	/**
	 * Reduce Callback
	 * @callback Dictionary.Reduce~callback
	 * @param {*} [previousValue]
	 * @param {*} [currentValue]
	 * @param {number} [currentIndex]
	 * @param {any[]} [array]
	 * @returns {*} Returned Value will set to set previousValue
	 */
	/**
	 * Reduce a Dictionary's values down
	 * @param {Dictionary.Reduce~callback} callbackfn - Computation function
	 * @param {*} InitialValue - Initial Value
	 * @returns {*}
	 * @instance
	 * @memberof Dictionary
	 */
	Reduce(callbackfn, InitialValue) {
		if (this.length === 0) return 0;
		return this.reduce(callbackfn, InitialValue);
	}
	/**
	 * @callback Dictionary.AddOrUpdate~callback
	 * @param {T} Key - Current Key
	 * @param {A} Value - Current Value
	 * @returns {A} New Value
	 */
	/**
	 * Adds a new Value at Key
	 *
	 * if Key exists, Updates Key
	 *
	 * if func is set, Programatically updates Key
	 * @param {T} key
	 * @param {A} value
	 * @param {Dictionary.AddOrUpdate~callback} [func]
	 * @returns {Boolean} Added
	 * @instance
	 * @memberof Dictionary
	 */
	AddOrUpdate(key, value, func) {
		if (!this.ContainsKey(key)) {
			if (this.TryAdd(key, value)) return value;
			return false;
		}
		if (func == null) {
			if (this.Replace(key, value)) return value;
			return false;
		}
		let oldValue = new Out();
		this.Get(key, oldValue);
		let newValue = func(key, oldValue.Out);
		if (this.Replace(key, newValue)) return newValue;
	}
	/**
	 * Attempt to get Value, Sets Value to Out. Returns Boolean valueExists
	 * @param {A} value
	 * @param {Out<A>} out
	 * @returns {boolean} - Value Existed
	 */
	TryGetValue(value, out) {
		if (value == null) return false;
		if (!this.ContainsKey(value)) return false;
		if (out) this.Get(value, out);
		return true;
	}
}
module.exports = {
	Dictionary,
};
