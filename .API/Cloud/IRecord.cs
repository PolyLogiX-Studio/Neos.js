// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.RecordHelper
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;

namespace CloudX.Shared
{
  public static class RecordHelper
  {
    public static bool IsSameVersion(this IRecord record, IRecord other)
    {
      if (record.LastModifyingMachineId == other.LastModifyingMachineId && record.LastModifyingUserId == other.LastModifyingUserId)
        return record.LocalVersion == other.LocalVersion;
      if (record.LocalVersion == other.LocalVersion && record.GlobalVersion == other.GlobalVersion && record.LastModifyingMachineId == other.LastModifyingMachineId)
        return record.LastModifyingUserId == other.LastModifyingUserId;
      return false;
    }

    public static bool IsSameRecord(this IRecord record, IRecord other)
    {
      if (record.OwnerId == other.OwnerId)
        return record.RecordId == other.RecordId;
      return false;
    }

    public static void InheritPermissions(this IRecord record, IRecord source)
    {
      record.IsPublic = source.IsPublic;
      record.IsForPatrons = source.IsForPatrons;
    }

    public static bool CanOverwrite(this IRecord record, IRecord oldRecord)
    {
      if (oldRecord == null)
        return true;
      if (record.LastModifyingMachineId == oldRecord.LastModifyingMachineId && record.LastModifyingUserId == oldRecord.LastModifyingUserId)
        return record.LocalVersion > oldRecord.LocalVersion;
      return record.GlobalVersion == oldRecord.GlobalVersion;
    }

    public static void TakeIdentityFrom(this IRecord record, IRecord source)
    {
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
    }

    public static Uri GetUrl(IRecord record)
    {
      return RecordUtil.GenerateUri(record.OwnerId, record.RecordId);
    }

    public static void SetUrl(IRecord record, Uri url)
    {
      string ownerId;
      string recordId;
      if (!RecordUtil.ExtractRecordID(url, out ownerId, out recordId))
        throw new Exception("Invalid Record URL");
      record.OwnerId = ownerId;
      record.RecordId = recordId;
    }
  }
}
