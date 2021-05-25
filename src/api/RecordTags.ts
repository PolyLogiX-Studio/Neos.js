import { List, StringBuilder } from "@bombitmanbomb/utils";
import type { SessionAccessLevel } from "./SessionAccessLevel";
export class RecordTags {
	private static IGNORE_TAGS = List.ToList(["a", "an", "the", "and"]);
	public static CommonAvatar = "common_avatar";
	public static CommonTooltip = "common_tooltip";
	public static ProfileIcon = "profile_icon";
	public static MessageItem = "message_item";
	public static WorldOrb = "world_orb";
	public static VirtualKeyboard = "virtual_keyboard";
	public static InteractiveCamera = "interactive_camera";
	public static Facet = "facet";
	public static Photo = "camera_photo";
	public static VRPhoto = "vr_photo";
	public static Photo360 = "360_photo";
	public static PhotoStereo = "stereo_photo";
	public static RawFile = "raw_file";
	public static VideoClip = "video_clip";
	public static RawFileAsset(url: string): string {
		return `raw_file_asset:${url}`;
	}
	public static TextureAsset(url: string): string {
		return `texture_asset:${url}`;
	}
	public static ClipAsset(url: string): string {
		return `clip_asset${url}`;
	}
	public static ClipLength(length: number): string {
		return `clip_length:${length}`;
	}
	public static LocationName(name: string): string {
		return `location_name:${name}`;
	}
	public static LocationHost(userId: string): string {
		return `location_host:${userId}`;
	}
	public static LocationAccessLevel(accessLevel: SessionAccessLevel): string {
		return `location_accesslevel:${accessLevel}`;
	}
	public static LocationHiddenFromListing(hidden: boolean): string {
		return `location_hiddenfromlisting:${hidden}`;
	}
	public static PresentUser(userId: string): string {
		return `user:${userId}`;
	}
	public static Timestamp(time: Date): string {
		return `timestamp:${time.toISOString()}`;
	}
	public static CorrespondingMessageId(messageId: string): string {
		return `message_id:${messageId}`;
	}
	public static CorrespondingWorldUrl(worldUrl: string): string {
		return `world_url:${worldUrl}`;
	}
	public static GetCorredpondingMessageId(tags: string[]): string {
		return RecordTags.ExtractValue(tags, "message_id:") as string;
	}
	public static GetCorrespondingWorldUrl(tags: string[]): string {
		return RecordTags.ExtractValue(tags, "world_url:") as string;
	}
	public static ExtractValue(tags: string[], prefix: string): string | null {
		if (tags == null) return null;
		let str = tags.find((s) => s.startsWith(prefix)) ?? null;
		if (str != null) str = str.substr(prefix.length);
		return str;
	}
	public static GenerateTagsFromName(name: string, tags: string[]): void {
		if (name == null || name.trim() == "") return;
		const tagBuilder = new StringBuilder();
		for (const c of name) {
			if (!(c.toUpperCase() == c.toLowerCase()))
				tagBuilder.Append(c.toLowerCase());
			else RecordTags.ExtractTag(tagBuilder, tags);
		}
		RecordTags.ExtractTag(tagBuilder, tags);
	}
	private static ExtractTag(tagBuilder: StringBuilder, tags: string[]): void {
		if (tagBuilder.Length > 1) {
			const str = tagBuilder.toString();
			if (!RecordTags.IGNORE_TAGS.Contains(str)) tags.push(str);
		}
		tagBuilder.Clear();
	}
}
