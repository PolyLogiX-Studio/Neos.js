// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.RecordPreprocessStatus
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class RecordPreprocessStatus
  {
    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string PreprocessId { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "recordId")]
    [JsonPropertyName("recordId")]
    public string RecordId { get; set; }

    [JsonProperty(PropertyName = "state")]
    [JsonPropertyName("state")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public RecordPreprocessState State { get; set; }

    [JsonProperty(PropertyName = "progress")]
    [JsonPropertyName("progress")]
    public float Progress { get; set; }

    [JsonProperty(PropertyName = "failReason")]
    [JsonPropertyName("failReason")]
    public string FailReason { get; set; }

    [JsonProperty(PropertyName = "resultDiffs")]
    [JsonPropertyName("resultDiffs")]
    public List<AssetDiff> ResultDiffs { get; set; }
  }
}
