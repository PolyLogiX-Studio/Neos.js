const { v4: uuidv4 } = require("uuid");
class CancellationTokenSource {
	constructor() {
		this.Token = uuidv4();
	}
}
module.exports = {
	CancellationTokenSource,
};
