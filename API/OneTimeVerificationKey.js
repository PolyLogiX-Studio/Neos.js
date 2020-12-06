const { CryptoHelper } = require("./CryptoHelper");

class OneTimeVerificationKey {
	static GenerateId(baseId = null) {
		return (
			"K-" +
			(baseId == null || baseId.trim() === "" ? "" : baseId + "-") +
			CryptoHelper.GenerateCryptoToken()
		);
	}
	static IsValidId(id) {
		return id != null && id.startsWith("K-");
	}
	constructor($b) {
		this.OwnerId = $b.ownerId;
		this.KeyId = $b.id;
		this.Use = $b.keyUse;
	}
}
module.exports = { OneTimeVerificationKey };
