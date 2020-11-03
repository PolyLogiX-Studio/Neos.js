const { Enumerable } = require("./Enumerable");
const UploadState = new Enumerable([
	"UploadingChunks",
	"Finalizing",
	"Uploaded",
	"Failed",
]);
module.exports = {
	UploadState,
};
