class RecordList {
  constructor($b) {
    if (!$b) $b = {};
    this._Id = $b.id;
    this.OwnerId = b.ownerId;
    this.Name = $b.name;
    this.Page = $b.page;
    this.Records = $b.records; //TYPE Record
  }
  get Id() {
    return this.Name + "-" + this.Page.toString();
  }
}
module.exports = {RecordList}