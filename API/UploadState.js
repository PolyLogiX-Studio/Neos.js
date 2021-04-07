const { Enumerable } = require("./Enumerable");
/**.
 * Enumberable for UploadState
 *
 * @readonly
 * @enum {Enumerable<string>} UploadState
 * @property {"UploadingChunks"} UploadingChunks
 * @property {"Finalizing"} Finalizing
 * @property {"Uploaded"} Uploaded
 * @property {"Failed"} Failed
 */
const UploadState = new Enumerable([
	"UploadingChunks",
	"Finalizing",
	"Uploaded",
	"Failed",
]);
module.exports = {
	UploadState,
};
