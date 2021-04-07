const { Dictionary } = require("./Dictionary");
/**.
 * Currency Rates
 *
 * @class CurrencyRates
 */
class CurrencyRates {
	constructor($b) {
		/**
		 * @instance
		 * @type {string}
		 * @memberof CurrencyRates
		 */
		this.BaseCurrency = $b.base;
		/**
		 * @instance
		 * @type {Dictionary<string, number>}
		 * @memberof CurrencyRates
		 */
		this.Rates =
			$b.rates instanceof Dictionary
				? $b.rates
				: ((rates) => {
					let rate = new Dictionary();
					for (let r in rates) {
						rate.Add(r, rates[r]);
					}
					return rate;
					//eslint-disable-next-line no-mixed-spaces-and-tabs
				  })($b.rates);
	}
}
module.exports = { CurrencyRates };
