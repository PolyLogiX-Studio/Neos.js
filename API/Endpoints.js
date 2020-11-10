class Endpoints {
	static get CLOUDX_NEOS_API() {
		return "https://cloudx.azurewebsites.net";
	}
	static get CLOUDX_NEOS_BLOB() {
		return "https://cloudxstorage.blob.core.windows.net/assets/";
	}
	static get CLOUDX_NEOS_THUMBNAILS() {
		return "https://cloudxstorage.blob.core.windows.net/thumbnails/";
	}
}
module.exports = {
	Endpoints,
};
