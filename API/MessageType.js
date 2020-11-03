const { Enumerable } = require("./Enumerable");
const MessageType = new Enumerable([
	"Text",
	"Object",
	"Sound",
	"SessionInvite",
	"CreditTransfer",
	"SugarCubes", //Not Implimented
]);
module.exports = {
	MessageType,
};
