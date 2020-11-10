const { Out } = require("./Out"); //lgtm [js/unused-local-variable] JSDoc Type Def
const { StringBuilder } = require("./StringBuilder");
const { Uri } = require("./Uri");
const { v4: uuidv4 } = require("uuid");
String.IsNullOrWhiteSpace = function (str) {
	if (!str) return true;
	if (str.trim() === "") return true;
	return false;
};
String.IsNullOrEmpty = function (str) {
	if (!str) return true;
	if (str === "") return true;
	return false;
};
/**
 *
 * @static
 * @class RecordUtil
 */
class RecordUtil {
	/**
	 *
	 *
	 * @static
	 * @param {string} ownerId
	 * @param {string} recordId
	 *
	 * @memberof RecordUtil
	 */
	static GenerateUri(ownerId, recordId) {
		return new Uri("neosrec:///" + ownerId + "/" + recordId);
	}
	/**
	 *
	 *
	 * @static
	 * @param {string} recordId
	 *
	 * @memberof RecordUtil
	 */
	static IsValidRecordID(recordId) {
		return (
			!String.IsNullOrWhiteSpace(recordId) &&
			recordId.startsWith("R-") &&
			recordId.length > "R-".length
		);
	}
	/**
	 *
	 *
	 * @static
	 * @param {Uri} recordUri
	 * @param {Out<string>} ownerId
	 * @param {Out<string>} recordId
	 * @memberof RecordUtil
	 */
	static ExtractRecordID(recordUri, ownerId, recordId) {
		ownerId.Out = null;
		recordId.Out = null;
		if (recordUri == null) return false;
		if (recordUri.Scheme !== "neosrec" || recordUri.Segments.length !== 3)
			return false;
		ownerId.Out = recordUri.Segments[1];
		if (String.IsNullOrEmpty(ownerId.Out)) return false;
		ownerId.Out = ownerId.Out.substr(0, ownerId.Out.length - 1);
		recordId.Out = recordUri.Segments[2];
		return (
			!String.IsNullOrEmpty(recordId.Out) &&
			RecordUtil.IsValidRecordID(recordId.Out)
		);
	}
	/**
	 *
	 *
	 * @static
	 * @param {Uri} recordUri
	 * @param {Out<string>} ownerId
	 * @param {Out<string>} recordPath
	 * @memberof RecordUtil
	 */
	static ExtractRecordPath(recordUri, ownerId, recordPath) {
		ownerId.Out = null;
		recordPath.Out = null;
		if (
			recordUri == null ||
			recordUri.Scheme !== "neosrec" ||
			recordUri.Segments.length < 3
		)
			return false;
		ownerId.Out = recordUri.Segments[1];
		if (String.IsNullOrEmpty(ownerId.Out)) return false;
		ownerId.Out = ownerId.Out.substr(0, ownerId.Out.length - 1);
		let stringBuilder = new StringBuilder();
		for (let index = 2; index < recordUri.Segments.length; index++)
			stringBuilder.Append(recordUri.Segments[index]);
		recordPath.Out = stringBuilder.toString();
		return true;
	}
	static GenerateRecordID() {
		return "R-" + uuidv4();
	}
}
module.exports = {
	RecordUtil,
};
