// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ChildRecordDiff
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
