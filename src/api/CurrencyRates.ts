import { Dictionary } from "@bombitmanbomb/utils";
export class CurrencyRates {
	public BaseCurrency: string;
	public Rates: Dictionary<string, number>;
	constructor($b: CurrencyRatesJSON) {
		this.BaseCurrency = $b.base;
		this.Rates =
			$b.rates instanceof Dictionary
				? $b.rates
				: Dictionary.ToDictionary($b.rates);
	}
	toJSON(): CurrencyRatesJSON {
		return {
			base: this.BaseCurrency,
			rates: this.Rates.toJSON(),
		};
	}
}
export interface CurrencyRatesJSON {
	base: string;
	rates: { [prop: string]: number };
}
