const { Enumerable } = require("./Enumerable");
/**.
 * Enumberable for BuildChangeType
 *
 * @readonly
 * @enum {Enumerable<string>} BuildChangeType
 * @property {"NewFeature"} NewFeature
 * @property {"Tweak"} Tweak
 * @property {"Optimization"} Optimization
 * @property {"Security"} Security
 * @property {"Bugfix"} Bugfix
 */
const BuildChangeType = new Enumerable([
	"NewFeature",
	"Tweak",
	"Optimization",
	"Security",
	"Bugfix",
]);
module.exports = {
	BuildChangeType,
};
