// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetDiff
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
