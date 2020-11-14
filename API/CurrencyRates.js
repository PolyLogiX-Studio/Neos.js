const { Dictionary } = require("./Dictionary");
class CurrencyRates {
	constructor($b) {
		this.BaseCurrency = $b.base;
		this.Rates =
			$b.rates instanceof Dictionary
				? $b.rates
				: ((rates) => {
					let rate = new Dictionary();
					for (let r in rates.rates) {
						rate.Add(r, rates.rates[r]);
					}
					return rate;
					//eslint-disable-next-line no-mixed-spaces-and-tabs
				  })($b.rates);
	}
}
module.exports = { CurrencyRates };
