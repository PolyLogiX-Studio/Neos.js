// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetUploadData
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class AssetUploadData
  {
    [JsonProperty(PropertyName = "signature")]
    [JsonPropertyName("signature")]
    public string Signature { get; set; }

    [JsonProperty(PropertyName = "variant")]
    [JsonPropertyName("variant")]
    public string Variant { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "totalBytes")]
    [JsonPropertyName("totalBytes")]
    public long TotalBytes { get; set; }

    [JsonProperty(PropertyName = "chunkSize")]
    [JsonPropertyName("chunkSize")]
    public int ChunkSize { get; set; }

    [JsonProperty(PropertyName = "totalChunks")]
    [JsonPropertyName("totalChunks")]
    public int TotalChunks { get; set; }

    [JsonProperty(PropertyName = "uploadState")]
    [JsonPropertyName("uploadState")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public UploadState UploadState { get; set; }
  }
}
