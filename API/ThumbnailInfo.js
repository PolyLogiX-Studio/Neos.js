const { v4: uuidv4 } = require("uuid");
class ThumbnailInfo {
	/**
	 *Creates an instance of ThumbnailInfo.
	 * @param {{
	 * id: string,
	 * key: string
	 * }} $b
	 * @memberof ThumbnailInfo
	 */
	constructor($b) {
		if (!$b) $b = {};
		this.Id = $b.id;
		this.UploaderIP = $b.uploaderIP;
		this.SessionId = $b.sessionId;
		this.UploaderOwnerId = $b.uploaderOwnerId;
		this.Key = $b.key || null;
		this.VERSION_KEY = "-v2";
		this.VERSION = 1;
	}
	get IsVersion2() {
		return ThumbnailInfo.IsIdVersion2(this.Id);
	}

	static GenerateID(version) {
		return uuidv4().toString() + (version > 0 ? "-v2" : "") + ".webp";
	}

	static IsIdVersion2(id) {
		return id != null && id.Contains("-v2");
	}
}
module.exports = {
	ThumbnailInfo,
};
