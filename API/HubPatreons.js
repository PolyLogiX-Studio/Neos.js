const { List } = require("./List");
const { PicturePatreon } = require("./PicturePatreon");

/**.
 *
 *
 * @class HubPatreons
 */
class HubPatreons {
	/**
	 *Creates an instance of HubPatreons.
	 *
	 * @param {{
	 * "patron-names": List<string>,
	 * "patron-pictures": List<PicturePatreon>
	 * }} $b
	 * @memberof HubPatreons
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.MAX_NAMES = 400;
		this.MAX_PICTURES = 50;
		this.VARIABLE_NAME = "hub.patrons";
		this.PatreonNames = List.ToList($b["patron-names"]);
		let PatreonPictures = $b["patron-pictures"];
		this.PatreonPictures = new List();
		if (PatreonPictures != null) {
			for (let item of PatreonPictures) {
				this.PatreonPictures.Add(new PicturePatreon(item));
			}
		}
	}
	/**
	 * @instance
	 * @deprecated
	 * @memberof HubPatreons
	 */
	EnsureMaxLimitsRandomized() {
		while (this.PatreonNames.Count > this.MAX_NAMES)
			this.PatreonNames.TakeRandom();
		while (this.PatreonPictures.Count > this.MAX_PICTURES)
			this.PatreonPictures.TakeRandom();
	}
}
module.exports = {
	HubPatreons,
};
