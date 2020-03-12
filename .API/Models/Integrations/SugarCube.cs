// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.SugarCube
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using BaseX;
using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class SugarCube
  {
    [JsonProperty(PropertyName = "batchId")]
    [JsonPropertyName("batchId")]
    public string BatchId { get; set; }

    [JsonProperty(PropertyName = "sequenceNumber")]
    [JsonPropertyName("sequenceNumber")]
    public int SequenceNumber { get; set; }

    [JsonProperty(PropertyName = "generatedOn")]
    [JsonPropertyName("generatedOn")]
    public DateTime GeneratedOn { get; set; }

    [JsonProperty(PropertyName = "consumed")]
    [JsonPropertyName("consumed")]
    public bool Consumed { get; set; }

    [JsonProperty(PropertyName = "consumedOn")]
    [JsonPropertyName("consumedOn")]
    public DateTime ConsumedOn { get; set; }

    [JsonProperty(PropertyName = "originalOwnerId")]
    [JsonPropertyName("originalOwnerId")]
    public string OriginalOwnerId { get; set; }

    [JsonProperty(PropertyName = "currentOwnerId")]
    [JsonPropertyName("currentOwnerId")]
    public string CurrentOwnerId { get; set; }

    [JsonProperty(PropertyName = "redChannel")]
    [JsonPropertyName("redChannel")]
    public double RedChannel { get; set; }

    [JsonProperty(PropertyName = "greenChannel")]
    [JsonPropertyName("greenChannel")]
    public double GreenChannel { get; set; }

    [JsonProperty(PropertyName = "blueChannel")]
    [JsonPropertyName("blueChannel")]
    public double BlueChannel { get; set; }

    [JsonIgnore]
    [JsonIgnore]
    public color Color
    {
      get
      {
        return new color((float) this.RedChannel, (float) this.GreenChannel, (float) this.BlueChannel, 1f);
      }
      set
      {
        this.RedChannel = (double) value.r;
        this.GreenChannel = (double) value.g;
        this.BlueChannel = (double) value.b;
      }
    }
  }
}
