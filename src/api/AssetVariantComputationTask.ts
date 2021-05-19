import type { AssetVariantEntityType } from "./AssetVariantEntityType";
export class AssetVariantComputationTask {
	AssetSignature: string;
	VariantId: string;
	EntityType: AssetVariantEntityType;
	constructor($b: AssetVariantComputationTaskJSON) {
		this.AssetSignature = $b.assetSignature;
		this.VariantId = $b.variantId;
		this.EntityType = $b.entityType;
	}
	toJSON(): AssetVariantComputationTaskJSON {
		return {
			assetSignature: this.AssetSignature,
			variantId: this.VariantId,
			entityType: this.EntityType,
		};
	}
}
interface AssetVariantComputationTaskJSON {
	assetSignature: string;
	variantId: string;
	entityType: AssetVariantEntityType;
}
