const {
  Enumerable
} = require("./Enumerable")
class ChildRecordDiff {
  /**
   *Creates an instance of ChildRecordDiff.
   * @param {{
   * operation: <#RecordInfoOperation>,
   * created: Date,
   * parentRecord: RecordId,
   * recordInfo: RecordInfo,
   * }} $b
   * @memberof ChildRecordDiff
   */
  constructor($b) {
    if (!$b) $b = {};
    this.Operation = $b.operation;
    this.Created = $b.created;
    this.ParentRecord = $b.parentRecord;
    this.RecordInfo = $b.recordInfo;
    /** @template Enumerable<string> */
    this.RecordInfoOperation = new Enumerable(["Upsert", "Remove"]);
  }
}
module.exports = {
  ChildRecordDiff
}