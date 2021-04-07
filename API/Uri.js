String.prototype.noExtension = function () {
	return this.replace(/\.[^/.]+$/, "");
};

/**.
 * Uri Support Class for working with Url's much easier by converting it to a usable object
 *
 * @class Uri
 * @param {string} url Generate Uri from url
 */
class Uri {
	constructor(url) {
		if (!url) return;
		this.URL = url;
	}
	set URL(url) {
		// Internal Function. Redefining after instancing not reccomended
		Object.defineProperty(this, "rawUrl", {
			value: url,
			enumerable: false,
		});
		Object.defineProperty(this, "_raw", {
			value: uri_parse(url),
			enumerable: false,
		});
		let path = this._raw.path.split("/");

		/**
		 * Url Segments.
		 *
		 * @name Segments
		 * @type {string[]}
		 * @memberof Uri
		 * @instance
		 * @example
		 * const URL = new Uri("https://github.com/PolyLogiX-Studio/Neos.js")
		 * console.log(URL.Segments)
		 * //[ '/', 'PolyLogiX-Studio/', 'Neos.js' ]
		 */
		this.Segments = new Array();
		path.forEach((value, index) => {
			this.Segments.push(index < path.length - 1 ? value + "/" : value);
		});
	}

	/**.
	 * The URL the object was built on
	 *
	 * @instance
	 * @readonly
	 * @type {string}
	 * @memberof Uri
	 */
	get URL() {
		return this._rawUrl;
	}
	/**
	 * Get the host of the Uri
	 * In this library this is usually `www.neosvr-api.com`.
	 *
	 * @readonly
	 * @instance
	 * @type {string}
	 * @memberof Uri
	 */
	get Host() {
		return this._raw.host;
	}
	/**
	 * Get the Scheme of the Uri
	 * In this library this is usually `neosdb`.
	 *
	 * @readonly
	 * @instance
	 * @type {string}
	 * @memberof Uri
	 */
	get Scheme() {
		return this._raw.scheme;
	}
	/**.
	 * Encode given text to be URL Friendly
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
/**.
 * Regular Expression to chop up a URI
 *
 * @private
 */
const URI_PARSE = /^(?:([^:/?#]+):)?(?:\/\/((?:([^/?#@]*)@)?(\[[^/?#\]]+\]|[^/?#:]*)(?::(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
/**.
 * Check Handle for certain javascript engines. Backup to prevent error in specific case (Such as Edge)
 *
 * @private
 */
const NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === undefined;
/**
 * Parse a URI into an object
 * Support Function.
 *
 * @private
 * @param {string} uriString
 * @returns {{
 * scheme:string,
 * userinfo:string,
 * host:string,
 * port:number,
 * path:string,
 * query:string,
 * fragment:string,
 * error:string
 * }}
 */
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
