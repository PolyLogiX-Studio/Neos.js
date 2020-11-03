const { Enumerable } = require("./Enumerable");
const OnlineStatus = new Enumerable([
	"Offline",
	"Invisible",
	"Away",
	"Busy",
	"Online",
]);
module.exports = {
	OnlineStatus,
};
