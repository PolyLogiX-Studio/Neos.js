// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetVariantComputationTask
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
