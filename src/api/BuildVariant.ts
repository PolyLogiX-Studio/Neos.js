import type { List } from "@bombitmanbomb/utils";
import type { BuildFile } from "./BuildFile";
import type { BuildPlatform } from "./BuildPlatform";
import type { BuildRuntime } from "./BuildRuntime";

export class BuildVariant {
	public VersionNumber: string;
	public Platform: BuildPlatform;
	public Runtime: BuildRuntime;
	public PackageSignature: string;
	public Files: List<BuildFile>;
	constructor($b: BuildVariantJSON) {
		this.VersionNumber = $b.versionNumber;
		this.Platform = $b.platform;
		this.Runtime = $b.runtime;
		this.PackageSignature = $b.packageSignature;
		this.Files = $b.files;
	}
	toJSON(): BuildVariantJSON {
		return {
			versionNumber: this.VersionNumber,
			platform: this.Platform,
			runtime: this.Runtime,
			packageSignature: this.PackageSignature,
			files: this.Files,
		};
	}
}
interface BuildVariantJSON {
	versionNumber: string;
	platform: BuildPlatform;
	runtime: BuildRuntime;
	packageSignature: string;
	files: List<BuildFile>;
}
