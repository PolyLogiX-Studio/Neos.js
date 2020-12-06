const crypto = require("crypto");
// eslint-disable-next-line no-unused-vars
const SHA256 = require("crypto-js/sha256");
class CryptoHelper {
	static GenerateCryptoToken() {
		return crypto.randomBytes(16).toString().replace("-", "");
	}
}
module.exports = {
	CryptoHelper,
};
