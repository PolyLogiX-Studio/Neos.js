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
			value: uri_parse(url),
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

//Built refrencing uri-js
const URI_PARSE = /^(?:([^:/?#]+):)?(?:\/\/((?:([^/?#@]*)@)?(\[[^/?#\]]+\]|[^/?#:]*)(?::(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
const NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;

function uri_parse(uriString) {
	const components = {};

	const matches = uriString.match(URI_PARSE);

	if (matches) {
		if (NO_MATCH_IS_UNDEFINED) {
			//store each component
			components.scheme = matches[1];
			components.userinfo = matches[3];
			components.host = matches[4];
			components.port = parseInt(matches[5], 10);
			components.path = matches[6] || "";
			components.query = matches[7];
			components.fragment = matches[8];

			//fix port number
			if (isNaN(components.port)) {
				components.port = matches[5];
			}
		} else {
			//IE FIX for improper RegExp matching
			//store each component
			components.scheme = matches[1] || undefined;
			components.userinfo =
				uriString.indexOf("@") !== -1 ? matches[3] : undefined;
			components.host = uriString.indexOf("//") !== -1 ? matches[4] : undefined;
			components.port = parseInt(matches[5], 10);
			components.path = matches[6] || "";
			components.query = uriString.indexOf("?") !== -1 ? matches[7] : undefined;
			components.fragment =
				uriString.indexOf("#") !== -1 ? matches[8] : undefined;

			//fix port number
			if (isNaN(components.port)) {
				components.port = uriString.match(/\/\/(?:.|\n)*:(?:\/|\?|#|$)/)
					? matches[4]
					: undefined;
			}
		}
	} else {
		components.error = components.error || "URI can not be parsed.";
	}

	return components;
}

module.exports = {
	Uri,
};
