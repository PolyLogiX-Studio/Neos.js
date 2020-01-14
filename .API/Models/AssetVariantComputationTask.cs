// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetVariantComputationTask
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class AssetVariantComputationTask
  {
    [JsonProperty(PropertyName = "assetSignature")]
    [JsonPropertyName("assetSignature")]
    public string AssetSignature { get; set; }

    [JsonProperty(PropertyName = "variantId")]
    [JsonPropertyName("variantId")]
    public string VariantId { get; set; }

    [JsonProperty(PropertyName = "entityType")]
    [JsonPropertyName("entityType")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public AssetVariantEntityType EntityType { get; set; }
  }
}
