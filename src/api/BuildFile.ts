export class BuildFile {
	public Signature: string;
	public Path: string;
	constructor($b: BuildFileJSON) {
		this.Signature = $b.signature;
		this.Path = $b.path;
	}
	toJSON(): BuildFileJSON {
		return { signature: this.Signature, path: this.Path };
	}
}
export interface BuildFileJSON {
	signature: string;
	path: string;
}
