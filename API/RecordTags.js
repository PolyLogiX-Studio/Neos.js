const { HashSet } = require("./HashSet");
const { StringBuilder } = require("./StringBuilder");

/**
 * Util to Handle Tags in Records
 * @class RecordTags
 */
class RecordTags {
	/**
	 * Ignored Tags
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get IGNORE_TAGS() {
		return new HashSet(["a", "an", "the", "and"]);
	}
	/**
	 * Common Avatar Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get CommonAvatar() {
		return "common_avatar";
	}
	/**
	 * Profile Icon Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get ProfileIcon() {
		return "profile_icon";
	}
	/**
	 * Message Embed Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get MessageItem() {
		return "message_item";
	}
	/**
	 * World Orb Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get WorldOrb() {
		return "world_orb";
	}
	/**
	 * Keyboard Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get VirtualKeyboard() {
		return "virtual keyboard";
	}
	/**
	 * Interactive Camera Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get InteractiveCamera() {
		return "interactive_camera";
	}
	/**
	 * Facet Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get Facet() {
		return "facet";
	}
	/**
	 * Photo Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get Photo() {
		return "photo";
	}
	/**
	 * 3D Photo Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get VRPhoto() {
		return "vr_photo";
	}
	/**
	 * 360 Photo Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get Photo360() {
		return "360_photo";
	}
	/**
	 * Stereo Photo Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get PhotoStereo() {
		return "stereo_photo";
	}
	/**
	 * File Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get RawFile() {
		return "raw_file";
	}
	/**
	 * Audio Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get AudioClip() {
		return "audio_clip";
	}
	/**
	 * Video Tag
	 * @readonly
	 * @static
	 * @memberof RecordTags
	 */
	static get VideoClip() {
		return "video_clip";
	}
	/**
	 * Generate Raw File Asset Tag
	 * @static
	 * @param {String} url
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static RawFileAsset(url) {
		return "raw_file_asset:" + url;
	}
	/**
	 * Generate Texture Asset Tag
	 * @static
	 * @param {String} url
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static TextureAsset(url) {
		return "texture_asset:" + url;
	}
	/**
	 * Generate Audio Clip Asset Tag
	 * @static
	 * @param {String} url
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static ClipAsset(url) {
		return "clip_asset:" + url;
	}
	/**
	 * Generate Clip Length Tag
	 * @static
	 * @param {Number} length Clip Length
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static ClipLength(length) {
		return "clip_length:" + length;
	}
	/**
	 * Generate Location Tag
	 * @static
	 * @param {String} name Location
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static LocationName(name) {
		return "location_name:" + name;
	}
	/**
	 * Generate LocationAccessLevel Tag
	 * @static
	 * @param {SessionAccessLevel} accessLevel Access Level
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static LocationAccessLevel(accessLevel) {
		return "location_accesslevel:" + accessLevel;
	}
	 * @param {String} name Clip Length
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static LocationName(name) {
		return "location_name:" + name;
	}
	/**
	 * Generate User Tag
	 * @static
	 * @param {String} userId User ID
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static PresentUser(userId) {
		return "user:" + userId;
	}
	/**
	 * Generate Timestamp Tag
	 * @static
	 * @param {Date} time Current Time
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static TimeStamp(time) {
		return "timestamp:" + time.toISOString();
	}
	/**
	 * Generate Message Embed Tag
	 * @static
	 * @param {String} messageId Message ID
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static CorrespondingMessageId(messageId) {
		return "message_id:" + messageId;
	}
	/**
	 * Generate World Tag
	 * @static
	 * @param {String} worldUrl World URL
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static CorrespondingWorldUrl(worldUrl) {
		return "world_url:" + worldUrl;
	}
	/**
	 * Get Message ID from Taglist
	 * @static
	 * @param {HashSet<String>} tags
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static GetCorrespondingMessageId(tags) {
		return RecordTags.ExtractValue(tags, "message_id:");
	}
	/**
	 * Get World URL from Taglist
	 * @static
	 * @param {HashSet<String>} tags
	 * @returns {String} Tag
	 * @memberof RecordTags
	 */
	static GetCorrespondingWorldrl(tags) {
		return RecordTags.ExtractValue(tags, "world_url:");
	}
	/**
	 * Extract a value from a Generated Tag
	 *
	 * @static
	 * @param {HashSet<String>} tags
	 * @param {String} prefix
	 * @returns
	 * @memberof RecordTags
	 */
	static ExtractValue(tags, prefix) {
		if (tags == null) return null;
		var str = tags.FirstOrDefault((s) => s.startsWith(prefix));
		if (str != null) str = str.substr(prefix.length);
		return str;
	}
	/**
	 * Generate a TagList from a String
	 * @static
	 * @param {String} name
	 * @param {HashSet<String>} tags
	 * @returns
	 * @memberof RecordTags
	 */
	static GenerateTagsFromName(name, tags) {
		if (name == null || name.trim() == "") return;
		var tagBuilder = new StringBuilder();
		for (let c of name) {
			if (/[a-zA-Z]/.test(c))
				// Is Letter
				tagBuilder.Append(c.toLowerCase());
			else RecordTags.ExtractTag(tagBuilder, tags);
		}
		RecordTags.ExtractTag(tagBuilder, tags);
	}
	/**
	 * Add a StringBuilder tag to TagList
	 * @static
	 * @param {StringBuilder} tagBuilder
	 * @param {HashSet<String>} tags
	 * @memberof RecordTags
	 */
	static ExtractTag(tagBuilder, tags) {
		if (tagBuilder.Length > 1) {
			var str = tagBuilder.ToString();
			if (!RecordTags.IGNORE_TAGS.Contains(str)) tags.Add(str);
		}
		tagBuilder.Clear();
	}
}
module.exports = { RecordTags };
