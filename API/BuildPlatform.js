const { Enumerable } = require("./Enumerable");
/**
 * Enumberable for BuildPlatform
 * @readonly
 * @enum {Enumerable<string>} BuildPlatform
 * @property {"Windows_x64"} Windows_x64
 * @property {"Linux_x64"} Linux_x64
 * @property {"Android_ARM7"} Android_ARM7
 * @property {"OculusQuest"} OculusQuest
 */
const BuildPlatform = new Enumerable([
	"Windows_x64",
	"Linux_x64",
	"Android_ARM7",
	"Security",
	"OculusQuest",
]);
module.exports = {
	BuildPlatform,
};
