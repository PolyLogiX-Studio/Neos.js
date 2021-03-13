/**
 * @class BuildReporter
 *
 * @param {Object} $b
 * @param {string} $b.username
 * @param {string} $b.neosUserID
 * @param {string} $b.discordHandle
 * @param {string} $b.githubHandle
 */
class BuildReporter {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.Username = $b.username;
		/**@type {string} */
		this.NeosUserID = $b.neosUserID;
		/**@type {string} */
		this.DiscordHandle = $b.discordHandle;
		/**@type {string} */
		this.GithubHandle = $b.githubHandle;
	}
}
module.exports = {
	BuildReporter,
};
