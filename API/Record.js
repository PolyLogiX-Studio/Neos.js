const {IRecord} = require("./IRecord")
const {IdUtil} = require("./IdUtil")
const {HashSet} = require("./HashSet")
const {List} = require("./List")
const {RecordHelper} = require("./RecordHelper")
const {OwnerType} = require("./OwnerType")
class Record extends IRecord {
  constructor($b) {
    if (!$b) $b = {};
    super();
    this.RecordId = $b.id || new String();
    this.OwnerId = $b.ownerId || new String();
    this.AssetURI = $b.assetUri || new String();
    this._URL = new String();
    this.GlobalVersion = $b.globalVersion || new Number();
    this.Localversion = $b.localVersion || new Number();
    this.LastModifyingUserId = $b.lastModifyingUserId || new String();
    this.LastModifyingMachineId = $b.lastModifyingMachineId || new String();
    this.Name = $b.name || new String();
    this.Description = $b.description || undefined;
    this.RecordType = $b.recordType || new String();
    this.OwnerName = $b.ownerName || new String();
    this.Tags = $b.tags ? new HashSet($b.tags) : undefined;
    this.Path = $b.path || new String();
    this.ThumbnailURI = $b.thumbnailUri || new String();
    this.LastModificationTime = $b.lastModificationTime || new Date();
    this.CreationTime = $b.creationTime || new Date();
    this.FirstPublishTime = $b.firstPublishTime || new Date();
    this.IsPublic = $b.isPublic || new Boolean();
    this.IsForPatreons = $b.isForPatreons || new Boolean();
    this.IsListed = $b.isListed || new Boolean();
    this.Visits = $b.visits || new Number();
    this.Rating = $b.rating || new Number();
    this.Submissions = $b.submissions || new List();
    this.Manifest = new List();
    this.NeosDBManifest = $b.neosDbManidest || new List();
  }
  get URL() {
    return RecordHelper.GetUrl(this);
  }
  URL(value) {
    return RecordHelper.SetUrl(this, value);
  }
  static IsValidId(recordId) {
    return recordId.startsWith("R-");
  }
  get IsValidOwnerId() {
    return IdUtil.GetOwnerType(this.OwnerName) != OwnerType.INVALID;
  }
  get IsValidRecordId() {
    return RecordUtil.IsValidRecordID(this.RecordId);
  }
  ResetVersioning() {
    this.Localversion = 0;
    this.GlobalVersion = 0;
    this.LastModifyingMachineId = null;
    this.LastModifyingMachineId = null;
  }
}
module.exports = {Record}