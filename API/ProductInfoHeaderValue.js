class ProductInfoHeaderValue {
	constructor(product, version) {
		this.Product = product;
		this.Version = version;
	}
	Value() {
		return this.Product + " " + this.Version;
	}
}
module.exports = {
	ProductInfoHeaderValue,
};
