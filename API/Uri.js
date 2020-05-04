const URI = require("uri-js");
String.prototype.noExtension = function () {
  return this.replace(/\.[^/.]+$/, "");
};
class Uri {
  /**
   *Creates an instance of Uri.
   * @param {String} url
   * @memberof Uri
   */
  constructor(url) {
    if (!url) return;
    this.URL = url;
  }
  /**
   * @param {string} url
   */
  set URL(url) {
    Object.defineProperty(this, "rawUrl", {
      value: url,
      enumerable: false
    });
    this._raw = URI.parse(url);
    let path = this._raw.path.split("/");
    this.Segments = new Array();
    path.forEach((value, index) => {
      this.Segments.push(index < path.length - 1 ? value + "/" : value);
    });
  }
  /**
   *
   *
   * @readonly
   * @memberof Uri
   */
  get Scheme() {
    return this._raw.scheme;
  }
  /**
   *
   *
   * @static
   * @param {String} dat
   * @returns {String}
   * @memberof Uri
   */
  static EscapeDataString(dat) {
    return encodeURI(dat);
  }
}
module.exports = {
  Uri
}