class IRecord {
    constructor(){
        this.RecordId = new String()
        this.OwnerId = new String()
        this.URL = new URL()
        this.GlobalVersion = new Number()
        this.Localversion = new Number()
        this.LastModifyingUserId = new String()
        this.LastModifyingMachineId = new String()
        this.Name = new String()
        this.OwnerName = new String()
        this.Description = new String()
        this.RecordType = new String()
        this.Tags
        this.Path = new String()
        this.ThumbnailURI = new String()
        this.IsPublic = new Boolean()
        this.IsForPatreons = new Boolean()
        this.IsListed = new Boolean()
        this.Visits = new Number()
        this.Rating = new Number()
        this.FirstPublishTime
        this.CreationTime
        this.LastModificationTime
        this.NeosDBManifest = new Array()
    }
}
module.exports = { IRecord }