const { StringBuilder } = require("./StringBuilder");
const { Char } = require("./Char");
const { OwnerType } = require("./OwnerType");
const { v4: uuidv4 } = require("uuid");
/**
 *
 * @static
 * @class IdUtil
 */
class IdUtil {
	static get MAX_NAME_LENGTH() {
		return 20;
	}
	/**
   *
   * @static
   * @param {string} id
   * @returns {OwnerType}
   * @memberof IdUtil
   */
	static GetOwnerType(id) {
		if (id == null) return OwnerType.INVALID;
		if (id.startsWith("M-")) return OwnerType.Machine;
		if (id.startsWith("U-")) return OwnerType.User;
		if (id.startsWith("G-")) return OwnerType.Group;
		return OwnerType.INVALID;
	}
	/**
   *
   * @static
   * @param {OwnerType} ownerType
   * @param {string} [name=null]
   * @param {number} [randomAppend=0]
   * @memberof IdUtil
   */
	static GenerateId(ownerType, name = null, randomAppend = 0) {
		name =
      name != null
      	? name
      		.normalize("NFD")
      		.replace(/[\u0300-\u036f]/g, "")
      		.replace(/[\u{0080}-\u{FFFF}]/gu, "")
      	: null;
		var stringBuilder = new StringBuilder();
		if (name != null) {
			for (/** @type string */ let c of name) {
				if (Char.IsLetterOrDigit(c)) stringBuilder.Append(c);
				if (Char.IsWhiteSpace(c) || c === "_") stringBuilder.Append("-");
				if (stringBuilder.Length === 20) break;
			}
		}
		if (stringBuilder.Length === 0 || randomAppend > 0) {
			if (stringBuilder.Length > 0) stringBuilder.Append("-");
			let str = uuidv4();
			if (randomAppend > 0) str = str.substr(0, randomAppend);
			stringBuilder.Append(str);
		}
		switch (ownerType) {
		case OwnerType.Machine:
			stringBuilder.Insert(0, "M-");
			break;
		case OwnerType.User:
			stringBuilder.Insert(0, "U-");
			break;
		case OwnerType.Group:
			stringBuilder.Insert(0, "G-");
			break;
		default:
			throw new Error("Invalid Owner Type");
		}
		return stringBuilder.toString();
	}
}
module.exports = {
	IdUtil,
};
