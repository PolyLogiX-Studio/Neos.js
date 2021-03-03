const crypto = require("crypto");
// eslint-disable-next-line no-unused-vars
class CryptoHelper {
	//TODO #146 Rework Crypto
	static GenerateCryptoToken() {
		return crypto.randomBytes(16).toString().replace("-", "");
	}
}
module.exports = {
	CryptoHelper,
};
