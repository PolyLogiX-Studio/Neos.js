const { Out } = require("./Out");
const { Path } = require("./Path");
const { Uri } = require("./Uri");
const SHA256 = require("crypto-js/sha256");
const fs = require("fs");
/**.
 * Utility Class for working with Assets
 *
 * @class AssetUtil
 */
class AssetUtil {
	/**.
	 * Compute Version
	 *
	 * @readonly
	 * @static
	 * @memberof AssetUtil
	 * @returns {4}
	 */
	static get COMPUTE_VERSION() {
		return 4;
	}
	/**.
	 * Generate a SHA256 hash signature for a file
	 *
	 * @static
	 * @param {Buffer | string} file File Stream or Path to file
	 * @memberof AssetUtil
	 * @returns {string} Hash Signature
	 */
	static GenerateHashSignature(file) {
		if (file instanceof String) {
			let fileStream = fs.readFileSync(file);
			return AssetUtil.GenerateHashSignature(fileStream);
		} else {
			return SHA256(file.toString()).toString().replace("-", "").toLowerCase();
		}
	}
	/**.
	 * Generate a NeosDB Asset Url
	 *
	 * @static
	 * @param {string} signature File Signature
	 * @param {string} extension Asset Type
	 * @returns {Uri}
	 * @memberof AssetUtil
	 */
	static GenerateURL(signature, extension) {
		if (!extension.startsWith(".")) extension = "." + extension;
		return new Uri("neosdb:///" + signature + extension);
	}
	/**.
	 * Extract the signature [And Extension] from a URI
	 *
	 * @static
	 * @param {Uri} uri
	 * @param {Out<String>} [extension]
	 * @returns {string} Signature
	 * @memberof AssetUtil
	 */
	static ExtractSignature(uri, extension = new Out()) {
		if (uri.Scheme !== "neosdb") throw new Error("Not a NeosDB URI");
		let segment = uri.Segments[1];
		extension.Out = Path.GetExtension(segment);
		return Path.GetFileNameWithoutExtension(segment);
	}
	/**.
	 * Append a Variant Identifier to a signature
	 *
	 * @static
	 * @param {string} signature
	 * @param {string} variant
	 * @returns {string}
	 * @memberof AssetUtil
	 */
	static ComposeIdentifier(signature, variant) {
		if (String.IsNullOrWhiteSpace(variant)) return signature;
		return signature + "&" + variant;
	}
	/**.
	 * Split the Varient and Signature from a Variant Identifier
	 *
	 * @static
	 * @param {string} identifier
	 * @param {Out<String>} [signature]
	 * @param {Out<String>} [variant]
	 * @memberof AssetUtil
	 */
	static SplitIdentifier(identifier, signature, variant) {
		let length = identifier.indexOf("&");
		if (length >= 0) {
			variant.Out = identifier.substr(length + 1);
			signature.Out = identifier.substr(0, length);
		} else {
			variant.Out = null;
			signature.Out = identifier.toLowerCase();
		}
	}
}
module.exports = {
	AssetUtil,
};
