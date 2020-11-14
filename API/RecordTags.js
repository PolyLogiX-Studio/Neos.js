const { HashSet } = require("./HashSet");
const { StringBuilder } = require("./StringBuilder");
class RecordTags {
	static get IGNORE_TAGS() {
		return new HashSet(["a", "an", "the", "and"]);
	}
	static get CommonAvatar() {
		return "common_avatar";
	}
	static get ProfileIcon() {
		return "profile_icon";
	}
	static get MessageItem() {
		return "message_item";
	}
	static get WorldOrb() {
		return "world_orb";
	}
	static get VirtualKeyboard() {
		return "virtual keyboard";
	}
	static get InteractiveCamera() {
		return "interactive_camera";
	}
	static get Facet() {
		return "facet";
	}
	static get Photo() {
		return "photo";
	}
	static get VRPhoto() {
		return "vr_photo";
	}
	static get Photo360() {
		return "360_photo";
	}
	static get PhotoStereo() {
		return "stereo_photo";
	}
	static get RawFile() {
		return "raw_file";
	}
	static get AudioClip() {
		return "audio_clip";
	}
	static get VideoClip() {
		return "video_clip";
	}
	static RawFileAsset(url) {
		return "raw_file_asset:" + url;
	}
	static TextureAsset(url) {
		return "texture_asset:" + url;
	}
	static ClipAsset(url) {
		return "clip_asset:" + url;
	}
	static ClipLength(length) {
		return "clip_length:" + length;
	}
	static LocationName(name) {
		return "location_name:" + name;
	}
	static PresentUser(userId) {
		return "user:" + userId;
	}
	static TimeStamp(time) {
		return "timestamp:" + time.toISOString();
	}
	static CorrespondingMessageId(messageId) {
		return "message_id:" + messageId;
	}
	static CorrespondingWorldUrl(worldUrl) {
		return "world_url:" + worldUrl;
	}
	static GetCorrespondingMessageId(tags) {
		return RecordTags.ExtractValue(tags, "message_id:");
	}
	static GetCorrespondingWorldrl(tags) {
		return RecordTags.ExtractValue(tags, "world_url:");
	}
	static ExtractValue(tags, prefix) {
		if (tags == null) return null;
		var str = tags.FirstOrDefault((s) => s.startsWith(prefix));
		if (str != null) str = str.substr(prefix.length);
		return str;
	}
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
	static ExtractTag(tagBuilder, tags) {
		if (tagBuilder.Length > 1) {
			var str = tagBuilder.ToString();
			if (!RecordTags.IGNORE_TAGS.Contains(str)) tags.Add(str);
		}
		tagBuilder.Clear();
	}
}
module.exports = {RecordTags}