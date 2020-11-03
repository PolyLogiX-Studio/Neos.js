const { HashSet } = require("./HashSet");
const { List } = require("./List");
class IRecord {
	constructor($b) {
		if (!$b) $b = {};
		this.RecordId = $b.recordId || new String();
		this.OwnerId = $b.ownerId || new String();
		this.URL = $b.url || new String();
		this.GlobalVersion = $b.globalVersion || new Number();
		this.Localversion = $b.localVersion || new Number();
		this.LastModifyingUserId = $b.lastModifyingUserId || new String();
		this.LastModifyingMachineId = $b.lastModifyingMachineId || new String();
		this.Name = $b.name || new String();
		this.OwnerName = $b.ownerName || new String();
		this.Description = $b.description || new String();
		this.RecordType = $b.recordType || new String();
		this.Tags = $b.tags || new HashSet();
		this.Path = $b.path || new String();
		this.ThumbnailURI = $b.thumbnailUri || new String();
		this.IsPublic = $b.isPublic || new Boolean();
		this.IsForPatreons = $b.isForPatreons || new Boolean();
		this.IsListed = $b.isListed || new Boolean();
		this.Visits = $b.visits || new Number();
		this.Rating = $b.rating || new Number();
		this.FirstPublishTime = $b.firstPublishTime || new Date();
		this.CreationTime = $b.creationTime || new Date();
		this.LastModificationTime = $b.lastModificationTime || new Date();
		this.NeosDBManifest = $b.neosDBManifest || new List();
	}
}
module.exports = {
	IRecord,
};
