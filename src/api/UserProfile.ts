import { List } from "@bombitmanbomb/utils";
export class UserProfile {
	IconUrl: string;
	BackgroundUrl: string;
	TagLine: string;
	ProfileWorldUrl: string;
	ShowcaseItems: List<string>;
	TokenOptOut: List<string>;
	constructor($b: UserProfileJSON) {
		this.IconUrl = $b.iconUrl;
		this.BackgroundUrl = $b.backgroundUrl;
		this.TagLine = $b.tagLine;
		this.ProfileWorldUrl = $b.profileWorldUrl;
		this.ShowcaseItems =
			$b.showcaseItems instanceof List
				? $b.showcaseItems
				: List.ToList($b.showcaseItems);
		this.TokenOptOut =
			$b.tokenOptOut instanceof List
				? $b.tokenOptOut
				: List.ToList($b.tokenOptOut);
	}
	public static MAX_SHOWCASE_ITEMS = 6;
	public get IsValid(): boolean {
		return (
			(this.ShowcaseItems != null ? this.ShowcaseItems.Count : 0) <=
			UserProfile.MAX_SHOWCASE_ITEMS
		);
	}
	public AcceptsToken(token: string): boolean {
		return (
			this.TokenOptOut.length == 0 || !this.TokenOptOut.some((s) => token == s)
		);
	}
	toJSON(): UserProfileJSON {
		return {
			iconUrl: this.IconUrl,
			backgroundUrl: this.BackgroundUrl,
			tagLine: this.TagLine,
			profileWorldUrl: this.ProfileWorldUrl,
			showcaseItems: this.ShowcaseItems,
			tokenOptOut: this.TokenOptOut,
		};
	}
}
export interface UserProfileJSON {
	iconUrl: string;
	backgroundUrl: string;
	tagLine: string;
	profileWorldUrl: string;
	showcaseItems: string[];
	tokenOptOut: string[];
}
