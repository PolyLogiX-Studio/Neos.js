// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ChildRecordDiff
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class ChildRecordDiff
  {
    [JsonProperty(PropertyName = "operation")]
    [JsonPropertyName("operation")]
    public ChildRecordDiff.RecordInfoOperation Operation { get; set; }

    [JsonProperty(PropertyName = "created")]
    [JsonPropertyName("created")]
    public DateTime Created { get; set; }

    [JsonProperty(PropertyName = "parentRecord")]
    [JsonPropertyName("parentRecord")]
    public RecordId ParentRecord { get; set; }

    [JsonProperty(PropertyName = "recordInfo")]
    [JsonPropertyName("recordInfo")]
    public RecordInfo RecordInfo { get; set; }

    public enum RecordInfoOperation
    {
      Upsert,
      Remove,
    }
  }
}
