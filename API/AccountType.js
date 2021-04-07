const { Enumerable } = require("./Enumerable");
/**.
 * Enumberable for AccountType
 *
 * @readonly
 * @enum {Enumerable<string>} AccountType
 * @property {"Normal"} Normal
 * @property {"AgentSmith"} AgentSmith
 * @property {"BladeRunner"} BladeRunner
 * @property {"Gunter"} Gunter
 * @property {"Neuromancer"} Neuromancer
 * @property {"Architect"} Architect
 * @property {"Curator"} Curator
 * @property {"Level144"} Level144
 * @property {"Level250"} Level250
 * @property {"Anorak"} Anorak
 * @property {"Level750"} Level750
 * @property {"END"} END
 */
const AccountType = new Enumerable([
	"Normal",
	"AgentSmith",
	"BladeRunner",
	"Gunter",
	"Neuromancer",
	"Architect",
	"Curator",
	"Level144",
	"Level250",
	"Anorak",
	"Level750",
	"END",
]);
module.exports = {
	AccountType,
};
