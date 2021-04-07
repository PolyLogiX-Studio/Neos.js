const { Enumerable } = require("./Enumerable");
/**.
 * Enumberable for onlineStatus
 *
 * @readonly
 * @enum {Enumerable<string>} OnlineStatus
 * @property {"Offline"} Offline
 * @property {"Invisible"} Invisible
 * @property {"Away"} Away
 * @property {"Busy"} Busy
 * @property {"Online"} Online
 */
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
