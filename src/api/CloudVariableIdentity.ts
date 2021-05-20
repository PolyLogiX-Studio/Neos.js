export class CloudVariableIdentity {
	public ownerId!: string;
	public path!: string;
	constructor(ownerId: string, path: string) {
		this.CloudVariableIdentity(ownerId, path);
	}
	CloudVariableIdentity(ownerId: string, path: string): void {
		this.ownerId = ownerId;
		this.path = path;
	}
	public Equals(other: CloudVariableIdentity): boolean {
		return this.ownerId == other.ownerId && this.path == other.path;
	}
	toString(): string {
		return `OwnerId: ${this.ownerId}, Path: ${this.path}`;
	}
}
