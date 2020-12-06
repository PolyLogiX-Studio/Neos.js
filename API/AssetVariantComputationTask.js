class AssetVariantComputationTask {
	/**
	 *Creates an instance of AssetVariantComputationTask.
	 * @param {{
	 * assetSignature: string,
	 * variantId: string,
	 * entityType: AssetVariantEntityType
	 * }} $b
	 * @memberof AssetVariantComputationTask
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.AssetSignature = $b.assetSignature;
		this.VariantId = $b.variantId;
		this.EntityType = $b.entityType;
	}
}
module.exports = { AssetVariantComputationTask };
