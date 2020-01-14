// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetInfo
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class AssetInfo
  {
    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "assetHash")]
    [JsonPropertyName("assetHash")]
    public string AssetHash { get; set; }

    [JsonProperty(PropertyName = "bytes")]
    [JsonPropertyName("bytes")]
    public long Bytes { get; set; }

    [JsonProperty(PropertyName = "free")]
    [JsonPropertyName("free")]
    public bool Free { get; set; }

    [JsonProperty(PropertyName = "isUploaded")]
    [JsonPropertyName("isUploaded")]
    public bool IsUploaded { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "uploaderUserId")]
    [JsonPropertyName("uploaderUserId")]
    public string UploaderUserId { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "countsAgainstMemberQuota")]
    [JsonPropertyName("countsAgainstMemberQuota")]
    public bool? CountsAgainstMemberQuota { get; set; }
  }
}
