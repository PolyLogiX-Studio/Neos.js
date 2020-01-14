// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.RecordUtil
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;
using System.Text;

namespace CloudX.Shared
{
  public static class RecordUtil
  {
    public static Uri GenerateUri(string ownerId, string recordId)
    {
      return new Uri("neosrec:///" + ownerId + "/" + recordId);
    }

    public static bool IsValidRecordID(string recordId)
    {
      return !string.IsNullOrWhiteSpace(recordId) && recordId.StartsWith("R-") && recordId.Length > "R-".Length;
    }

    public static bool ExtractRecordID(Uri recordUri, out string ownerId, out string recordId)
    {
      ownerId = (string) null;
      recordId = (string) null;
      if (recordUri == (Uri) null || recordUri.Scheme != "neosrec" || recordUri.Segments.Length != 3)
        return false;
      ownerId = recordUri.Segments[1];
      if (string.IsNullOrEmpty(ownerId))
        return false;
      ownerId = ownerId.Substring(0, ownerId.Length - 1);
      recordId = recordUri.Segments[2];
      return !string.IsNullOrEmpty(recordId) && RecordUtil.IsValidRecordID(recordId);
    }

    public static bool ExtractRecordPath(Uri recordUri, out string ownerId, out string recordPath)
    {
      ownerId = (string) null;
      recordPath = (string) null;
      if (recordUri == (Uri) null || recordUri.Scheme != "neosrec" || recordUri.Segments.Length < 3)
        return false;
      ownerId = recordUri.Segments[1];
      if (string.IsNullOrEmpty(ownerId))
        return false;
      ownerId = ownerId.Substring(0, ownerId.Length - 1);
      StringBuilder stringBuilder = new StringBuilder();
      for (int index = 2; index < recordUri.Segments.Length; ++index)
        stringBuilder.Append(recordUri.Segments[index]);
      recordPath = stringBuilder.ToString();
      return true;
    }

    public static string GenerateRecordID()
    {
      return "R-" + Guid.NewGuid().ToString();
    }
  }
}
