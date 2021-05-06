/** AssetEntry Type
 * @class AssetEntry
 * @template E
 */
export class AssetEntry<E> {
	public Id: string;
	public OwnerId: string;
	public ComputeLock: any;
	public Entry: any;
	constructor($b: AssetEntryJSON<E>) {
		this.Id = $b.id;
		this.OwnerId = $b.ownerId;
		this.ComputeLock = $b.computeLock;
		this.Entry = $b.entry;
	}
	/** Asset Hash.
	 *
	 * @memberof AssetEntry
	 */
	public get AssetHash(): string {
		if (this.OwnerId == null || !this.OwnerId.startsWith("!-"))
			throw new Error("OwnerId is invalid, cannot extract asset hash from it");
		return this.OwnerId.substring("A-".length);
	}
	public set AssetHash(value: string) {
		this.OwnerId = "A-" + value;
	}
	toJSON(): AssetEntryJSON<E> {
		return {
			id: this.Id,
			ownerId: this.OwnerId,
			computeLock: this.ComputeLock,
			entry: this.Entry,
		};
	}
}
interface AssetEntryJSON<E> {
	id: string;
	ownerId: string;
	entry: E;
	computeLock: any;
}
