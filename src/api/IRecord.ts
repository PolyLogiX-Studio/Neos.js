import type { List } from "@bombitmanbomb/utils";
import type { NeosDBAsset } from "./NeosDBAsset";
export interface IRecord {
	RecordId: string;
	OwnerId: string;
	AssetURI: string;
	GlobalVersion: number;
	LocalVersion: number;
	LastModifyingUserId: string;
	LastModifyingMachineId: string;
	Name: string;
	OwnerName: string;
	Description?: string;
	RecordType: string;
	Tags?: string[];
	Path: string;
	ThumbnailURI?: string;
	IsPublic: boolean;
	IsForPatrons: boolean;
	IsListed: boolean;
	Visits: number;
	Rating: number;
	FirstPublishTime?: Date;
	CreationTime?: Date;
	LastModificationTime: Date;
	NeosDBManifest?: List<NeosDBAsset>;
}
