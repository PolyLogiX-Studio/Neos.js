// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.RecordInfo
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  [Serializable]
  public class RecordInfo
  {
    [JsonProperty(PropertyName = "recordId")]
    [JsonPropertyName("recordId")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "name")]
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonProperty(PropertyName = "assetUri")]
    [JsonPropertyName("assetUri")]
    public string AssetURI { get; set; }

    [JsonProperty(PropertyName = "thumbnailUri")]
    [JsonPropertyName("thumbnailUri")]
    public string ThumbnailURI { get; set; }

    [JsonProperty(PropertyName = "globalVersion")]
    [JsonPropertyName("globalVersion")]
    public int GlobalVersion { get; set; }
  }
}
