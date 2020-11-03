const { Enumerable } = require("./Enumerable");
const SessionAccessLevel = new Enumerable([
	"Private",
	"LAN",
	"Friends",
	"RegisteredUsers",
	"Anyone",
]);
module.exports = {
	SessionAccessLevel,
};
