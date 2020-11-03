class Type {
	static Get(obj) {
		if (obj == null) return "null";
		return obj.constructor.name;
	}
}
module.exports = {
	Type,
};
