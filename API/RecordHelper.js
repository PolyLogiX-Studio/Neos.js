const {RecordUtil} = require("./RecordUtil")
class RecordHelper {
  static IsSameVersion(record, other) {
    if (
      record.LastModifyingMachineId == other.LastModifyingMachineId &&
      record.LastModifyingUserId == other.LastModifyingUserId
    )
      return record.LocalVersion == other.LocalVersion;
    if (
      record.LocalVersion == other.LocalVersion &&
      record.GlobalVersion == other.GlobalVersion &&
      record.LastModifyingMachineId == other.LastModifyingMachineId
    )
      return record.LastModifyingUserId == other.LastModifyingUserId;
    return false;
  }
  static IsSameRecord(record, other) {
    if (record.OwnerId == other.OwnerId)
      return record.RecordId == other.RecordId;
    return false;
  }

  static InheritPermissions(record, source) {
    record.IsPublic = source.IsPublic;
    record.IsForPatrons = source.IsForPatrons;
    return record;
  }

  static CanOverwrite(record, oldRecord) {
    if (oldRecord == null) return true;
    if (
      record.LastModifyingMachineId == oldRecord.LastModifyingMachineId &&
      record.LastModifyingUserId == oldRecord.LastModifyingUserId
    )
      return record.LocalVersion > oldRecord.LocalVersion;
    return record.GlobalVersion == oldRecord.GlobalVersion;
  }

  static TakeIdentityFrom(record, source) {
    record.RecordId = source.RecordId;
    record.OwnerId = source.OwnerId;
    record.LocalVersion = source.LocalVersion;
    record.GlobalVersion = source.GlobalVersion;
    record.LastModifyingMachineId = source.LastModifyingMachineId;
    record.LastModifyingUserId = source.LastModifyingUserId;
    record.IsPublic = source.IsPublic;
    record.IsForPatrons = source.IsForPatrons;
    record.IsListed = source.IsListed;
    record.FirstPublishTime = source.FirstPublishTime;
    record.CreationTime = source.CreationTime;
    record.Visits = source.Visits;
    record.Rating = source.Rating;
    return record;
  }

  static GetUrl(record) {
    return RecordUtil.GenerateUri(record.OwnerId, record.RecordId);
  }

  static SetUrl(record, url) {
    let ownerId = [];
    let recordId = [];
    if (!RecordUtil.ExtractRecordID(url, ownerId, recordId))
      throw new Exception("Invalid Record URL");
    record.OwnerId = ownerId.Out;
    record.RecordId = recordId.Out;
    return record;
  }
}
module.exports = {RecordHelper}