const { AccountType } = require("./AccountType");
class NeosAccount {
	/**
	 *
	 * @static
	 * @param {AccountType} type
	 * @returns {Number}
	 * @memberof NeosAccount
	 */
	static MinCents(type) {
		let num = 100;
		switch (type) {
		case AccountType.Normal:
			return 0;
		case AccountType.AgentSmith:
			return num;
		case AccountType.BladeRunner:
			return num * 6;
		case AccountType.Gunter:
			return num * 12;
		case AccountType.Neuromancer:
			return num * 24;
		case AccountType.Architect:
			return num * 32;
		case AccountType.Curator:
			return num * 72;
		case AccountType.Level144:
			return num * 144;
		case AccountType.Level250:
			return num * 250;
		case AccountType.Anorak:
			return num * 500;
		default:
			throw new Error("Invalid AccountType: " + type);
		}
	}
	/**
	 *
	 *
	 * @static
	 * @param {AccountType} type
	 * @returns {String}
	 * @memberof NeosAccount
	 */
	static AccountName(type) {
		switch (type) {
		case AccountType.Normal:
			return "Standard Account";
		case AccountType.AgentSmith:
			return "Agent Smith";
		case AccountType.BladeRunner:
			return "Blade Runner";
		case AccountType.Gunter:
			return "Gunter";
		case AccountType.Neuromancer:
			return "Neuromancer";
		case AccountType.Architect:
			return "Architect";
		case AccountType.Curator:
			return "Curator";
		case AccountType.Level144:
			return "Level 144";
		case AccountType.Level250:
			return "Level 250";
		case AccountType.Anorak:
			return "Anorak";
		default:
			return "Unknown Account Type";
		}
	}
	/**
	 *
	 *
	 * @static
	 * @param {AccountType} type
	 * @returns {BigInt}
	 * @memberof NeosAccount
	 */
	static StorageBytes(type) {
		// eslint-disable-next-line no-undef
		var num = BigInt("1073741824n");
		switch (type) {
		case AccountType.Normal:
			return num;
		case AccountType.AgentSmith:
			// eslint-disable-next-line no-undef
			return num * BigInt("5n");
		case AccountType.BladeRunner:
			// eslint-disable-next-line no-undef
			return num * BigInt("25n");
		case AccountType.Gunter:
			// eslint-disable-next-line no-undef
			return num * BigInt("50n");
		case AccountType.Neuromancer:
			// eslint-disable-next-line no-undef
			return num * BigInt("100n");
		case AccountType.Architect:
			// eslint-disable-next-line no-undef
			return num * BigInt("150n");
		case AccountType.Curator:
			// eslint-disable-next-line no-undef
			return num * BigInt("300n");
		case AccountType.Level144:
			// eslint-disable-next-line no-undef
			return num * BigInt("600n");
		case AccountType.Level250:
			// eslint-disable-next-line no-undef
			return num * BigInt("1200n");
		case AccountType.Anorak:
			// eslint-disable-next-line no-undef
			return num * BigInt("2400n");
		default:
			throw new Error("Invalid AccountType: " + type);
		}
	}
	/**
	 *
	 *
	 * @static
	 * @param {AccountType} type
	 * @returns {Number}
	 * @memberof NeosAccount
	 */
	static HasPatreonWorldAccess(type) {
		switch (type) {
		case AccountType.Normal:
		case AccountType.AgentSmith:
			return false;
		case AccountType.BladeRunner:
		case AccountType.Gunter:
		case AccountType.Neuromancer:
		case AccountType.Architect:
		case AccountType.Curator:
		case AccountType.Level144:
		case AccountType.Level250:
		case AccountType.Anorak:
			return true;
		default:
			throw new Error("Invalid AccountType: " + type);
		}
	}
}
module.exports = {
	NeosAccount,
};
