const { Enumerable } = require("./Enumerable");
const OwnerType = new Enumerable(["Machine", "User", "Group", "INVALID"]);
module.exports = {
	OwnerType,
};
