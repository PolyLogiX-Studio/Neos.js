const { List } = require("./List");
class UserProfile {
	constructor($b) {
		if (!$b) $b = {};
		this.IconUrl = $b.iconUrl;
		this.BackgroundUrl = $b.backgroundUrl;
		this.Tagline = $b.tagline;
		this.Description = $b.description;
		this.ProfileWorldUrl = $b.profileWorldUrl;
		this.ShowcaseItems =
			$b.showcaseItems instanceof List
				? $b.showcaseItems
				: $b.showcaseItems != null
					? List.ToList($b.showcaseItems)
					: null;
		this.TokenOptOut =
			$b.tokenOptOut instanceof List
				? $b.tokenOptOut
				: $b.tokenOptOut != null
					? List.ToList($b.tokenOptOut)
					: null;
	}
	/**
	 *
	 *
	 * @param {UserProfile} other
	 * @returns
	 * @memberof UserProfile
	 */
	IsSame(other) {
		return (
			this.IconUrl === other.IconUrl &&
			this.BackgroundUrl === other.BackgroundUrl &&
			this.TagLine &&
			other.TagLine
		); //TODO When implimented
	}
	static MAX_SHOWCASE_ITEMS() {
		return 6;
	}
	/**
	 *
	 * @readonly
	 * @memberof UserProfile
	 */
	get IsValid() {
		let showcaseItems = this.ShowcaseItems;
		return (
			(showcaseItems != null ? showcaseItems.Count : 0) <=
			UserProfile.MAX_SHOWCASE_ITEMS
		);
	}
	/**
	 *
	 *
	 * @param {String} token
	 *
	 * @memberof UserProfile
	 */
	AcceptsToken(token) {
		return (
			this.TokenOptOut == null || !this.TokenOptOut.Any((s) => s === token)
		);
	}
}
module.exports = {
	UserProfile,
};
