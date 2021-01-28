const { Enumerable } = require("./Enumerable");
const AssetVariantEntityType = new Enumerable([
	"BitmapMetadata",
	"BitmapVariant",
	"CubemapMetadata",
	"CubemapVariant",
	"ShaderMetadata",
  "ShaderVariant",
]);
module.exports = {
	AssetVariantEntityType,
};
