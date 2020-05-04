const {
  Out
} = require("./Out")
const {
  Path
} = require("./Path")
const SHA256 = require("crypto-js/sha256");
const fs = require("fs")
class AssetUtil {
  /**
   * @readonly
   * @static
   * @memberof AssetUtil
   */
  static get COMPUTE_VERSION() {
    return 4;
  }
  /**
   *
   * @template T
   * @static
   * @param {T} file
   * @memberof AssetUtil
   */
  static GenerateHashSignature(file) {
    if (Type.Get(file) == "String") {
      let fileStream = fs.readFileSync(file);
      return AssetUtil.GenerateHashSignature(fileStream);
    } else {
      return SHA256(file.toString())
        .toString()
        .replace("-", "")
        .toLowerCase();
    }
  }
  static GenerateURL(signature, extension) {
    if (!extension.startsWith(".")) extension = "." + extension;
    return new Uri("neosdb:///" + signature + extension);
  }
  /**
   * @static
   * @param {Uri} uri
   * @param {Out<String>} extension
   * @memberof AssetUtil
   */
  static ExtractSignature(uri, extension = new Out()) {
    if (uri.Scheme != "neosdb") throw new Error("Not a NeosDB URI");
    let segment = uri.Segments[1];
    extension.Out = Path.GetExtension(segment);
    return Path.GetFileNameWithoutExtension(segment);
  }
  /**
   *
   *
   * @param {string} signature
   * @param {string} variant
   * @memberof AssetUtil
   */
  static ComposeIdentifier(signature, variant) {
    if (String.IsNullOrWhiteSpace(variant)) return signature;
    return signature + "&" + variant;
  }
  /**
   *
   *
   * @static
   * @param {string} identifier
   * @param {Out<String>} signature
   * @param {Out<String>} variant
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
  AssetUtil
}