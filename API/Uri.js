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
			enumerable: false,
		});
		Object.defineProperty(this, "_raw", {
			value: URI.parse(url),
			enumerable: false,
		});
		let path = this._raw.path.split("/");
		this.Segments = new Array();
		path.forEach((value, index) => {
			this.Segments.push(index < path.length - 1 ? value + "/" : value);
		});
	}

	/**
	 * Return the URL
	 *
	 * @readonly
	 * @memberof Uri
	 */
	get URL() {
		return this._rawUrl;
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
	Uri,
};
