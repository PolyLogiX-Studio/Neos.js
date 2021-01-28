const { Enumerable } = require("./Enumerable");
const AssetVariantEntityType = new Enumerable([
	"BitmapMetadata",
	"BitmapVariant",
	"CubemapMetadata",
	"CubemapVariant",
	"MeshMetadata"
]);
module.exports = {
	AssetVariantEntityType,
};
