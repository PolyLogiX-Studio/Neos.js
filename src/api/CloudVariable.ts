import type { Out } from "@bombitmanbomb/utils";
export class CloudVariable {
	public VariableOwnerId: string;
	public Path: string;
	public Value: string;
	constructor($b: CloudVariableJSON) {
		this.VariableOwnerId = $b.ownerId;
		this.Path = $b.path;
		this.Value = $b.value;
	}
	public GetDefinitionPath(
		ownerId: Out<string> = [],
		subpath: Out<string> = []
	): void {
		return CloudVariable.GetDefinitionPath(this.Path, ownerId, subpath);
	}
	public static GetDefinitionPath(
		path: string,
		ownerId: Out<string> = [],
		subpath: Out<string> = []
	): void {
		const length = path.indexOf(".");
		ownerId.Out = path.substr(0, length);
		subpath.Out = path.substr(length + 1);
	}
	public Equals(other: CloudVariable): boolean {
		return (
			this.VariableOwnerId == other.VariableOwnerId &&
			this.Path == other.Path &&
			this.Value == other.Value
		);
	}
	public toString(): string {
		return `Cloud Variable. Owner: ${this.VariableOwnerId}, Path: ${this.Path}, Value: ${this.Value}`;
	}
	toJSON(): CloudVariableJSON {
		return {
			ownerId: this.VariableOwnerId,
			path: this.Path,
			value: this.Value,
		};
	}
}
export interface CloudVariableJSON {
	ownerId: string;
	path: string;
	value: string;
}
