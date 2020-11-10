const Decimal = require("decimal.js");
const { TransactionUtil } = require("./TransactionUtil");
class TransactionManager {
	constructor(cloud) {
		this.CDFTConversionRatio = null;
		this.NCRConversionRatio = null;
		this.TransactionManager(cloud);
	}
	TransactionManager(cloud) {
		this.Cloud = cloud;
		(async () => {
			await this.LoadConversionData();
		})();
	}
	async LoadConversionData() {
		let cloudResult1 = await this.Cloud.ReadGlobalVariable(
			TransactionUtil.NCR_CONVERSION_VARIABLE
		);
		if (cloudResult1.IsOK) {
			this.NCRConversionRatio = new Decimal(cloudResult1.Entity.value);
		} else {
			throw new Error(
				"Error getting conversion ratio. " +
					cloudResult1.State +
					"\n\n" +
					cloudResult1.Content
			);
		}
		let cloudResult2 = await this.Cloud.ReadGlobalVariable(
			TransactionUtil.CDFT_CONVERSION_VARIABLE
		);
		if (cloudResult2.IsOK) {
			this.CDFTConversionRatio = new Decimal(cloudResult2.Entity.value);
		} else {
			throw new Error(
				"Error getting conversion ratio. " +
					cloudResult2.State.ToString() +
					"\n\n" +
					cloudResult2.Content
			);
		}
	}
	TryConvert(sourceToken, sourceAmount, targetToken) {
		let num1;
		let num2;
		let num3;
		let num4;
		let ncrConversionRatio1;
		let cdftConversionRatio1;
		let ncrConversionRatio2;
		let cdftConversionRatio2;
		if (sourceToken === "USD") {
			switch (targetToken) {
			case "NCR":
				num1 = sourceAmount;
				ncrConversionRatio1 = this.NCRConversionRatio;
				return !(ncrConversionRatio1 != null)
					? new Decimal()
					: num1 / ncrConversionRatio1;
			case "CDFT":
				num2 = sourceAmount;
				cdftConversionRatio1 = this.CDFTConversionRatio;
				return !(cdftConversionRatio1 != null)
					? new Decimal()
					: num2 / cdftConversionRatio1;
			default:
				return new Number();
			}
		} else {
			if (!(targetToken === "USD")) return new Number();
			switch (sourceAmount) {
			case "NCR":
				num3 = sourceAmount;
				ncrConversionRatio2 = this.NCRConversionRatio;
				return !(ncrConversionRatio2 != null)
					? new Decimal()
					: num3 * ncrConversionRatio2;
			case "CDFT":
				num4 = sourceAmount;
				cdftConversionRatio2 = this.CDFTConversionRatio;
				return !(cdftConversionRatio2 != null)
					? new Decimal()
					: num4 * cdftConversionRatio2;
			case "KFC":
				return new Number();
			default:
				return new Number();
			}
		}
	}
	IsValidToken(token) {
		switch (token) {
		case "NCR":
		case "CDFT":
		case "KFC":
			return true;
		default:
			return false;
		}
	}
	ToUSD(token, amount) {
		var cdftConversionRatio;
		var num;
		switch (token) {
		case "NCR":
			return !(this.NCRConversionRatio != null)
				? new Decimal()
				: this.NCRConversionRatio * amount;
		case "CDFT":
			cdftConversionRatio = this.CDFTConversionRatio;
			num = amount;
			return !(cdftConversionRatio != null)
				? new Decimal()
				: cdftConversionRatio * num;
		case "KFC":
			return new Number();
		default:
			throw new Error("Invalid Token: " + token);
		}
	}
	static FormatCurrency(amount) {
		if (!amount) return "N/A";
		return amount.toString();
	}
}
module.exports = {
	TransactionManager,
};
