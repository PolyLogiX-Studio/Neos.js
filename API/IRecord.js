const {HashSet} = require("./HashSet")
const {List} = require("./List")
 class IRecord {
  constructor() {
    this.RecordId = new String();
    this.OwnerId = new String();
    this.URL = new String();
    this.GlobalVersion = new Number();
    this.Localversion = new Number();
    this.LastModifyingUserId = new String();
    this.LastModifyingMachineId = new String();
    this.Name = new String();
    this.OwnerName = new String();
    this.Description = new String();
    this.RecordType = new String();
    this.Tags = new HashSet();
    this.Path = new String();
    this.ThumbnailURI = new String();
    this.IsPublic = new Boolean();
    this.IsForPatreons = new Boolean();
    this.IsListed = new Boolean();
    this.Visits = new Number();
    this.Rating = new Number();
    this.FirstPublishTime = new Date();
    this.CreationTime = new Date();
    this.LastModificationTime = new Date();
    this.NeosDBManifest = new List();
  }
}
module.exports = {IRecord}