//eslint-disable-next-line no-unused-vars
const { AssetVariantEntityType } = require("./AssetVariantEntityType"); //lgtm [js/unused-local-variable] JSDoc Type Def
/**
 * @class AssetVariantComputationTask
 * @param {Object} $b
 * @param {string} $b.assetSignature
 * @param {string} $b.variantId
 * @param {AssetVariantEntityType} $b.entityType
 */
class AssetVariantComputationTask {
	constructor($b) {
		if (!$b) $b = {};
		/**@type {string} */
		this.AssetSignature = $b.assetSignature;
		/**@type {string} */
		this.VariantId = $b.variantId;
		/**@type {AssetVariantEntityType} */
		this.EntityType =
			typeof $b.entityType === "string"
				? $b.entityType
				: AssetVariantEntityType.FromNumber($b.entityType);
	}
}
module.exports = { AssetVariantComputationTask };
