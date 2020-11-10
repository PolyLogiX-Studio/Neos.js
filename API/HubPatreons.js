const List = require("./List");

/**
 *
 *
 * @class HubPatreons
 */
class HubPatreons {
	/**
	 *Creates an instance of HubPatreons.
	 * @param {{
	 * "patreon-names": List<string>,
	 * "patreon-pictures": List<PicturePatreon>
	 * }} $b
	 * @memberof HubPatreons
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.MAX_NAMES = 400;
		this.MAX_PICTURES = 50;
		this.PatreonNames = $b["patreon-names"] || new List();
		this.PatreonPictures = $b["patreon-pictures"] || new List();
	}
}
module.exports = {
	HubPatreons,
};
