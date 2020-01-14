// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetDiff
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class AssetDiff
  {
    [JsonProperty(PropertyName = "hash")]
    [JsonPropertyName("hash")]
    public string Hash { get; set; }

    [JsonProperty(PropertyName = "bytes")]
    [JsonPropertyName("bytes")]
    public long Bytes { get; set; }

    [JsonProperty(PropertyName = "state")]
    [JsonPropertyName("state")]
    public AssetDiff.Diff State { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "isUploaded")]
    [JsonPropertyName("isUploaded")]
    public bool? IsUploaded { get; set; }

    public enum Diff
    {
      Added,
      Unchanged,
      Removed,
    }
  }
}
