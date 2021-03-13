const { Enumerable } = require("./Enumerable");
/**
 * Enumberable for AccountType
 * @readonly
 * @enum {Enumerable<string>} PublicBanType
 * @property {"Standard"} Standard
 * @property {"Soft"} Soft
 * @property {"Hard"} Hard
 */
const PublicBanType = new Enumerable(["Standard", "Soft", "Hard"]);
module.exports = {
	PublicBanType,
};
