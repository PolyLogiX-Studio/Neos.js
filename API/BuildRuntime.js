const { Enumerable } = require("./Enumerable");
/**
 * Enumberable for BuildRuntime
 * @readonly
 * @enum {Enumerable<string>} BuildRuntime
 * @property {"Unity_Mono"} Unity_Mono
 * @property {"Unity_Mono_Debug"} Unity_Mono_Debug
 * @property {"Unity_IL2CPP"} Unity_IL2CPP
 * @property {"HeadlessNetFramework"} HeadlessNetFramework
 */
const BuildRuntime = new Enumerable([
	"Unity_Mono",
	"Unity_Mono_Debug",
	"Unity_IL2CPP",
	"HeadlessNetFramework",
]);
module.exports = {
	BuildRuntime,
};
