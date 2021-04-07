const { Enumerable } = require("./Enumerable");
/**.
 * Enumberable for AccountType
 *
 * @readonly
 * @enum {Enumerable<string>} AssetVariantEntityType
 * @property {"BitmapMetadata"} BitmapMetadata
 * @property {"BitmapVariant"} BitmapVariant
 * @property {"CubemapMetadata"} CubemapMetadata
 * @property {"CubemapVariant"} CubemapVariant
 * @property {"MeshMetadata"} MeshMetadata
 * @property {"ShaderMetadata"} ShaderMetadata
 * @property {"ShaderMetadata"} ShaderMetadata
 * @property {"ShaderVariant"} ShaderVariant
 */
const AssetVariantEntityType = new Enumerable([
	"BitmapMetadata",
	"BitmapVariant",
	"CubemapMetadata",
	"CubemapVariant",
	"MeshMetadata",
	"ShaderMetadata",
	"ShaderVariant",
]);
module.exports = {
	AssetVariantEntityType,
};
