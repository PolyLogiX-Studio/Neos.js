class PicturePatreon {
	/**
	 *Creates an instance of PicturePatreon.
	 *
	 * @param {{
	 * name: string,
	 * pictureUrl: string
	 * }} $b
	 * @memberof PicturePatreon
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.Name = $b.name;
		this.PictureURL = $b.pictureUrl;
	}
	/**.
	 *
	 *
	 * @param {string} name
	 * @param {string} pictureUrl
	 * @memberof PicturePatreon
	 */
	PicturePatreon(name, pictureUrl) {
		this.Name = name;
		this.PictureURL = pictureUrl;
	}
}
module.exports = {
	PicturePatreon,
};
