/**
 * @class PatreonSnapshot
 *
 * @param {Object} $b
 * @param {number} $b.totalCents
 * @param {number} $b.patreonRawCents
 * @param {number} $b.deltaCents
 * @param {number} $b.pledgeCents
 * @param {string} $b.email
 * @param {Date} $b.timestamp
 */
class PatreonSnapshot {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {number} */
		this.TotalCents = $b.totalCents;
		/**@type {number} */
		this.PatreonRawCents = $b.patreonRawCents;
		/**@type {number} */
		this.DeltaCents = $b.deltaCents;
		/**@type {number} */
		this.PledgeCents = $b.pledgeCents;
		/**@type {string} */
		this.Email = $b.email;
		/**@type {Date} */
		this.Timestamp = $b.timestamp;
	}
}
module.exports = {
	PatreonSnapshot,
};
