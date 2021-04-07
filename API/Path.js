/**.
 * Utility Class
 *
 * @class Path
 */
class Path {
	/**.
	 * Get the Extension
	 *
	 * @static
	 * @param {string} str
	 * @returns {string} Extension
	 * @memberof Path
	 */
	static GetExtension(str) {
		return str.match(/\.[a-zA-Z0-9]+$/)[0];
	}
	/**.
	 * Get the Filename
	 *
	 * @static
	 * @param {string} str
	 * @returns {string}
	 * @memberof Path
	 */
	static GetFileNameWithoutExtension(str) {
		return str.replace(/\.[^/.]+$/, "");
	}
}
module.exports = {
	Path,
};
